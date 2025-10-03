// import libraries required to connect users to server and manage database
const sqlite3 = require('sqlite3');
var express = require('express');
var socket = require('socket.io');
const { emit } = require('process');

const db = new sqlite3.Database('spaceSimulationDB.db');

let b = 1;

// send connected users the public folder containing script.js
var app = express();
app.use(express.static('public'));

var server = app.listen(3000, () => {
    console.log('server running');
})

// setup input/output connection with user 
var io = socket(server);
io.on('connection', connected);

// log serverside user socket id
function connected(socket) {
    console.log(socket.id + " has connected");

    // enable client to call insertNewUser() on server
    socket.on('insertNewUser', (data) => { insertNewUser(data) });
    socket.on('logUsernames', () => { logUsernames() });
    socket.on('logPasswordHashes', () => { logPasswordHashes() });
    emitUsers();
}

// log db usernames to serverside console
function logUsernames() {
    let sql = "SELECT Username FROM Users;";
    console.log("sql:", sql);

    db.all(sql, (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            console.log(rows);
        }
    })
}

// log db passwordhashes to serverside console
function logPasswordHashes() {
    let sql = "SELECT PasswordHash FROM Users;";
    console.log('sql:', sql);

    db.all(sql, (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            console.log(rows);
        }
    })
}

function getUsers() {
    let sql = "SELECT * FROM Users;";
    console.log("sql:", sql);

    db.all(sql, (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            return rows;
        }
    })
}

// method to insert new user into spaceSimulationDB
// data = { username: string, passwordHash: string }
function insertNewUser(data) {

    let sql = "INSERT INTO Users (Username, PasswordHash) VALUES ('"+data.username+"','"+data.passwordHash+"');";
    // log sql to be executed
    console.log('sql:', sql);

    // execut sql and log any sql errors
    db.all(sql, (err) => {
        if (err) {
            console.log(err);
        } 
    })
}

function emitUsers() {
    let users = getUsers();
    socket.emit('updateUsers', users);
}