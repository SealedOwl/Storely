import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

import { redis } from "../lib/redis.js";

const generateToken = (userId) => {
	const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "15m",
	});

	const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: "7d",
	});

	return { accessToken, refreshToken };
};

const storeRefreshToken = async (userId, refreshToken) => {
	await redis.set(
		`refresh_token:${userId}`,
		refreshToken,
		"EX",
		7 * 24 * 60 * 60,
	); // expire in 7days
};

const setCookies = (res, accessToken, refresh_token) => {
	res.cookie("accessToken", accessToken, {
		httpOnly: true, // prevent XSS attacks, cross-site scripting attack
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict", // prevent CSRF attacks, cross-site request forgery attack
		maxAge: 15 * 60 * 1000, // 15mins
	});
	res.cookie("refreshToken", refresh_token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 7 * 24 * 60 * 1000, // 7days
	});
};

// signup
export const signup = async (req, res) => {
	try {
		console.log("Inside signup controller");

		const { name, email, password } = req.body;
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return res
				.status(400)
				.json({ message: "User already exists, please login" });
		}

		const user = await User.create({ name, email, password });

		// authenticate
		const { accessToken, refreshToken } = generateToken(user._id);
		await storeRefreshToken(user._id, refreshToken);

		// set cookie
		setCookies(res, accessToken, refreshToken);

		res.status(201).json({
			message: "New user created successfully",
			user: {
				_id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
		});
	} catch (error) {
		console.log("Error in signup controller", error);
		res.status(500).json(error);
	}
};

// login
export const login = async (req, res) => {
	try {
		console.log("Inside login controller");
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (user && (await user.comparePassword(password))) {
			const { accessToken, refreshToken } = generateToken(user._id);

			await storeRefreshToken(user._id, refreshToken);
			setCookies(res, accessToken, refreshToken);

			res.status(200).json({
				message: "User logged in successfully",
				user: {
					_id: user._id,
					name: user.name,
					email: user.email,
					role: user.role,
				},
			});
		} else {
			res
				.status(401)
				.json({ message: "User not found or Invalid credentials" });
		}
	} catch (error) {
		console.log("Error in login controller", error);
		res.status(500).json(error);
	}
};

// logout
export const logout = async (req, res) => {
	try {
		console.log("Inside logout controller");
		const refreshToken = req.cookies.refreshToken;

		if (refreshToken) {
			const decoded = jwt.verify(
				refreshToken,
				process.env.REFRESH_TOKEN_SECRET,
			);
			await redis.del(`refresh_token:${decoded.userId}`);
		}

		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error);
		res.status(500).json(error);
	}
};

// this will refresh the access token
export const refreshToken = async (req, res) => {
	try {
		console.log("Inside refreshToken controller");

		const refreshToken = req.cookies.refreshToken;

		if (!refreshToken) {
			return res.status(401).json({ message: "No refresh token provided" });
		}

		const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		const storedToken = await redis.get(`refresh_token:${decoded.userId}`);

		if (storedToken !== refreshToken) {
			return res.status(401).json({ message: "Invalid refresh token" });
		}

		const accessToken = jwt.sign(
			{ userId: decoded.userId },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "15m" },
		);

		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 15 * 60 * 1000,
		});

		res.status(200).json({ message: "Token refreshed successfully" });
	} catch (error) {
		console.log("Error in refreshToken controller", error);
		res.status(500).json(error);
	}
};
