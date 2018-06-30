var socket = io();

socket.on('connect', function(){
  console.log('Connected to server');

  socket.emit('createMessage', {
    to: 'b',
    text: 'hey'
  });
});

socket.on('disconnect', function(){
  console.log('Disconnected from Server');
});

socket.on('newMessage', function(msg){
  console.log('Got a message', msg);
});
