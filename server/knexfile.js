require("dotenv").config();
const path = require("path");

module.exports = {
	development: {
		client: "better-sqlite3",
		connection: { filename: path.join(__dirname, "data", "app.sqlite") },
		useNullAsDefault: true,
		migrations: { directory: path.join(__dirname, "src", "db", "migrations") },
		seeds: { directory: path.join(__dirname, "src", "db", "seeds") },
	},
};
