// import libraries required to connect users to server and manage database
const sqlite3 = require('sqlite3');
var express = require('express');
var socket = require('socket.io');
const { emit } = require('process');
const { resolve } = require('path');

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
    socket.on('saveSettings', (data) => { saveSettings(data) });
    socket.on('loadSettings', (data) => { loadSettings(data) });
    socket.on('saveSimulation', (data) => { saveSimulation(data) });
    socket.on('saveAsSimulation', (data) => { saveAsSimulation(data) });
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
            io.emit('alert', 'Signup error: ' + err);
        } else {
            io.emit('alert', "User '" + username + "' created");
            io.emit('setUser', {username: username, userID: getLastUserID()});
        }
    })
}

async function loginUser(data) {
    let username = data.username;
    let passwordHash = data.passwordHash;

    let users = await getUsers();
    let userID;
    
    let usernameExists = false;
    let userPasswordHash = "";
    for (let i = 0; i < users.length; i++) {
        //console.log(users[i]);
        if (users[i].Username === username) {
            usernameExists = true;
            userID = users[i].UserID;
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

    io.emit("alert", "Log in successful\nCurrent user: " + username);
    io.emit("setUser", { userID : userID, username: username });
}

function getSettings() {
    let sql = "SELECT * FROM Settings;";

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

async function saveSettings(data) { // data = { userID: int, volume: 0/1, lengthUnit: str, massUnit: str, speedUnit: str }
    let userID = data.userID;
    let volume = data.volume;
    let lengthUnit = data.lengthUnit;
    let massUnit = data.massUnit;
    let speedUnit = data.speedUnit;

    if (!volume) {
        volume = 1;
    }

    if (userID <= 0) {
        io.emit('alert', "must be logged in to save settings, visit profile menu");
        return;
    }

    let settingsExists = false;

    let settings = await getSettings();
    for (let i = 0; i < settings.length; i++) {
        if (settings[i].UserID === userID) {
            settingsExists = true;
        }
    }

    if (!settingsExists) {

        let sql = "INSERT INTO Settings (UserID, Volume, LengthUnit, MassUnit, SpeedUnit) VALUES (" + userID + ", " + volume + ", '" + lengthUnit + "', '" + massUnit+"', '" + speedUnit + "');";
        // execut sql and log any sql errors
        db.all(sql, (err) => {
            if (err) {
                console.log(err);
                io.emit('alert', 'settings save error: ' + err);
            } else {
                io.emit('alert', " settings saved for the first time");
            }
        });
        
        return;
    }

    let sql = "UPDATE Settings SET Volume = " + volume + ", LengthUnit = '" + lengthUnit + "', MassUnit = '" + massUnit + "', SpeedUnit = '" + speedUnit + "' WHERE UserID = " + userID + ";";
    console.log(sql);
    // execut sql and log any sql errors
    db.all(sql, (err) => {
        if (err) {
            console.log(err);
            io.emit('alert', 'settings save error: ' + err);
        } else {
            io.emit('alert', " settings saved");
        }
    });
}

async function loadSettings(data) { // data = {userID: int}
    let settings = await getSettings();
    for (let i = 0; i < settings.length; i++) {
        if (settings[i].UserID === data.userID) {
            io.emit('loadSettings', { volume: settings[i].Volume, lengthUnit: settings[i].LengthUnit, massUnit: settings[i].MassUnit, speedUnit: settings[i].SpeedUnit });
            io.emit('alert', "settings loaded successfully");
            return;
        }
    }
    io.emit('alert', 'settings failed to load, try logging in');
}

function getSimulationMetaDatas() {
    let sql = "SELECT SimulationID, IsPublic, Name, Description FROM Simulations;";

    let simulationMetaDatas = [];

    return new Promise((resolve) => {
        db.all(sql, (err,rows) => {
            if (err) {
                console.log(err);
            } else {
                for (let row of rows) {
                    simulationMetaDatas.push(row);
                }
            }
        })
	console.log(simulationMetaDatas); ///////////////////////////////////////////////////////////////////////////////////
        resolve(simulationMetaDatas);
    })
}

async function saveSimulation(data) {
    // id of simulation & attached user to be saved, must exist 
    let simulationID = data.simulationID;
    let userID = data.userID;
    let simulationString = data.simulationString;
    // isPublic, name, description, may be empty strings, if so these remain unchanged in table
    let isPublic = data.isPublic;
    let name = data.name;
    let description = data.description;

    // get simulation to be saved's existing value of IsPublic, Name and Description
    let simulationMetaDatas = await getSimulationMetaDatas();
    let currentSimulationMetaData;
    for (let i = 0; i < simulationMetaDatas.length; i++) {
        if (simulationMetaDatas.SimulationID === simulationID) {
            currentSimulationMetaData = simulationMetaDatas[i];
        }
    }
    if (!currentSimulationMetaData) {
        console.log('uh oh :('); // fix this before documenting
    }

    if (!isPublic) {
        isPublic = currentSimulationMetaData.IsPublic
    } else if (isPublic !== 'y') {
        isPublic = 0;
    } else {
        isPublic = 1;
    }
    if (!name) {
        name = currentSimulationMetaData.Name;
    }
    if (!description) {
        description = currentSimulationMetaData.description;
    }

    // save simulation

    let sql = "UPDATE Simulations SET UserID = " + userID + ", Simulation = '" + simulationString + "', IsPublic = " + isPublic + ", Name = '" + name + "', Description = '" + description + "' WHERE SimulationID = " + simulationID + ";";
    console.log(sql);
    db.all(sql, (err) => {
        if (err) {
            console.log(err);
        } else {
            io.emit('alert', 'simulation saved successfully');
        }
    })
}

function getLastSimulationId() {
    let sql = "SELECT SimulationID FROM Simulations;";

    return new Promise((resolve) => {
        db.all(sql, (err,rows) => {
            if (err) {
                console.log(err);
            } else {
                resolve(rows[rows.length - 1].SimulationID);
            }
        })
    })
}

function getLastUserID() {
    let sql = "SELECT SimulationID FROM Users;";

    return new Promise((resolve) => {
        db.all(sql, (err,rows) => {
            if (err) {
                console.log(err);
            } else {
                resolve(rows[rows.length - 1].UserID);
            }
        })
    })
}

async function saveAsSimulation(data) { // data = { userID: int , simulationString: str, isPublic: int (1/0), name: str, description: str }
    
    let userID = data.userID;
    let simulationString = data.simulationString;
    let isPublic = data.isPublic;
    let name = data.name;
    let description = data.description;

    let sql = "INSERT INTO Simulations (UserID, Simulation, IsPublic, Name, Description) VALUES (" + userID + ", '" + simulationString + "', " + isPublic + ", '" + name+"', '" + description + "');";

    db.all(sql, (err) => {
        if (err) {
            console.log(err);
            io.emit('alert', 'simulation save as error: ' + err);
        } else {
            io.emit('alert', "simulation successfullty saved\nname: " + name);
        }
    });

    let lastSimulationID = await getLastSimulationId();
    io.emit('setCurrentSimulationID', lastSimulationID);
    io.emit('log', lastSimulationID);
}
