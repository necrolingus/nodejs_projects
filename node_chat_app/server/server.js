const path = require('path');
const http = require('http'); //in order to use socketIO we MUST use http, even though Express already uses http
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message.js')
//because generateMessage returns an object, we can put the const in {} and just use it wherever without having
//to give the {}
//console.log(__dirname + '/../public'); //old way
const publicPath = (path.join(__dirname, '..', 'public')); //new way. Same as Python' join

var app = express();
var server = http.createServer(app); //the below can also work
// var server = http.createServer((req, res) => {
//
// });
var io = socketIO(server); //this is now our socket server!!! This will listen for and emit events
//and you can now get to socket.io like this http://localhost:3000/socket.io/socket.io.js

app.use(express.static(publicPath));

io.on('connection', (socket) => { //here, socket refers to the individual socket connection
  console.log('New user connected');

  //only the user that sent the message will get this message
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'));

  //everyone else BUT the user that joined gets the message
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user joined'));


  socket.on('createMessage', (message) => {
    //EVERYONE gets this message
    console.log('new msg: ',message);
    io.emit('newMessage', generateMessage(message.from, message.text));

    //io emits to EVERYONE. Socket emits to that user only
    //broadcast emits to everyone except the person who sent the message
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });


  });


  socket.on('disconnect', ()=>{
    console.log('A user disconnected');
  });

});

//so instead of calling app.listen, we call server.listen
server.listen(3000, () => { //app.listen actually calls http.createServer
  console.log('Server running on port 3000');
});
