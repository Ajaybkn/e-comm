const knexConfig = require("../../knexfile");
const env = "development";
const knex = require("knex")(knexConfig[env]);
module.exports = knex;
