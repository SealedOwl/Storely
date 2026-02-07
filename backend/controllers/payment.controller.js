import { stripe } from "../lib/stripe.js";
import Order from "../models/order.model.js";

export const createCheckoutSession = async (req, res) => {
	try {
		console.log("Inside createCheckoutSession controller");

		const products = req.body;

		if (!Array.isArray(products) || products.length === 0) {
			return res.status(400).json({ error: "Invalid or empty products array" });
		}

		let totalAmount = 0;

		// for stripe
		const lineItems = products.map((product) => {
			const amount = Math.round(product.price * 100); // paise/cents
			totalAmount += amount * product.quantity;

			return {
				price_data: {
					currency: "inr",
					product_data: {
						name: product.name,
						images: [product.image],
					},
					unit_amount: amount,
				},
			};
		});

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: lineItems,
			mode: "payment",
			success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
			metadata: {
				userId: req.user._id.toString(),
				products: JSON.stringify(
					products.map((p) => ({
						id: p._id,
						quantity: p.quantity,
						price: p.price,
					})),
				),
			},
		});

		res.status(200).json({ id: session.id, totalAmount: totalAmount / 100 });
	} catch (error) {
		console.log("Error in createCheckoutSession controller", error);
		res.status(500).json(error);
	}
};

export const checkoutSuccess = async (req, res) => {
	try {
		console.log("Inside checkoutSuccess controller");

		const { sessionId } = req.body;
		const session = await stripe.checkout.sessions.retrieve(sessionId);

		if (session.payment_status === "paid") {
			// create a new order
			const products = JSON.parse(session.metadata.products);
			const newOrder = new Order({
				user: session.metadata.userId,
				products: products.map((product) => ({
					product: product.id,
					quantity: product.quantity,
					price: product.price,
				})),
				totalAmount: session.amount_total / 100, // convert to paise to rupee
				stripeSessionId: sessionId,
			});

			await newOrder.save();
			res.status(200).json({
				success: true,
				message: "Payment successful, order created",
				orderId: newOrder._id,
			});
		}
	} catch (error) {
		console.log("Error in checkoutSuccess controller", error);
		res.status(500).json(error);
	}
};
