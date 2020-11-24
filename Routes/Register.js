const express = require("express");
const client = require("../client");
const registerRouter = express.Router();

registerRouter.get("/", (req, res) => {
	client
		.query("SELECT * FROM users")
		.then((data) => res.json(data.rows))
		.catch((err) => console.log(err));
});

registerRouter.post("/", (req, res)=>{
	const { first_name, surname, email, password, bio, fav_books} = req.body;
	const text = `INSERT INTO users (first_name, surname, email, password, bio, fav_books) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
	const values = [first_name, surname, email, password, bio, fav_books];

	client.query(text, values)
	.then((data)=>res.json(data.rows))
	.catch((error)=> console.log(error));
})

module.exports = registerRouter;