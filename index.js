const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('spaceSimulationDB.db');

var express = require('express');
var socket = require('socket.io');
const { emit } = require('process');

var app = express();

app.use(express.static('public'));

var server = app.listen(3000, () => {
    console.log('server running');
})

var io = socket(server);
io.on('connection', connected);

function connected(socket) {
    console.log(socket.id + " has connected");
    
    // socket.on('login', (data) => { login(data); });
    //socket.on('get users', () => getUsers());
    //socket.on('clear users', () => clearUsers());
    socket.on('getDbUsernames', () => emitUsernames());
    socket.on('getDbPasswordHashes', () => emitPasswordHashes);
}


// try and insert new user into users table
function login(data) {
    
    // validate the given username is unique
    let usernames = getUsernames();
    for (username of usernames) {
        if (data.username === username) {
            console.log("Username '" + username + "' already exists");
            
        }
    }

    let sql = "INSERT INTO Users (Username, Password_Hash) VALUES ('" + data.username + "'," + data.passwordHash.length + ");";
    console.log("sql:", sql);

    db.all(sql, (err,rows) => {
        if (err) {
            console.log(err);
        } else {
            console.log("User '" + data.username + "' saved");
        }
    });
}

function getUsers() {
    let sql = "SELECT * FROM Users";
    console.log("sql:", sql);

    db.all(sql, (err,rows) => {
        if (err) {
            console.log(err);
        } else {
            return rows;
        }
    })
}

function emitUsernames() {
    let users = getUsers();
    let usernames = [];
    for (user of users) {
        usernames.push(user.Username);
    }
    emit('dbUsernames', usernames);
}
function emitPasswordHashes() {
    let users = getUsers();
    let passwordHashes = [];
    for (user of users) {
        passwordHashes.push(user.Passsword_Hash);
    }
    emit('dbPasswordHashes');
}

function getUsernames() {
    let sql = "SELECT Username FROM Users";
    console.log("sql:", sql);

    db.all(sql, (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            return rows;
        }
    })
}

function clearUsers() {
    let sql = "DELETE FROM Users WHERE ID > 0;";
    console.log("sql:", sql);

    db.all(sql, (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            console.log(getUsers());
        }
    })
}
