import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import LoadingSpinner from "./components/LoadingSpinner";
import AdminPage from "./pages/AdminPage";

function App() {
	const { user, checkAuth, checkingAuth } = useUserStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (checkingAuth) return <LoadingSpinner />;

	return (
		<div className="min-h-screen  bg-linear-to-br from-blue-100 via-white to-indigo-200">
			<div className="relative z-50 pt-20">
				<Navbar />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route
						path="/signup"
						element={!user ? <SignUpPage /> : <Navigate to={"/"} />}
					/>
					<Route
						path="/login"
						element={!user ? <LoginPage /> : <Navigate to={"/"} />}
					/>
					<Route
						path="/admin-dashboard"
						element={
							user?.role === "admin" ? (
								<AdminPage />
							) : (
								<Navigate to={"/login"} />
							)
						}
					/>
				</Routes>
			</div>
			<Toaster />
		</div>
	);
}

export default App;
