const path = require('path');
const http = require('http'); //in order to use socketIO we MUST use http, even though Express already uses http
const express = require('express');
const socketIO = require('socket.io');
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

  socket.on('createMessage', (message) => { //the second argument is the data you want to emit. We'll emit an object
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    }); //io emits to EVERYONE. Socket emits to that user only
    console.log('new msg: ',message);
  });


  socket.on('disconnect', ()=>{
    console.log('A user disconnected');
  });

});

//so instead of calling app.listen, we call server.listen
server.listen(3000, () => { //app.listen actually calls http.createServer
  console.log('Server running on port 3000');
});
