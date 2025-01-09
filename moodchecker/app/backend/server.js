const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let moods = []; // Penyimpanan sementara (gunakan DB untuk versi produksi)

// Endpoint untuk mengambil data mood
app.get('/api/moods', (req, res) => {
  res.json(moods);
});

// Endpoint untuk menambahkan mood baru
app.post('/api/moods', (req, res) => {
  const { mood, note, date } = req.body;
  if (!mood || !date) {
    return res.status(400).json({ error: 'Mood and date are required.' });
  }
  moods.push({ mood, note, date });
  res.status(201).json({ message: 'Mood added successfully.' });
});

// Sajikan frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Jalankan server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
