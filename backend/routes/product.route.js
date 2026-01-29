import express from "express";
import {
	createProduct,
	featuredProducts,
	getAllProducts,
} from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

// get all products
router.get("/", protectRoute, adminRoute, getAllProducts);

// get featured products
router.get("/featured", featuredProducts);

// create product
router.post("/", protectRoute, adminRoute, createProduct);

export default router;
