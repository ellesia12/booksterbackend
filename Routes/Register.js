const express = require("express");
const client = require("../client");
const registerRouter = express.Router();

registerRouter.get("/", (req, res) => {
	client
		.query("SELECT * FROM users")
		.then((data) => res.json(data.rows))
		.catch((err) => console.log(err));
});

/* registerRouter.post("/", (req, res)=> {
	const first_name = req.body.first_name;
	const surname = req.body.surname;
	const email = req.body.email;
	const password = req.body.password;
	const bio = req.body.bio;
	const fav_book = req.body.fav_book;


	client.query(
		'INSERT INTO users (first_name, surname, email, password, bio, fav_book) VALUES (?,?,?,?,?,?)',
		[first_name, surname, email, password, bio, fav_book],
		(err, result) =>{
			console.log(err)
		}
	)
}) */

registerRouter.post("/", (req, res) =>{
/* console.log(req.body) */

	const { first_name, surname, email, password, bio, fav_book} = req.body.registerData;

	const text = `INSERT INTO users (first_name, surname, email, password, bio, fav_book) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
	const values = [first_name, surname, email, password, bio, fav_book];

	client.query(text, values)
	.then((data)=>res.json(data.rows))
	.catch((error)=> console.log(error)); 

});







// Elephant SQL version of post 



module.exports = registerRouter;