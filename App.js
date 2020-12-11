require("dotenv").config();
const http = require('http');
const express = require("express");
const app = express();
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server, 
  {
  cors: {
    origin: "http://localhost:3001",
    // methods: ["GET", "POST"],
    // allowHeaders: ['x-secret-token'],
    // credentials: true
  }
});
//body parser and cors 

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


//First require functions from chatUsers.js
const { addUser, removeUser, getUser, getUsersInRoom }=require('./chatUsers');

const usersBooksRoute = require("./Routes/UsersBooks");
const usersBooksRouter = require("./Routes/UsersBooks");
app.use("/mybooks", usersBooksRouter)


const chat = require("./Routes/Chat");
app.use("/chat", chat); 

const client = require("./client");

// Run when a client connects

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
	   console.log('userjoin')
	   const { error, user } = addUser({id: socket.id, name, room});
  
	   if(error) return callback(error);

	   socket.join(user.room);
		
		socket.emit('message', { user: "admin", text: `${user.name}, welcome to the room ${user.room}! `});
		socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!`});
		
		io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room) }); 
    
    callback();
    // console.log(user.name)
 
		
  });

//   Now we will make events for user generated messages. 

  socket.on('sendMessage', ( message, callback) => {
      let user = getUser({id: socket.id});
      
  io.emit('message', {user: user.name, text: message});
  
  callback();
  
  });


 // This happens when a user leaves a chat

  socket.on('disconnected', () => {
  const user = removeUser({id: socket.id});
 
	
	if(user) {
		io.to(user.room).emit('message', {user: 'Admin', text: `${user.name} has left.`});
		io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })

 
});

//Build server
app.set("port", process.env.port);


//Start server
server.listen(app.get("PORT"), (server) => {
	console.info(`Server listen on port ${app.get("port")}`);
});