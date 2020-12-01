require("dotenv").config();

const express = require("express");
const app = express();

const client = require("./client");

const http = require('http');
const bodyParser = require("body-parser");
app.use(bodyParser.json());
// app.use(express.json)
const cors = require("cors");
app.use(cors({
    exposedHeaders: 'x-secret-token',
  }))

//Routers

const registerRouter = require("./Routes/Register");
app.use("/register", registerRouter);

const loginRouter = require("./Routes/Login");
app.use("/login", loginRouter);


const booksRouter = require("./Routes/Books");
app.use("/books", booksRouter)


//Build server
app.set("port", process.env.port || 3000);




//Start server
app.listen(app.get("port"), (server) => {
	console.info(`Server listen on port ${app.get("port")}`);
});