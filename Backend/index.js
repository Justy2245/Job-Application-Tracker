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
        const {title, company, location, date} = req.body;
        const newApp = await pool.query (
            'INSERT INTO application (title, company, location, date) VALUES($1, $2, $3, $4) RETURNING *', [title, company, location, date]
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
        const getApps = await pool.query('SELECT * FROM application ORDER BY title');
        res.json(getApps.rows);
        console.log(getApps.rows);
        } catch (error) {
        console.error(error.message);
    }
});

app.listen(5000);