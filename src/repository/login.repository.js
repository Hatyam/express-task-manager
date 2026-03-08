const pool = require("../db/database");

exports.findByEmail = async (email) => {
    const res = await pool.query(
        `SELECT * FROM users WHERE email = $1 `,
        [email],
    );
    return res.rows[0]
}