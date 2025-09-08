const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, findByEmail } = require("../models/user");
const auth = require("../middleware/auth");
function setAuthCookie(res, payload) {
	const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || "15m" });
	res.cookie("accessToken", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
		path: "/",
		maxAge: 1000 * 60 * 15,
	});
}
router.get("/me", auth, async (req, res) => {
	res.json({ id: req.user.sub, email: req.user.email, role: req.user.role });
});
router.post("/register", async (req, res, next) => {
	try {
		const { email, password, role } = req.body;
		if (!email || !password) return res.status(400).json({ error: "Email and password required" });
		const existing = await findByEmail(email);
		if (existing) return res.status(409).json({ error: "Email already registered" });
		const hash = await bcrypt.hash(password, 10);
		const newUser = await createUser({ email, passwordHash: hash, role: role || "user" });
		res.status(201).json({ id: newUser.id, email: newUser.email, role: newUser.role });
	} catch (e) {
		next(e);
	}
});

router.post("/login", async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) return res.status(400).json({ error: "Email and password required" });
		const user = await findByEmail(email);
		if (!user) return res.status(401).json({ error: "Invalid credentials" });
		const ok = await bcrypt.compare(password, user.password);
		if (!ok) return res.status(401).json({ error: "Invalid credentials" });

		setAuthCookie(res, { sub: user.id, email: user.email, role: user.role });
		res.json({ id: user.id, email: user.email, role: user.role });
	} catch (e) {
		next(e);
	}
});

router.post("/logout", (req, res) => {
	res.clearCookie("accessToken", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
		path: "/",
	});
	res.status(204).end();
});

module.exports = router;
