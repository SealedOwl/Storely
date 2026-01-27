import express from "express";
import {
	login,
	logout,
	refreshToken,
	signup,
} from "../controllers/auth.controller.js";

const router = express.Router();

// signup
router.post("/signup", signup);

// login
router.post("/login", login);

// logout
router.post("/logout", logout);

// refresh access token
router.post("/refresh-token", refreshToken);

export default router;
