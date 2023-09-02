const express = require('express');
const cors = require('cors');
const pool = require('./database.js')
const app = express();

//localhost:5000 for database access
//http://localhost:5173 for react app

app.use(cors());
app.use(express.json());

//Routes

//add new application
app.post('/apps', async (req, res) => {
    try {
        console.log("POST");
        console.log(req.body);
        const {title, company, location, date_applied} = req.body;
        const status = "Applied";
        const newApp = await pool.query (
            'INSERT INTO application (title, company, location, date_applied, status) VALUES($1, $2, $3, $4, $5) RETURNING *', [title, company, location, date_applied, status]
        )
        res.json(newApp.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});

//get all applications
app.get('/apps', async(req, res) => {
    try {
        console.log("GET");
        const getApps = await pool.query('SELECT title, company, location, status, extrainfo, date_applied FROM application ORDER BY title');
        res.json(getApps.rows);
        console.log(getApps.rows);
        } catch (error) {
        console.error(error.message);
    }
});

app.listen(5000);