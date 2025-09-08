const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");

const app = express();

app.use(cookieParser());
app.use(express.json());

// CORS
app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		credentials: true,
	})
);

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

//  error handler
app.use((err, req, res, next) => {
	console.error(err);
	const status = err.status || 500;
	res.status(status).json({ error: err.message || "Server error" });
});

module.exports = app;
