import { Lock, LogIn, LogOut, ShoppingCart, UserPlus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

function Navbar() {
	const { user, logout } = useUserStore();
	const isAdmin = user?.role === "admin";
	const { cart } = useCartStore();

	return (
		<header className="w-full fixed top-0 left-0 z-40 bg-opacity-90 backdrop-blur-md shadow-lg">
			<div className="container mx-auto px-4 py-3">
				<div className="flex flex-wrap justify-between items-center">
					<Link
						to={"/"}
						className="text-2xl font-bold text-sky-400 flex items-center space-x-2"
					>
						Storely
					</Link>

					<nav className="flex flex-wrap gap-4 items-center">
						<Link
							to={"/"}
							className="hover:text-sky-400 transition ease-in-out duration-300"
						>
							Home
						</Link>

						{user && (
							<Link to={"/cart"} className="relative group">
								<ShoppingCart
									className="inline-block mr-1 group-hover:text-sky-400 transition ease-in-out duration-300"
									size={20}
								/>
								<span className="hidden sm:inline group-hover:text-sky-400 transition ease-in-out duration-300">
									Cart
								</span>
								{cart.length > 0 && (
									<span className="absolute -top-3 -left-2 rounded-full px-2 py-0.5 text-xs bg-sky-300 ">
										{cart.length}
									</span>
								)}
							</Link>
						)}

						{isAdmin && (
							<Link
								to={"/admin-dashboard"}
								className="flex items-center text-white bg-sky-600 hover:bg-sky-500 px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out"
							>
								<Lock className="inline-block mr-1" size={18} />
								<span className="hidden sm:inline">Dashboard</span>
							</Link>
						)}

						{user ? (
							<button
								onClick={logout}
								className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center transition duration-300 ease-in-out"
							>
								<LogOut size={18} />
								<span className="hidden sm:inline ml-2">Logout</span>
							</button>
						) : (
							<>
								<Link
									to={"/signup"}
									className="flex items-center text-white bg-sky-600 hover:bg-sky-500 px-4 py-2 rounded-md font-medium transition duration-300 ease-in-out"
								>
									<UserPlus className="mr-2" size={18} />
									<span>Sign Up</span>
								</Link>
								<Link
									to={"/login"}
									className="flex items-center text-sky-500 bg-white hover:bg-sky-500 hover:text-white border border-sky-300 px-4 py-2 rounded-md font-medium transition duration-300 ease-in-out"
								>
									<LogIn className="mr-2" size={18} />
									<span>Login</span>
								</Link>
							</>
						)}
					</nav>
				</div>
			</div>
		</header>
	);
}

export default Navbar;
