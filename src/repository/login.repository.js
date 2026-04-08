const pool = require("../db/database");

exports.findByEmail = async (email) => {
    const res = await pool.query(
        `SELECT * FROM users WHERE email = $1 AND deleted = false `,
        [email],
    );
    return res.rows[0]
}

exports.createRefreshToken = async (user_id, refreshToken) => {
    await pool.query(
        `INSERT INTO refresh_tokens (user_id, token_hash, created_at, expires_at) 
        VALUES ($1, $2, NOW(), NOW() + INTERVAL '7 days')`,
        [user_id, refreshToken]
    );
}