const express = require('express');
const http = require('http');
const dotenv = require('dotenv').config();
const path = require('path');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');


const app = express();
const server = http.createServer(app);
const io = socketio(server);

const bot = 'ChatCord Bot';

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//run when the client connects
io.on('connection', (socket) => {
  console.log('New WS Connection...');


  //listen for joinRoom
    socket.on('joinRoom', ({  username, room, userTimeZone }) => {
        socket.join(room);
        

        //welcome current user
        socket.emit('message', formatMessage(bot, 'Welcome to ChatCord!', userTimeZone));
     
        //broadcast when a user connects
        socket.broadcast.to(room).emit('message', formatMessage(bot, `${username} has joined the chat`, userTimeZone));

        //broadcast when a user disconnects
        socket.on('disconnect', () => {
            io.emit('message', formatMessage(bot, `${username} has left the chat`, userTimeZone));
        });

        //listen for chatMessage
        socket.on('chatMessage', (msg) => {
            io.to(room).emit('message', formatMessage( username, msg, userTimeZone));
        });

        
    });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
