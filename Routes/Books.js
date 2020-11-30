const express = require("express");
const client = require("../client");
const booksRouter = express.Router();





booksRouter.post("/", (req, res) =>{
    
    // double check on frontend how data is given to us OR be sure to send back "bookData " in this way

    const { title, thumbnail, synopsis, author, googleid } = req.body.bookData;

    const text = `INSERT INTO books (title, thumbnail, synopsis, author, googleid) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [title, thumbnail, synopsis, author, googleid];

    client.query(text, values)
	.then((data)=>res.json(data.rows))
	.catch(error=>{
        res.status(400).send({bad: error})
    })
})


module.exports = booksRouter;