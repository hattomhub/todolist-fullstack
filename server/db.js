const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "postgres2020",
    host: "localhost",
    port: 5432,
    database: "fullstacktodo"
});

module.exports = pool;