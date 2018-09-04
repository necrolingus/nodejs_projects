var socket = io(); //makes the request to the server. Keeps the connection open

socket.on('connect', function () { //using arrow functions might not work in all browsers
  console.log('connected to server');
});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});


socket.on('newMessage', function (message) { //email is that object we're emitting
  console.log('a new msg arrived', message);
});
