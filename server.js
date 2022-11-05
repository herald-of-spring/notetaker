const path = require('path');
const express = require('express');
const noteData = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/notes', async (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
})

app.get('*', async (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.get('/api/notes', async (req, res) => {
  res.json(noteData);
})

app.post('/api/notes', async (req, res) => {
  // req.body
})

app.listen(PORT, () => console.log(`Server is online at localhost:${PORT}`));
