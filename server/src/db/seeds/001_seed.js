const bcrypt = require("bcrypt");

exports.seed = async function seed(knex) {
	await knex("products").del();
	await knex("users").del();

	const now = new Date().toISOString();

	const adminHash = await bcrypt.hash("Admin@123", 10);
	const userHash = await bcrypt.hash("User@123", 10);

	await knex("users").insert([
		{ email: "admin@example.com", password: adminHash, role: "admin", created_at: now, updated_at: now },
		{ email: "user@example.com", password: userHash, role: "user", created_at: now, updated_at: now },
	]);

	await knex("products").insert([
		{
			name: "Sample Phone",
			description: "Great phone",
			price: 499.99,
			stock: 10,

			created_at: now,
			updated_at: now,
		},
		{
			name: "Sample Laptop",
			description: "Fast laptop",
			price: 1299.0,
			stock: 5,

			created_at: now,
			updated_at: now,
		},
	]);
};
