import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

// routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
	res.send("server started running");
});

app.listen(PORT, () => {
	console.log("Server is running on port: http://localhost:" + PORT);

	connectDB();
});
