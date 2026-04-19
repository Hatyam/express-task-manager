import pool from "../db/database";
import redis from "../db/redisConnect";
import { UpdateNoteParams } from "../types/notes.types";

export const redisGetOneNote = async (id: number) => {
    const redisRes = await redis.get(`note:${id.toString()}`);
    return JSON.parse(redisRes);
}

export const getOneNote = async (id: number, user_id: number) => {
    const res = await pool.query(
        `SELECT * FROM notes WHERE id = $1 AND user_id = $2`,
        [id, user_id]
    );

    await redis.set(`note:${id}`, JSON.stringify(res.rows[0]), "EX", 10);
    return res.rows[0];
};

export const getAllNotes = async (user_id: number, page: number, limit: number, q: string | undefined) => {
    let sqlParametrs: (number | string)[] = [user_id];
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

export const createNote = async (title: string, content: string, user_id: number) => {
    const res = await pool.query(
        `INSERT INTO notes (title, content, user_id) VALUES ($1, $2, $3) RETURNING *`,
        [title, content, user_id]
    );
    return { id: res.rows[0].id, title: res.rows[0].title, content: res.rows[0].content }
};

export const updateNote = async ({id, title, content, user_id}: UpdateNoteParams) => {
    const res = await pool.query(
        `UPDATE notes SET title = $1, content = $2 WHERE id = $3 AND user_id = $4 RETURNING *`,
        [title, content, id, user_id]
    );
    return { id: res.rows[0].id, title: res.rows[0].title, content: res.rows[0].content }
};

export const deleteNote = async (id: number, user_id: number) => {
    const res = await pool.query(
        `DELETE FROM notes WHERE id = $1 AND user_id = $2`,
        [id, user_id]
    );
    return res.rowCount;
};

export const getAllUsersNotes = async () => {
    const res = await pool.query(
        `SELECT * FROM notes`, []
    );
    return res.rows;
}
