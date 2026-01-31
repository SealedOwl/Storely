import { Product } from "../models/product.model.js";

// add to cart
export const addToCart = async (req, res) => {
	try {
		console.log("Inside addToCart controller");

		const { productId } = req.body;
		const user = req.user;

		const existingItem = user.cartItems.find(
			(item) => item.product.toString() === productId,
		);

		if (existingItem) {
			existingItem.quantity += 1;
		} else {
			user.cartItems.push({ product: productId, quantity: 1 });
		}

		await user.save();
		res
			.status(200)
			.json({ message: "Product added to cart", cartItems: user.cartItems });
	} catch (error) {
		console.log("Error in addToCart controller");
		res.status(500).json(error);
	}
};

// get cart products
export const getCartProducts = async (req, res) => {
	try {
		console.log("Inside getCartProducts controller");

		const productIds = req.user.cartItems.map((item) => item.product);

		const products = await Product.find({ _id: { $in: productIds } }); // get all the products with the array of id

		// add quantity for each product
		const cartItems = products.map((product) => {
			const item = req.user.cartItems.find(
				(item) => item.product.toString() === product.id,
			);
			return { ...product.toJSON(), quantity: item.quantity };
		});
		res.status(200).json(cartItems);
	} catch (error) {
		console.log("Error in getCartProducts controller");
		res.status(500).json(error);
	}
};

// remove all from cart
export const removeAllFromCart = async (req, res) => {
	try {
		console.log("Inside removeAllFromCart controller");

		const user = req.user;

		user.cartItems = [];
		await user.save();

		res.status(200).json({
			message: "Successfully removed all products from cart",
			cartItems: user.cartItems,
		});
	} catch (error) {
		console.log("Error in removeAllFromCart controller");
		res.status(500).json(error);
	}
};

// update cart quantity
export const updateQuantity = async (req, res) => {
	try {
		console.log("Inside updateQuantitycontroller");

		const { id: productId } = req.params;
		const user = req.user;
		const { quantity } = req.body;

		const existingProduct = user.cartItems.find(
			(item) => item.product.toString() === productId,
		);

		if (existingProduct) {
			if (quantity === 0) {
				user.cartItems = user.cartItems.filter(
					(item) => item.product.toString() !== productId,
				);
				await user.save();
				return res
					.status(200)
					.json({ message: "Updated Product", cartItems: user.cartItems });
			}
			existingProduct.quantity = quantity;
			await user.save();
			res
				.status(200)
				.json({ message: "Updated Product", cartItems: user.cartItems });
		} else {
			return res.status(404).json({ message: "Product not found" });
		}
	} catch (error) {
		console.log("Error in updateQuantity controller");
		res.status(500).json(error);
	}
};
