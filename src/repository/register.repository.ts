import pool from "../db/database";
import { User, RegisteredUser } from "../types/user.types";

export const findByEmail = async (email: string): Promise<User | null> => {
    const res = await pool.query(`SELECT * FROM users WHERE email = $1`,
        [email]
    );
    return res.rows[0];
}

export const registerUser = async (email: string, hashedPassword: string): Promise<RegisteredUser> => {
    const res = await pool.query(`INSERT INTO users (email, password) VALUES ($1 , $2) RETURNING id, email`,
        [email, hashedPassword],
    )

    const {returnedId, returnedEmail} = res.rows[0];

    return { id: returnedId, email: returnedEmail };
}