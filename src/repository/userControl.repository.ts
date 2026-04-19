import pool from "../db/database";

export const deleteUser = async (id: number) => {
    const res = await pool.query(
        `UPDATE users SET deleted = true, token_version = token_version + 1 WHERE id = $1`,
        [id]
    );

    await pool.query(`UPDATE notes SET deleted = true WHERE user_id = $1`,
        [id]
    )

    await pool.query(`UPDATE refresh_tokens SET revoked = true WHERE user_id = $1`,
        [id]
    )

    return res.rowCount;
}

export const getAllUsers = async () => {
    const res = await pool.query(`SELECT id, email, role, deleted FROM users`, []);

    return res.rows;
}

export const recoverUser = async (id: number) => {
    const res = await pool.query(`UPDATE users SET deleted = false WHERE id = $1`,
        [id]
    );

    await pool.query(`UPDATE notes SET deleted = false WHERE user_id = $1`,
        [id]
    );

    return res.rowCount;
}