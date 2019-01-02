if (process.env.CONFIG) {
	try {
		module.exports = JSON.parse(process.env.CONFIG);
		console.log("Loaded config from CONFIG env variable");
	} catch (err) {
		console.log("Failed to parse CONFIG env variable");
		console.log(err);

		process.exit(1);
	}
} else if (process.env.CONFIG_PATH) {
	module.exports = require(process.env.CONFIG_PATH);
	console.log("Loaded config from " + process.env.CONFIG_PATH);
} else {
	throw new Error("CONFIG or CONFIG_PATH must be set");
}
