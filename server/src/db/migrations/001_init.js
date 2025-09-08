exports.up = async function up(knex) {
	await knex.schema.createTable("users", (t) => {
		t.increments("id").primary();
		t.string("email").notNullable().unique();
		t.string("password").notNullable();
		t.string("role").notNullable().defaultTo("user"); // 'user' | 'admin'
		t.text("created_at");
		t.text("updated_at");
	});

	await knex.schema.createTable("products", (t) => {
		t.increments("id").primary();
		t.string("name").notNullable();
		t.text("description").notNullable();
		t.float("price").notNullable();
		t.integer("stock").notNullable();
		t.text("created_at");
		t.text("updated_at");
	});
};

exports.down = async function down(knex) {
	await knex.schema.dropTableIfExists("products");
	await knex.schema.dropTableIfExists("users");
};
