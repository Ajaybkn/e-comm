const knex = require("../db/knex");

async function createUser({ email, passwordHash, role = "user" }) {
	const now = new Date().toISOString();
	const [id] = await knex("users").insert({
		email,
		password: passwordHash,
		role,

		created_at: now,
		updated_at: now,
	});
	return { id, email, role };
}

function findByEmail(email) {
	return knex("users").where({ email }).first();
}

function findById(id) {
	return knex("users").where({ id }).first();
}

module.exports = { createUser, findByEmail, findById };
