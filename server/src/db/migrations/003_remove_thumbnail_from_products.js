exports.up = async function up(knex) {
	const hasCol = await knex.schema.hasColumn("products", "thumbnail");
	if (hasCol) {
		await knex.schema.alterTable("products", (t) => {
			t.dropColumn("thumbnail");
		});
	}
};

exports.down = async function down(knex) {
	const hasCol = await knex.schema.hasColumn("products", "thumbnail");
	if (!hasCol) {
		await knex.schema.alterTable("products", (t) => {
			t.text("thumbnail").notNullable().defaultTo("");
		});
	}
};
