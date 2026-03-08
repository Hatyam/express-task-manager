const pool = require("../db/database");

exports.findByEmail = async (email) => {
    const res = await pool.query(`SELECT * FROM users WHERE email = $1`,
        [email]
    );
    return res.rows[0];
}

exports.registerUser = async (email, hashedPassword) => {
    const res = await pool.query(`INSERT INTO users (email, password) VALUES ($1 , $2) RETURNING *`,
        [email, hashedPassword],
    );
    return { id: res.rows[0].id, email: res.rows[0].email}
}