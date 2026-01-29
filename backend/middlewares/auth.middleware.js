import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.model.js";

dotenv.config();
export const protectRoute = async (req, res, next) => {
	try {
		// console.log("Inside protectRoute");
		const accessToken = req.cookies.accessToken;

		if (!accessToken) {
			return res
				.status(401)
				.json({ message: "Unauthorized - Access token is not provided" });
		}

		const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		req.user = user;

		next();
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

export const adminRoute = async (req, res, next) => {
	if (req.user && req.user.role === "admin") {
		next();
	} else {
		return res.status(401).json({ message: "Access denied - Admin only" });
	}
};
