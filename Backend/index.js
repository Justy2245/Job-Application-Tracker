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
        res.json('Application Added');
    } catch (error) {
        console.log(error.message);
    }
});

//get all applications
app.get('/apps', async(req, res) => {
    try {
        console.log("GET");
        const getApps = await pool.query('SELECT jobapp_id, title, company, location, status, extrainfo, date_applied FROM application ORDER BY title');
        res.json(getApps.rows);
        console.log(getApps.rows);
        } catch (error) {
        console.error(error.message);
    }
});

//delete application
app.delete('/apps/:jobapp_id', async(req, res) => {
    try {
        console.log('DELETE');
        const { jobapp_id } = req.params;
        console.log(jobapp_id);
        const deleteApps = await pool.query('DELETE FROM application WHERE jobapp_id = $1', [jobapp_id]);
        res.json('Deleted Application')
    } catch (error) {
        console.error(error.message);
    }
});

app.listen(5000);