import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json()); // allows to parse body of req
app.use(cookieParser()); // parse cookies

const PORT = process.env.PORT || 5000;

// routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

app.get("/", (req, res) => {
	res.send("server started running");
});

app.listen(PORT, () => {
	console.log("Server is running on port: http://localhost:" + PORT);

	connectDB();
});
