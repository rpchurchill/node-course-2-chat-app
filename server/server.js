const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected.');
  
  socket.emit('newMessage', {
    from: 'Billy Bob',
    text: 'Hold my beer...',
    createdAt: 456
  });
  
  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
  });
  
  //socket.on('disconnect', () => {
  //  console.log('User disconnected.');
  //});

});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});

