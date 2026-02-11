import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useProductStore = create((set, get) => ({
	products: [],
	loading: false,

	setProducts: (products) => set({ products }),

	// create a new product
	createProduct: async (productData) => {
		set({ loading: true });
		try {
			const res = await axios.post("/products", productData);
			set((prevState) => ({
				products: [...prevState.products, res.data.newProduct],
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
			throw error;
		}
	},

	// get all products
	fetchAllProducts: async () => {
		set({ loading: true });
		try {
			const res = await axios.get("/products");
			set({
				products: res.data.products,
				loading: false,
			});
		} catch (error) {
			set({ loading: false });
			throw error;
		}
	},

	// delete product
	deleteProduct: async (productId) => {
		set({ loading: true });
		try {
			await axios.delete(`/products/${productId}`);
			set((prevState) => ({
				products: prevState.products.filter(
					(product) => product._id !== productId,
				),
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
			throw error;
		}
	},

	// toggle featured product
	toggleFeaturedProduct: async (productId) => {
		set({ loading: true });
		try {
			const res = await axios.patch(`/products/${productId}`);
			const updatedProduct = res.data.updatedProduct;
			set((prevState) => ({
				products: prevState.products.map((product) =>
					product._id === productId ? updatedProduct : product,
				),
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
			throw error;
		}
	},
}));
