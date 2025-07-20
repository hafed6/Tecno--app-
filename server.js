const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const DATA_FILE = './pieces.json';

// جلب جميع القطع
app.get('/api/pieces', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Erreur serveur');
    res.json(JSON.parse(data || '[]'));
  });
});

// إضافة قطعة جديدة
app.post('/api/pieces', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    const pieces = data ? JSON.parse(data) : [];
    pieces.push(req.body);
    fs.writeFile(DATA_FILE, JSON.stringify(pieces, null, 2), (err) => {
      if (err) return res.status(500).send('Erreur sauvegarde');
      res.send({ message: 'تمت الإضافة بنجاح', data: req.body });
    });
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
