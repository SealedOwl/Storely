import express from "express";
import {
	addToCart,
	getCartProducts,
	removeAllFromCart,
	updateQuantity,
} from "../controllers/cart.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

// add to cart
router.post("/", protectRoute, addToCart);

// get cart products
router.get("/", protectRoute, getCartProducts);

// remove all from cart
router.delete("/", protectRoute, removeAllFromCart);

// update cart quantity
router.put("/:id", protectRoute, updateQuantity);

export default router;
