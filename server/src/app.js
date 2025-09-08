const express = require("express");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");

const app = express();
require("dotenv").config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("JWT_EXPIRES:", process.env.JWT_EXPIRES);
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("CORS_ORIGIN:", process.env.CORS_ORIGIN);

app.use(cookieParser());
app.use(express.json());

// CORS
app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		credentials: true,
	})
);

// Serve static files
app.use(express.static(path.join(__dirname, "../../client/dist")));

// Fallback to serve frontend for non-API routes
app.get(/^(?!\/api).*/, (req, res) => {
	res.sendFile(path.resolve(__dirname, "../../client", "dist", "index.html"));
});
// app.get(/^(?!\/api).*/, (req, res) => {
// 	res.sendFile(path.resolve(__dirname, "../../client", "dist", "index.html"));
//   });

// Health check route
app.get("/api/health", (req, res) => res.json({ ok: true }));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Error handler
app.use((err, req, res, next) => {
	console.error(err);
	const status = err.status || 500;
	res.status(status).json({ error: err.message || "Server error" });
});

module.exports = app;
