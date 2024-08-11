const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port : process.env.DBPORT
  });

app.get('/banner', (req, res) => {
  db.query('SELECT * FROM banners WHERE id = 1', (err, result) => {
    if (err) return res.send(err);
    res.send(result[0]);
  });
});

app.post('/banner', (req, res) => {
  const { description, timer, link, is_visible } = req.body;
  db.query(
    'UPDATE banners SET description = ?, timer = ?, link = ?, is_visible = ? WHERE id = 1',
    [description, timer, link, is_visible],
    (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    }
  );
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
