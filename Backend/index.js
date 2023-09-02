const express = require('express');
const cors = require('cors');
const pool = require('./database.js')
const app = express();

//localhost:5000 for database access
//http://localhost:5173 for react app

app.use(cors());
app.use(express.json());

//Routes

//get all applications
app.get('/apps', async(req, res) => {
    try {
        console.log("GET");
        const getApps = await pool.query('SELECT * FROM application ORDER BY name');
        res.json(getApps.rows);
        console.log("Retrieved");
        } catch (error) {
        console.error(error.message);
    }
});