const pool = require("../db/database");

exports.checkRefresh = async (hashedRefreshToken) => {
    const res = await pool.query(`SELECT * FROM refresh_tokens WHERE token_hash = $1 AND 
        revoked = false AND expires_at > NOW()`,
    [hashedRefreshToken]);
    return res.rows;
};

exports.findEmailById = async (id) => {
    const res = await pool.query(`SELECT * FROM users WHERE id = $1`,
        [id],
    )
    return res.rows[0].email;
}

exports.updateRefreshToken = async (
    lastHashedRefreshToken,
    newHashedRefreshToken,
    user_id
) => {
    const newTokenId = await pool.query(
        `INSERT INTO refresh_tokens (user_id, token_hash, expires_at) 
        VALUES($1, $2, NOW() + INTERVAL '7days') RETURNING *`,
        [user_id, newHashedRefreshToken]
    );

    await pool.query(
        `UPDATE refresh_tokens SET revoked = true, replaced_by = $1 WHERE token_hash = $2`,
        [newTokenId.rows[0].id, lastHashedRefreshToken]
    );
    
    return;
};
