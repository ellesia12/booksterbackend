const express = require("express");
const client = require("../client");
const loginRouter = express.Router();





loginRouter.post("/", (req, res) =>{
    
    
        const { email, password } = req.body.loginData;
    
        const text = `SELECT * FROM users WHERE email = $1 AND password = $2`;
        const values = [email, password];

        client.query(text, values)
        .then(result => {
            if (!result.rows.length) return  res.status(404).send("this email and password combo don't exist")
            res.send(result.rows)
        })
        .catch(error=>{
            res.status(400).send({bad: error})
        })
    
     /*    client.query(text, values, (error, result) =>{
            if(error){
                res.send({error: error})
            }
            if(result){
                res.send(result);
            } else{
                res.send( {message:"this email and password combo don't exist"});
            }
        }
    )
    });
 */

   /*  console.log(req.body)
    )
        .then((data)=>res.json(data.rows))
        .catch((error)=> console.log(error)); */

})





module.exports = loginRouter