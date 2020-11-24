const express = require("express");
const client = require("../client");
const loginRouter = express.Router();

loginRouter.get("/", (req, res, next) => {
	client
		.query("SELECT * FROM users")
		.then((data) => res.json(data.rows))
		.catch((err) => console.log(err));
});

module.exports = loginRouter;