const path = require('path');
const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/notes', async (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
})

app.get('/api/notes', async (req, res) => res.json(JSON.parse(fs.readFileSync('./db/notes.json'))));

app.post('/api/notes', async (req, res) => {
  if (req.body && req.body.title && req.body.text) {
    response = {
      status: 'success',
      data: req.body,
    };
    res.status(201).json(response);
    let noteData = JSON.parse(fs.readFileSync('./db/notes.json'));
    noteData.push({
      title: req.body.title,
      text: req.body.text,
      id: uuid()
    })
    fs.writeFileSync('./db/notes.json', JSON.stringify(noteData));
  } else {
    res.status(400);
  }
})

app.delete('/api/notes/:id', async (req, res) => {
  res.status(200);
  let noteData = JSON.parse(fs.readFileSync('./db/notes.json'));
  for (let i in noteData) {
    if (noteData[i].id == req.params.id) {
      noteData.splice(i, 1);
      break;
    }
  }
  
  fs.writeFileSync('./db/notes.json', JSON.stringify(noteData));
})

app.get('*', async (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.listen(PORT, () => console.log(`Server is online at localhost:${PORT}`));

const uuid = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};