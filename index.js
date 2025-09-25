const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('UsersDB.db');

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
    
    socket.on('insert new user', (data) => insertNewUser);
    socket.on('get users', () => getUsers());
}

function insertNewUser(data) {
    let sql = "INSERT INTO Users (Name, Password_Hash) VALUES ('" + data.username + "','" + data.passwordHash + "');";
    db.all(sql, function(err, rows) {
        if (err) {
            console.log(err);
        } else {
            console.log("User '" + data.username + "' saved");
        }
    });
}

function getUsers() {
    let sql = "SELECT * FROM Users";
    db.all(sql, function(err,rows) {
        if (err) {
            console.log(err);
        } else {
            console.log(rows);
        }
    })
}