const Pool = require('pg').Pool;

//login used on local machine to access database
const pool = new Pool ({
    user: 'postgres',
    password: 'admin',
    host: 'localhost',
    port: 5432,
    database: 'jobapps'
});

module.exports = pool;