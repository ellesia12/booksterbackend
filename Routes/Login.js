const express = require("express");
const client = require("../client");
const loginRouter = express.Router();
const jwt = require('jsonwebtoken');
const authorizeUser = require("../middleware/authorizeUser")
const bcrypt = require('bcrypt')
const registerRouter = require('./Register')



loginRouter.post('/', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    const email = req.body.email;
    const password = req.body.password; 
    const user = `SELECT * FROM users WHERE email = $4 AND password = $7`
    if(user) {
      const validPassword = await bcrypt.compare(password, hashedPassword );
       if(validPassword) {
         res.status(200).json('Valid email and password');
       } else {
         res.json('Wrong password!');
    }
  }
  } catch(e) {
    console.log(e);
    res.status(500).send('Something broke!');
  }
})
// loginRouter.post ("/", async (req, res) => {
//       const user = `SELECT * FROM users WHERE email = $4 AND password = $7`
      
//       if (user == null) {
//         return res.status(400).send('Cannot find user')
//       }

//       try{
//        if( await bcrypt.compare(req.body.password, registerRouter.hashedPassword)) {
//          res.send('Success') 
//        } else {
//          res.send('Not allowed')
//        }
//         } catch  {
//         res.status(500).send()
//         }
      
      
// })

//  loginRouter.post("/", (req, res) =>{
    
    
//        const email = req.body.email;
//        const password =  registerRouter.hashedPassword

//        bcrypt.comapre(req.body.password, password)


    
//      const text = `SELECT * FROM users WHERE email = $4 AND password = $7`;
//      const values = [email, password];



//          client.query(text, values)
//             .then(result => {
//              if (!result.rows.length) return  res.status(404).send("this email and password combo don't exist")
//              const { id, email } = result.rows[0]
           
//              const token = jwt.sign({
//                  id,
//                  email
//                }, process.env.JWT_SECRET, { expiresIn: '1h' });

//              //   console.log(result.rows[0])
//              //   console.log(token)

//                res.set('x-secret-token', token).send(result.rows)
//          })
//          .catch(error=>{
//              res.status(400).send({bad: error.message})
//          })
//  })

//  loginRouter.post("/me", authorizeUser, (req, res) => {
    
//     const id = req.body.id;
//     const email = req.body.email;

//      const text = `SELECT first_name, surname, email, bio, fav_book, password FROM users WHERE id = $1 AND email = $4`
//      const values = [id, email]

//      client
//          .query(text, values)
//          .then((data) => res.send(data.rows[0]))
//       .catch((err)=>console.log(err))
    
//     client
// 		.query("SELECT * FROM users")
// 		.then((data) => res.json(data.rows))
// 		.catch((err) => console.log(err));  
//          res.send(req.user)
        
//  });




module.exports = loginRouter;