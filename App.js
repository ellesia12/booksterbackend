require("dotenv").config();

const express = require("express");
const app = express();

const client = require("./client");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

//Build server
app.set("port", process.env.port || 3000);




//Start server
app.listen(app.get("port"), (server) => {
	console.info(`Server listen on port ${app.get("port")}`);
});