const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
	try {
		const token = req.cookies?.accessToken;
		if (!token) return res.status(401).json({ error: "Unauthorized" });
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = payload;
		next();
	} catch (e) {
		return res.status(401).json({ error: "Invalid or expired token" });
	}
};
