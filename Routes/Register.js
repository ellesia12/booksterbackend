const express = require("express");
const client = require("../client");
const registerRouter = express.Router();
const bcrypt = require('bcrypt')

 
registerRouter.post("/", async (req, res)=> {
	
	
	const hashedPassword = await bcrypt.hash(req.body.password, 10);
	
	console.log(hashedPassword)

	//  const { first_name, surname, email, bio, fav_book} = req.body.registerData;
	
	
	
	const first_name = req.body.first_name ;
	const surname = req.body.surname;
	const email =  req.body.email;
	const bio = req.body.bio;
	const fav_book =  req.body.fav_book;
	const password =  hashedPassword;
	
	
	const text = `INSERT INTO users (first_name, surname, email, bio, fav_book, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
	const values = await [ first_name, surname, email, bio, fav_book, password ]
	
	
client.query(text, values) 
	.then((data)=>res.json(data.rows))
	.catch((error)=> console.log(error)); 
	 })


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

// registerRouter.post("/", async (req, res) =>{
// /* console.log(req.body) */
//     const saltRounds = 10;
// 	const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
// 	console.log(hashedPassword)

// 	const first_name = req.body.first_name
// 	const surname = req.body.surname
// 	const email = req.body.email
// 	const password = hashedPassword
// 	const bio = req.body.bio
// 	const fav_book = req.body.fav_book

// 	const text = await `INSERT INTO users (first_name, surname, email, hashedPassword, bio, fav_book) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
// 	const values = [first_name, surname, email, hashedPassword, bio, fav_book];

// 	client.query(text, values)
// 	.then((data)=>res.json(data.rows))
// 	.catch((error)=> console.log(error)); 

// });

// registerRouter.post("/", (req, res) =>{
// 	/* console.log(req.body) */
	
// 		const { first_name, surname, email, password, bio, fav_book} = req.body.registerData;
	
// 		const text = `INSERT INTO users (first_name, surname, email, password, bio, fav_book) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
// 		const values = [first_name, surname, email, password, bio, fav_book];
	
// 		client.query(text, values)
// 		.then((data)=>res.json(data.rows))
// 		.catch((error)=> console.log(error)); 
	
// 	});
	







// Elephant SQL version of post 



module.exports = registerRouter;