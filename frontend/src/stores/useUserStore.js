import { create } from "zustand";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";

export const useUserStore = create((set, get) => ({
	user: null,
	loading: false,
	checkingAuth: true,

	signup: async ({ name, email, password, confirmPassword }) => {
		set({ loading: true });

		if (password !== confirmPassword) {
			set({ loading: false });
			return toast.error("Passwords do not match");
		}

		try {
			const res = await axios.post("/auth/signup", { name, email, password });
			set({ user: res.data.user, loading: false });
		} catch (error) {
			set({ loading: false });
			toast.error(error.response?.data?.message || "An error occurred");
		}
	},

	login: async (email, password) => {
		set({ loading: true });

		try {
			const res = await axios.post("/auth/login", { email, password });
			set({ user: res.data.user, loading: false });
		} catch (error) {
			set({ loading: false });
			toast.error(error.response?.data?.message || "An error occurred");
		}
	},

	logout: async () => {
		try {
			await axios.post("/auth/logout");
			set({ user: null });
		} catch (error) {
			toast.error(
				error.response?.data?.message || "An error occurred during logout",
			);
		}
	},

	// check if user is authenticated to persist user even if page is reloaded
	checkAuth: async () => {
		set({ checkingAuth: true });
		try {
			const res = await axios.get("/auth/profile");
			// console.log("AUTH SUCCESS", res.data);
			set({ user: res.data, checkingAuth: false });
		} catch (error) {
			// console.log("AUTH FAILED", error.response?.status);
			set({ checkingAuth: false, user: null });
		}
	},

	// google login
	googleLogin: async (credential) => {
		set({ loading: true });
		try {
			const res = await axios.post("/auth/google", { credential });
			set({ user: res.data.user, loading: false });
		} catch (error) {
			set({ loading: false });
			toast.error(error.response?.data?.message || "Google login failed");
		}
	},
}));
