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
