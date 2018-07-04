const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {isValidString} = require('./utils/validation');
const {generateMessage, generateLocationMessage} = require('./utils/message');

const app = express();
var server = http.createServer(app);
var io = socketIO(server);

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');



  socket.on('join', (params, callback) => {
    if(!isValidString(params.name) || !isValidString(params.roomname)){
      callback('Name and Room Name are invalid!');
    }
    socket.join(params.roomname);

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));
    socket.broadcast.to(params.roomname).emit('newMessage', generateMessage('Admin', `${params.name} has joined!`));
    callback();
  });

  socket.on('createMessage', (msg, callback) => {
    console.log('create message', msg);

    io.emit('newMessage', generateMessage(msg.from, msg.text));
    callback('');
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('Client Disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
