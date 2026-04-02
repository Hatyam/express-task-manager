"use strict";
const { Pool } = require('pg');
const pool = new Pool({
    user: 'bogdandenisev',
    host: 'localhost',
    database: 'task_manager',
    port: 5432
});
module.exports = pool;
