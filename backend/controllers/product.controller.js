import { response } from "express";
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

export const deleteProduct = async (req, res) => {
	try {
		console.log("Inside deleteProduct controller");

		const product = await Product.findById(req.parms.id);

		if (!product) {
			return res.status(404).JSON({ message: "Product not found" });
		}

		// console.log(product);

		// delete from cloudinary
		if (product.image) {
			const publicId = product.image.split("/").pop().split(".")[0];
			try {
				await cloudinary.uploader.destroy(`/products/${publicId}`);
				console.log("deleted image from cloudinary");
			} catch (error) {
				console.log("Error deleting image from cloudinary", error);
			}
		}

		// delete product
		await Product.findByIdAndDelete(req.parms.id);
	} catch (error) {
		console.log("Error in deleteProduct controller", error);
		res.status(500).json(error);
	}
};

// get recommended products
export const getRecommendedProducts = async (req, res) => {
	try {
		console.log("Inside getRecommendedProducts controller");

		const recommendedProducts = await Product.aggregate([
			{ $sample: { $size: 3 } },
			{
				$project: {
					_id: 1,
					name: 1,
					image: 1,
					description: 1,
					price: 1,
				},
			},
		]);

		res
			.status(200)
			.json({ message: "get recommended products", recommendedProducts });
	} catch (error) {
		console.log("Error in getRecommendedProducts controller", error);
		res.status(500).json(error);
	}
};

/// get products by category
export const getProductsByCategory = async (req, res) => {
	try {
		console.log("Inside getProductsByCategory controller");

		const { category } = req.params.category;

		const categoryProducts = await Product.find({ category });

		response
			.status(200)
			.json({ message: "get products by category", categoryProducts });
	} catch (error) {
		console.log("Error in getProductsByCategory controller", error);
		res.status(500).json(error);
	}
};
