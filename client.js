const { Pool } = require("pg");
const pool = new Pool();

const client = new Pool({
	
	user: process.env.PGUSER,
	password: process.env.PGPASSWORD,
	host: process.env.PGHOST,
	database: process.env.PGUSER,
	port: Number(process.env.PGPORT)
  });
  
  module.exports = client;