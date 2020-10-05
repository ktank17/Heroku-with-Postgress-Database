var express = require('express');
var app = express.Router();

/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//PUT INSIDE YOUR index.js file (or whereever)
// Assumes DATABASE_URL in the heroku configs points to your PostGres database
// setups the url /db to connect to database and does a query from a table test_table

const { Pool } = require('pg');




const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});




app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM test_table');
    const results = { 'results': (result) ? result.rows : null};
    res.render('pages/db', results );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

module.exports = app;
