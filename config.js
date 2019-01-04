const yaml = require("js-yaml");
const fs = require("fs");

let config;

if (process.env.CONFIG) {
	console.log("Loaded config from env");
	config = process.env.CONFIG;
} else if (process.env.CONFIG_PATH) {
	console.log("Loaded config from " + process.env.CONFIG_PATH);
	config = fs.readFileSync(process.env.CONFIG_PATH, "utf8");
} else {
	throw new Error("CONFIG or CONFIG_PATH must be set");
}

let error;

if (String(config).match(/^---/)) {
	try {
		module.exports = yaml.safeLoad(config);
	} catch (err) {
		error = err;
	}
} else {
	try {
		module.exports = JSON.parse(config);
	} catch (err) {
		error = err;
	}
}

if (error) {
	console.log("Failed to parse CONFIG env variable");
	console.log(err);

	process.exit(1);
}
