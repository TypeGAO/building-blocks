"use strict";
const pg = require('pg');
const dotenv = require('dotenv').config();
// For database connection
const { Pool } = pg;
const pool = new Pool({
    user: process.env.db_user,
    host: process.env.db_host,
    database: process.env.db_database,
    password: process.env.db_password,
    port: process.env.db_port,
    ssl: {
        rejectUnauthorized: false
    }
});
let query = (text, params) => pool.query(text, params);
module.exports = query;
