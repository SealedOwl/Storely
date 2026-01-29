import cloudinary from "../lib/cloudinary.js";
import { redis } from "../lib/redis.js";
import { Product } from "../models/product.model.js";

// get all products
export const getAllProducts = async (req, res) => {
	try {
		console.log("Inside getAllProducts controller");
		const products = await Product.find();

		res.status(200).json({ message: "Fetched all products", products });
	} catch (error) {
		console.log("Error in getAllProducts controller", error);
		res.status(500).json(error);
	}
};

// get featured products

export const featuredProducts = async (req, res) => {
	try {
		console.log("Inside featuredProducts controller");

		// check if in cache
		let featuredProducts = await redis.get("featured_products");
		if (featuredProducts) {
			return res.status(200).json(JSON.parse(featuredProducts));
		}

		// if not in redis, fetch from mongoDB
		// .lean() - return js object , instead of mongoDB document, which is good for performance
		featuredProducts = await Product.find({ isFeatured: true }).lean();

		if (!featuredProducts) {
			return res.status(404).json({ message: "No featured products found" });
		}

		// store in redis
		await redis.set("featured_products", JSON.stringify(featuredProducts));

		res
			.status(200)
			.json({ message: "Fetched featured products", featuredProducts });
	} catch (error) {
		console.log("Error in featuredProducts controller", error);
		res.status(500).json(error);
	}
};

// create product
export const createProduct = async (req, res) => {
	try {
		console.log("Inside createProduct controller");

		const { name, description, price, image, category } = req.body;

		let cloudinaryResponse = null;

		if (image) {
			cloudinaryResponse = await cloudinary.uploader.upload;
			(image, { folder: "products" });
		}

		const newProduct = await Product.create({
			name,
			description,
			price,
			image: cloudinaryResponse?.secure_url
				? cloudinaryResponse.secure_url
				: "",
			category,
		});

		return res
			.status(201)
			.json({ message: "Product created successfully", newProduct });
	} catch (error) {
		console.log("Error in createProduct controller", error);
		res.status(500).json(error);
	}
};
