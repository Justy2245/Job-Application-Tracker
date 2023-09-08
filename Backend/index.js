const express = require('express');
const cors = require('cors');
const pool = require('./database.js')
const app = express();

//localhost:5000 for database access
//http://localhost:5173 for react app

//cors to let one domain access resources in a seperate domain
app.use(cors());
//express used for routing
app.use(express.json());

//Routes

//add new application
app.post('/apps', async (req, res) => {
    try {
        console.log("POST");
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

//get all applications sorted by alphabetically by title
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

//delete application based on jobapp_id
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

//update application based on jobapp_id
app.put('/apps', async(req, res) => {
    try {
        console.log('PUT');
         console.log(req.body);
        const { jobapp_id, title, company, location, status, extrainfo, date_applied } = req.body;
        const editApps = await pool.query(
            'UPDATE application SET title = $1, company = $2, location = $3, status = $4, extrainfo = $5, date_applied = $6 WHERE jobapp_id = $7',
            [title, company, location, status, extrainfo, date_applied, jobapp_id]
            )
        res.json('Edited Application');
    } catch (error) {
        console.error(error.message);
    }
});

//update text box
app.put('/apps:jobapp_id', async(req, res) => {
    try {
        console.log('PUT text box')
        const { jobapp_id } = req.params;
    } catch (error) {
        console.error(error.message);
    }
});

//listen on port 5000
app.listen(5000);