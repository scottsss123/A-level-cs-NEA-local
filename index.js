const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('usersDB.db');

var express = require('express');
var socket = require('socket.io');

var app = express();

app.use(express.static('public'));

var server = app.listen(3000, () => {
    console.log('server running');
})

var io = socket(server);
io.on('connection', connected);

function connected(socket) {
    console.log(socket.id + " has connected");
    
    
}