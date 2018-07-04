var socket = io();

function scrollBottom(){
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');

  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function(){
  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function(err){
    if(err){
      alert(err);
      window.location.href = '/';
    }else{
      console.log('No error');
    }
  });
});

socket.on('disconnect', function(){
  console.log('Disconnected from Server');
});

socket.on('newMessage', function(msg){
  var formattedTime = moment(msg.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: msg.text,
    from: msg.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollBottom();
});

socket.on('newLocationMessage', function(msg){
  var formattedTime = moment(msg.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    url: msg.url,
    from: msg.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollBottom();
});


jQuery('#messageForm').on('submit', function(e){
  e.preventDefault();

  var messageTextBox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function(){
    messageTextBox.val('');
  });
});

var locationBtn = jQuery('#sendLocation');
locationBtn.on('click', function(){
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported in your Browser');
  }

  locationBtn.attr('disabled', 'disabled').text('Sending Location...');

  navigator.geolocation.getCurrentPosition(function(position){
    locationBtn.removeAttr('disabled').text('Share Location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function(){
    locationBtn.removeAttr('disabled').text('Share Location');
    alert('Unable to fetch Location!');
  });
});
