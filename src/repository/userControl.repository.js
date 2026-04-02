const pool = require("../db/database");

exports.deleteUser = async (id) => {
    const res = await pool.query(`DELETE FROM users WHERE id = $1`,
        [id]
    )

    return res.rowCount;
}

exports.getAllUsers = async () => {
    const res = await pool.query(`SELECT id, email, role FROM users`, []);

    return res.rows;
}