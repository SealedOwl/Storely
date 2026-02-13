import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "../lib/axios";

export const useCartStore = create((set, get) => ({
	cart: [],
	total: 0,

	// get cart items
	getCartItems: async () => {
		try {
			const res = await axios.get("/cart");
			set({ cart: res.data.cartItems });
			get().calculateTotals();
		} catch (error) {
			set({ cart: [] });
			toast.error(error.response?.data?.message || "An error occurred");
		}
	},

	// add products to cart
	addToCart: async (product) => {
		try {
			await axios.post("/cart", { productId: product._id });

			set((prevState) => {
				const existingItem = prevState.cart.find(
					(item) => item._id === product._id,
				);
				// if product already exists => quantity += 1, else quantity = 1
				const newCart = existingItem
					? prevState.cart.map((item) =>
							item._id === product._id
								? { ...item, quantity: item.quantity + 1 }
								: item,
						)
					: [...prevState.cart, { ...product, quantity: 1 }];
				return { cart: newCart };
			});
			get().calculateTotals();
		} catch (error) {
			toast.error(error.response?.data?.message || "An error occurred");
		}
	},

	// total amount
	calculateTotals: () => {
		const { cart } = get();
		const totalPrice = cart.reduce((sum, item) => {
			return sum + item.price * item.quantity;
		}, 0);
		set({ total: totalPrice });
	},

	// remove the product from cart
	removeFromCart: async (productId) => {
		try {
			await axios.delete("/cart", { data: { productId } });
			set((prevState) => ({
				cart: prevState.cart.filter((product) => product._id !== productId),
			}));
			get().calculateTotals();
		} catch (error) {
			toast.error(error.response?.data?.message || "An error occurred");
		}
	},

	// update cart item quantity
	updateQuantity: async (productId, quantity) => {
		try {
			if (quantity === 0) {
				get().removeFromCart(productId);
				return;
			}

			await axios.put(`/cart/${productId}`, { quantity });
			set((prevState) => ({
				cart: prevState.cart.map((item) =>
					item._id === productId ? { ...item, quantity } : item,
				),
			}));
			get().calculateTotals();
		} catch (error) {
			toast.error(error.response?.data?.message || "An error occurred");
		}
	},
}));
