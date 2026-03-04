const db = require("../db/database");

exports.findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM users WHERE email = ?`,
            [email],
            (err, user) => {
                if (err) return reject(err);
                resolve(user);
            }
        )
    })
}

exports.registerUser = (email, hashedPassword) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO users (email, password) VALUES (? , ?)`,
            [email, hashedPassword],
            function (err) {
                if (err) return reject(err);
                resolve({
                    id: this.lastID,
                    email: email
                })
            }
        )
    })
}