const express = require("express");
const client = require("../client");
const loginRouter = express.Router();
const jwt = require('jsonwebtoken');
const authorizeUser = require("../middleware/authorizeUser")



loginRouter.post("/", (req, res) =>{
    
    
        const { email, password } = req.body.loginData;
    
        const text = `SELECT * FROM users WHERE email = $1 AND password = $2`;
        const values = [email, password];

        client.query(text, values)
        .then(result => {
            if (!result.rows.length) return  res.status(404).send("this email and password combo don't exist")
            const { id, email } = result.rows[0]
           
            const token = jwt.sign({
                id,
                email
              }, process.env.JWT_SECRET, { expiresIn: '1h' });

            //   console.log(result.rows[0])
            //   console.log(token)

              res.set('x-secret-token', token).send(result.rows)
        })
        .catch(error=>{
            res.status(400).send({bad: error.message})
        })
})

loginRouter.post("/me", authorizeUser, (req, res) => {
    
   const { id, email } = req.user

    const text = `SELECT first_name, surname, email, bio, fav_book FROM users WHERE id = $1 AND email = $2`
    const values = [id, email]

    client
        .query(text, values)
        .then((data) => res.send(data.rows[0]))
        .catch((err)=>console.log(err))
    
    /* client
		.query("SELECT * FROM users")
		.then((data) => res.json(data.rows))
		.catch((err) => console.log(err)); */  
        // res.send(req.user)
        
});




module.exports = loginRouter;