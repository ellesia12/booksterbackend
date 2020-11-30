const express = require("express");
const client = require("../client");
const booksRouter = express.Router();





booksRouter.post("/", (req, res) =>{
    
    // double check on frontend how data is given to us OR be sure to send back "bookData " in this way

    const { isbn, title, thumbnail, synopsis, author } = req.body.bookData;

    const text = `INSERT INTO books (isbn, title, thumbnail, synopsis, author) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [isbn, title, thumbnail, synopsis, author];

    client.query(text, values)
	.then((data)=>res.json(data.rows))
	.catch((error)=> console.log(error)); 
})


module.exports = booksRouter;