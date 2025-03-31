const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        role TEXT DEFAULT 'user'
    )`);
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        role TEXT DEFAULT 'problem'
    )`);
});

function createUser(username, password, role = 'user') {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO users (username, password, role) VALUES (?, ?, ?)`,
            [username, password, role],
            function (err) {
                if (err) return reject(err);
                resolve(this.lastID);
            }
        );
    });
};

function getUser(username) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
            if (err) return reject(err);
            resolve(row);
        });
    });
};

function createProblem(title, description, role = 'user') {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO users (username, password, role) VALUES (?, ?, ?)`,
            [title, description, role],
            function (err) {
                if (err) return reject(err);
                resolve(this.last);
            }
        );
    });
};

module.exports = { createUser, getUser };