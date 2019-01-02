const express = require("express");
const router = express.Router();

const config = require("../config.js");

// setup routing
router.get("/", (req, res, next) => {
	res.render("dashboard", config);
});

// export the module
module.exports = router;
