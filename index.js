// import libraries required to connect users to server and manage database
const sqlite3 = require('sqlite3');
var express = require('express');
var socket = require('socket.io');
const { emit } = require('process');

const db = new sqlite3.Database('spaceSimulationDB.db');

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
    socket.on('signupUser', (data) => { signupUser(data) });
    socket.on('loginUser', (data) => { loginUser(data) });
    // log usernames and/or password hashes to serverside terminal
    socket.on('logUsernames', () => { logUsernames() });
    socket.on('logPasswordHashes', () => { logPasswordHashes() });
    socket.on('logUsers', () => {logUsers()});

    socket.on('logdata', (data) => {
        console.log(data);
    })
    socket.on('insertSimulation', (data) => { insertSimulation(data) });
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

function logUsers() {
    let sql = "SELECT * FROM Users;";
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
    let users;

    return new Promise((resolve) => {
        db.all(sql, (err,rows) => {
            if (err) {
                console.log(err);
            } else {
                resolve(rows);
            }
        })
    })
}

function insertSimulation(data) { // UserID, SimulationJSON, IsPublic
    let userID = data.userID;
    let simulationJSON = data.simulationJSON;
    let isPublic = data.isPublic;

    let sql = "INSERT INTO Simulations (UserID, Simulation, IsPublic) VALUES ('" + userID + "','"+simulationJSON+"','"+isPublic+"');";

    db.all(sql, (err) => {
        if (err) {
            console.log(err);
            io.emit('alert', 'error saving simulation');
        } else {
            io.emit('alert', 'simulation saved successfully');
        }
    })
}

// method to insert new user into spaceSimulationDB
// data = { username: string, passwordHash: string }
async function signupUser(data) {
    let username = data.username;
    let passwordHash = data.passwordHash;

    let users = await getUsers();

    let usernameExists = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].Username === username) {
            usernameExists = true;
        }
    }

    if (usernameExists) {
        io.emit('alert', 'Username already exists, try a logging in or a different username');
        return;
    }

    sql = "INSERT INTO Users (Username, PasswordHash) VALUES ('"+username+"','"+passwordHash+"');";

    // execut sql and log any sql errors
    db.all(sql, (err) => {
        if (err) {
            console.log(err);
            io.emit('signupUser err:\n', err);
        } else {
            io.emit('alert', "User '" + username + "' created");
        }
    })
}

async function loginUser(data) {
    let username = data.username;
    let passwordHash = data.passwordHash;

    let users = await getUsers();
    
    let usernameExists = false;
    let userPasswordHash = "";
    for (let i = 0; i < users.length; i++) {
        //console.log(users[i]);
        if (users[i].Username === username) {
            usernameExists = true;
            userPasswordHash = users[i].PasswordHash;
        }
    }

    if (!usernameExists) {
        io.emit("alert", "Username does not exist, try signing up to create new user");
        return;
    } 

    if (passwordHash !== userPasswordHash) {
        io.emit("alert", "Password does not match user's password, try again");
        return;
    }

    
}
