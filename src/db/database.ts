import { Pool } from "pg";

const pool = new Pool({
    user: "bogdandenisev",
    host: "localhost",
    database: "task_manager",
    port: 5432,
});

export default pool;
