const pool = require("../db/database");

exports.getOneNote = async (id, user_id) => {
    const res = await pool.query(
        `SELECT * FROM notes WHERE id = $1 AND user_id = $2`,
        [id, user_id]
    );
    return res.rows[0];
};

exports.getAllNotes = async (user_id, page, limit, q) => {
    let sqlParametrs = [user_id];
    let query = `SELECT * FROM notes WHERE user_id = $${sqlParametrs.length}`;
    if (q && q.trim() !== "") {
        sqlParametrs.push(`%${q}%`);
        query += ` AND (title ILIKE $${sqlParametrs.length} OR content ILIKE $${sqlParametrs.length})`;
    }
    sqlParametrs.push(limit);
    query += ` ORDER BY created_at DESC LIMIT $${sqlParametrs.length}`; 
    
    sqlParametrs.push((page - 1) * limit);
    query += ` OFFSET $${sqlParametrs.length}`; 

    const res = await pool.query(query, sqlParametrs);
    return res.rows;
};

exports.createNote = async (title, content, user_id) => {
    const res = await pool.query(
        `INSERT INTO notes (title, content, user_id) VALUES ($1, $2, $3) RETURNING *`,
        [title, content, user_id]
    );
    return { id: res.rows[0].id, title: res.rows[0].title, content: res.rows[0].content }
};

exports.updateNote = async (id, title, content, user_id) => {
    const res = await pool.query(
        `UPDATE notes SET title = $1, content = $2 WHERE id = $3 AND user_id = $4 RETURNING *`,
        [title, content, id, user_id]
    );
    return { id: res.rows[0].id, title: res.rows[0].title, content: res.rows[0].content }
};

exports.deleteNote = async (id, user_id) => {
    const res = await pool.query(
        `DELETE FROM notes WHERE id = $1 AND user_id = $2`,
        [id, user_id]
    );
    return res.rowCount;
};
