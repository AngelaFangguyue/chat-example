var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

//app.get('/', (req, res) => {
//  res.send('<h1>Hello world</h1>');
//});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


//io.on('connection', (socket) => {
//  console.log('a user connected');
//});

//io.on('connection', (socket) => {
//  console.log('a user connected');
//  socket.on('disconnect', () => {
//    console.log('user disconnected');
//  });
//});

io.on('connection', (socket) => {
console.log('index.js里面chat message1》socket onmessage: ');
  socket.on('chat message', (msg) => {
    console.log('index.js里面chat message2》socket onmessage: ' + msg);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});