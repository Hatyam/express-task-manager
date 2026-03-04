const db = require("../db/database");

exports.findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT * FROM users WHERE email = ? `,
            [email],
            (err, user) => {
                if (err) return reject(err);
                resolve(user);
            }
        )
    })
}