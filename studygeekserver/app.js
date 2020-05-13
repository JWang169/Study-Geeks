const express = require('express');
const app = express();
const cors = require('cors');
const configRoutes = require('./routes');
const session = require('express-session');
// New, used for chatting
const http = require('http').Server(app);
const io = require('socket.io')(http);
// End of New

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		name: 'JunzheSession',
		secret: "Expelliarmus",
        saveUninitialized: true,
        resave: false 
	})
);

// New, used for chatting
let userPairs = {};
let roomCounter = 1;

io.sockets.on('connection', function(socket) {
    socket.on('username', function({username, targetUser}) {
        socket.username = username;
        let roomName = 'room' + roomCounter.toString();
        roomCounter++;
        userPairs.roomName = [username, targetUser];
        socket.join(roomName);
        io.to(roomName).emit('is_online', '🔵 <i>' + socket.username + ' joined the chat..</i>');
    });

    socket.on('disconnect', function(username) {
        io.to('some room').emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })

    socket.on('chat_message', function(message) {
        io.to('some room').emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});
// End of New

configRoutes(app);

app.listen(3003, () => {
	console.log("We've now got a server!");
	console.log('Your routes will be running on http://localhost:3003');
});