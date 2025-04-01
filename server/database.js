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
    db.run(`CREATE TABLE IF NOT EXISTS problems (
        title TEXT PRIMARY KEY,
        description TEXT,
        example TEXT,
        testcase TEXT
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

function createProblem(title, description, example, testcase) {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO problems (title, description, example, testcase) VALUES (?, ?, ?, ?)`,
            [title, description, example, testcase],
            function (err) {
                if (err) return reject(err);
                const problemId = this.lastID; 

                resolve(problemId);
            }
        );
    });
}

function getProblem(title) {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT title, description, example, testcase FROM problems WHERE title = ?`, 
            [title], 
            (err, row) => {
                if (err) return reject(err);
                resolve(row);
            }
        );
    });
}


module.exports = { createUser, getUser, createProblem, getProblem };