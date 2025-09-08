const router = require("express").Router();
const auth = require("../middleware/auth");
const requireAdmin = require("../middleware/requireAdmin");
const Products = require("../models/product");

// Public: list products
router.get("/", async (req, res, next) => {
	try {
		const items = await Products.listAll();
		res.json(items);
	} catch (e) {
		next(e);
	}
});

// Admin: create
router.post("/", auth, requireAdmin, async (req, res, next) => {
	try {
		const { name, description, price, stock } = req.body;
		if (!name || !description || price == null || stock == null) {
			return res.status(400).json({ error: "All fields required" });
		}
		const product = await Products.create({ name, description, price, stock });
		res.status(201).json(product);
	} catch (e) {
		next(e);
	}
});

// Admin: update
router.put("/:id", auth, requireAdmin, async (req, res, next) => {
	try {
		const allowed = ["name", "description", "price", "stock"];
		const data = Object.fromEntries(Object.entries(req.body).filter(([k]) => allowed.includes(k)));
		const product = await Products.updateById(req.params.id, data);
		res.json(product);
	} catch (e) {
		next(e);
	}
});

// Admin: delete
router.delete("/:id", auth, requireAdmin, async (req, res, next) => {
	try {
		await Products.removeById(req.params.id);
		res.status(204).end();
	} catch (e) {
		next(e);
	}
});

module.exports = router;
