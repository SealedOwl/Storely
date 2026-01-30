import express from "express";
import {
	createProduct,
	deleteProduct,
	featuredProducts,
	getAllProducts,
	getProductsByCategory,
	getRecommendedProducts,
	toggleFeaturedProduct,
} from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

// get all products
router.get("/", protectRoute, adminRoute, getAllProducts);

// get featured products
router.get("/featured", featuredProducts);

// create product
router.post("/", protectRoute, adminRoute, createProduct);

// delete product
router.post("/:id", protectRoute, adminRoute, deleteProduct);

// get recommended products
router.get("/recommendations", getRecommendedProducts);

// get products by category
router.get("/category/:category", getProductsByCategory);

// toggle featured product
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);

export default router;
