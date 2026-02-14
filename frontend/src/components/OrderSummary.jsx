import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import axios from "../lib/axios";
import toast from "react-hot-toast";

const OrderSummary = () => {
	const { total, cart } = useCartStore();
	const formattedTotal = total.toFixed(2);

	const handlePayment = async () => {
		try {
			const res = await axios.post(`/payments/create-checkout-session`, {
				products: cart,
			});

			// console.log("Checkout URL:", res.data.url);

			window.location.href = res.data.url;
		} catch (error) {
			toast.error("Error in payment");
			console.error(error);
		}
	};

	return (
		<motion.div
			className="space-y-4 rounded-lg border border-gray-700  p-4 shadow-sm sm:p-6"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<p className="text-xl font-semibold text-sky-500">Checkout Price</p>

			<div className="space-y-4">
				<div className="space-y-2">
					<dl className="flex items-center justify-between gap-4 border-t border-gray-600 pt-2">
						<dt className="text-base font-bold ">Total</dt>
						<dd className="text-base font-bold text-sky-500">
							${formattedTotal}
						</dd>
					</dl>
				</div>

				<motion.button
					className="cursor-pointer flex w-full items-center justify-center rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-600 focus:outline-none focus:ring-4 focus:ring-sky-300"
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.95 }}
					onClick={handlePayment}
				>
					Proceed to Checkout
				</motion.button>

				<div className="flex items-center justify-center gap-2">
					<span className="text-sm font-normal text-gray-400">or</span>
					<Link
						to="/"
						className="inline-flex items-center gap-2 text-sm font-medium text-sky-500 underline hover:text-sky-600 hover:no-underline"
					>
						Continue Shopping
						<MoveRight size={16} />
					</Link>
				</div>
			</div>
		</motion.div>
	);
};
export default OrderSummary;
