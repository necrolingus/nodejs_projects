var socket = io(); //makes the request to the server. Keeps the connection open

socket.on('connect', function () { //using arrow functions might not work in all browsers
  console.log('connected to server');
});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});


socket.on('newMessage', function (message) { //email is that object we're emitting
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
  console.log('a new msg arrived', message);
});

// socket.emit('createMessage', {
//     from: 'frank',
//     text: 'hallo!'
// }, function (data) { //this third function is to get back acknowledgements
//   console.log('Got it! ', data);
// });



jQuery('#message-form').on('submit', function(e) {
  //e is event.
  e.preventDefault(); //here we prevent the Form default behaviour which is to refresh

  socket.emit('createMessage', {
      from: 'User',
      text: jQuery('[name=message]').val()
  }, function () {
    console.log('We got the message');
  });
});
