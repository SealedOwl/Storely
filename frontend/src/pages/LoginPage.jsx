import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader, Lock, LogIn, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, loading } = useUserStore();

	const handleSubmit = (e) => {
		e.preventDefault();
		login(email, password);
	};
	return (
		<div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<motion.div
				className="sm:mx-auto sm:w-full sm:max-w-md"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<h2 className="mt-6 text-center text-3xl font-extrabold text-sky-500">
					Login to your account
				</h2>
			</motion.div>

			{/* form  */}
			<motion.div
				className="mt-8 sm:mx-auto sm:w-full sm:max-w-md "
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
			>
				<div className=" py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* email  */}
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-500"
							>
								Email
							</label>
							<div className="mt-1 relative rounded-md shadow-sm">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
								</div>
								<input
									type="email"
									id="email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="block w-full px-3 py-2 pl-10 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500"
									placeholder="John@example.com"
								/>
							</div>
						</div>

						{/* password  */}
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-500"
							>
								Password
							</label>
							<div className="mt-1 relative rounded-md shadow-sm">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
								</div>
								<input
									type="password"
									id="password"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="block w-full px-3 py-2 pl-10 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500"
								/>
							</div>
						</div>

						{/* button  */}
						<button
							type="submit"
							className="cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition duration-150 ease-in-out disabled:opacity-50"
							disabled={loading}
						>
							{loading ? (
								<>
									<Loader
										className="mr-2 h-5 w-5 animate-spin"
										aria-hidden="true"
									/>
									Loading...
								</>
							) : (
								<>
									<LogIn className="mr-2 h-5 w-5 " aria-hidden="true" />
									Login
								</>
							)}
						</button>
					</form>

					<p className="mt-8 text-center text-sm text-gray-500">
						Not a member?{" "}
						<Link
							to={"/signup"}
							className="font-medium text-sky-400 hover:text-sky-500"
						>
							Sign up now <ArrowRight className="inline h-4 w-4" />{" "}
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
	);
}

export default LoginPage;
