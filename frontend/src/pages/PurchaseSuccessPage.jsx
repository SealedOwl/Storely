import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../lib/axios";
import { useCartStore } from "../stores/useCartStore";

const PurchaseSuccessPage = () => {
	const [isProcessing, setIsProcessing] = useState(true);
	const { clearCart } = useCartStore();
	const [error, setError] = useState(null);

	useEffect(() => {
		const handleCheckoutSuccess = async (sessionId) => {
			try {
				await axios.post("/payments/checkout-success", {
					sessionId,
				});
				clearCart();
			} catch (error) {
				console.log(error);
			} finally {
				setIsProcessing(false);
			}
		};

		const sessionId = new URLSearchParams(window.location.search).get(
			"session_id",
		);
		if (sessionId) {
			handleCheckoutSuccess(sessionId);
		} else {
			setIsProcessing(false);
			setError("No session ID found in the URL");
		}
	}, [clearCart]);

	if (isProcessing)
		return (
			<h2 className="text-center text-3xl font-medium text-sky-500">
				Processing...
			</h2>
		);

	if (error) return `Error: ${error}`;

	return (
		<div className="h-screen flex items-center justify-center px-4">
			<div className="max-w-md w-full  rounded-lg shadow-xl overflow-hidden relative z-10">
				<div className="p-6 sm:p-8">
					<div className="flex justify-center">
						<CheckCircle className="text-sky-500 w-16 h-16 mb-4" />
					</div>
					<h1 className="text-2xl sm:text-3xl font-bold text-center text-sky-500 mb-2">
						Purchase Successful!
					</h1>

					<p className="text-gray-500 text-center mb-2">
						Thank you for your order. {"We're"} processing it now.
					</p>

					<div className=" rounded-lg p-4 mb-6">
						<div className="flex items-center justify-between mb-2">
							<span className="text-sm text-gray-500">Order number</span>
							<span className="text-sm font-semibold text-sky-500">#12345</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm text-gray-400">Estimated delivery</span>
							<span className="text-sm font-semibold text-sky-500">
								3-5 business days
							</span>
						</div>
					</div>

					<div className="space-y-4">
						<button
							className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4
             rounded-lg transition duration-300 flex items-center justify-center"
						>
							<HandHeart className="mr-2" size={18} />
							Thanks for trusting us!
						</button>
						<Link
							to={"/"}
							className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 
            rounded-lg transition duration-300 flex items-center justify-center"
						>
							Continue Shopping
							<ArrowRight className="ml-2" size={18} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
export default PurchaseSuccessPage;
