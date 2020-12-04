const { Router } = require('express');
const express= require('express');
const chat = express.Router();

chat.get('/', (req, res) => {
    res.send('server is up and running');
})

module.exports = chat;