import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";

function App() {
	return (
		<div className="min-h-screen  bg-linear-to-br from-blue-100 via-white to-indigo-200">
			<div className="relative z-50 pt-20">
				<Navbar />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/signup" element={<SignUpPage />} />
					<Route path="/login" element={<LoginPage />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
