const express = require("express");
const client = require("../client");
const usersBooksRouter = express.Router();






usersBooksRouter.get("/", (req, res)=>{
    


    text = `SELECT * FROM books
    JOIN userhasbooks
    ON books.id = userhasbooks.book_id
    JOIN users
    ON users.id = userhasbooks.user_id 
    WHERE userhasbooks.user_id=1`

    client.query(text)
    .then(data=> {
        console.log(data.rows)
        res.send(data.rows)})
    .catch(err=>console.log(err.message))
})








module.exports = usersBooksRouter;