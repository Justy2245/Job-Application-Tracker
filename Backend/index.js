const express = require('express');
const cors = require('cors');
const pool = require('./database.js')
const app = express();

app.use(cors());
app.use(express.json());

//Routes

//get all applications
app.get('/apps', async(req, res) => {
    try {
        const getApps = await pool.query('SELECT * FROM application ORDER BY name');
        res.json(getApps.rows);
    } catch (error) {
        console.error(error.message);
    }
});