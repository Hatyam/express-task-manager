import pool from "../db/database";
import { User } from "../types/user.types";

export const findByEmail = async (email: string): Promise<User | null> => {
    const res = await pool.query(
        `SELECT * FROM users WHERE email = $1 AND deleted = false `,
        [email],
    );
    return res.rows[0]
}

export const createRefreshToken = async (user_id: number, refreshToken: string) => {
    await pool.query(
        `INSERT INTO refresh_tokens (user_id, token_hash, created_at, expires_at) 
        VALUES ($1, $2, NOW(), NOW() + INTERVAL '7 days')`,
        [user_id, refreshToken]
    );
}