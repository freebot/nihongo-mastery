const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Conectar a la base de datos SQLite
const db = new sqlite3.Database('./db/database.sqlite');

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas API para obtener contenido
app.get('/api/kanji', (req, res) => {
  db.get("SELECT * FROM kanji ORDER BY RANDOM() LIMIT 1", (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

app.get('/api/vocabulary', (req, res) => {
  db.all("SELECT * FROM vocabulary WHERE level = ?", ['N4'], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/grammar', (req, res) => {
  db.get("SELECT * FROM grammar ORDER BY RANDOM() LIMIT 1", (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

app.get('/api/listening', (req, res) => {
  db.get("SELECT * FROM listening ORDER BY RANDOM() LIMIT 1", (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

app.get('/api/reading', (req, res) => {
  db.get("SELECT * FROM reading ORDER BY RANDOM() LIMIT 1", (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
