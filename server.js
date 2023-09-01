const express = require('express');
const bodyParser = require('body-parser');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const app = express();
const port = 3000;

const adapter = new FileSync('db.json'); // JSON file as a database
const db = lowdb(adapter);

// Initialize database with default values
db.defaults({ highScores: [] }).write();

app.use(bodyParser.json());

// Save a high score
app.post('/api/high-scores', (req, res) => {
  const { name, score } = req.body;
  const highScore = { name, score };
  db.get('highScores').push(highScore).write();
  res.sendStatus(200);
});

// Get the high scores
app.get('/api/high-scores', (req, res) => {
  const highScores = db.get('highScores').value();
  res.json(highScores);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
