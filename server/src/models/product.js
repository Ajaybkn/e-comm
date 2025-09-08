const knex = require("../db/knex");

function listAll() {
	return knex("products").select("*").orderBy("id", "desc");
}

async function create({ name, description, price, stock }) {
	const now = new Date().toISOString();
	const [id] = await knex("products").insert({
		name,
		description,
		price,
		stock,

		created_at: now,
		updated_at: now,
	});
	return findById(id);
}

function findById(id) {
	return knex("products").where({ id }).first();
}

async function updateById(id, data) {
	const upd = { ...data, updated_at: new Date().toISOString() };
	await knex("products").where({ id }).update(upd);
	return findById(id);
}

function removeById(id) {
	return knex("products").where({ id }).del();
}

module.exports = { listAll, create, findById, updateById, removeById };
