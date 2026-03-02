import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "10mb" })); // allows to parse body of req
app.use(cookieParser()); // parse cookies
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	}),
);

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "frontend", "dist")));

	app.use((req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}
app.get("/", (req, res) => {
	res.send("server started running");
});

app.listen(PORT, () => {
	console.log("Server is running on port: http://localhost:" + PORT);

	connectDB();
});
