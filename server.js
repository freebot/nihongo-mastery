// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Conectar a la base de datos SQLite
const db = new sqlite3.Database('./db/database.sqlite');

// Crear tabla si no existe
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS kanji (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kanji TEXT,
      onyomi TEXT,
      kunyomi TEXT,
      meaning TEXT
    )
  `);

  // Insertar datos de ejemplo si la tabla está vacía
  db.get("SELECT COUNT(*) as count FROM kanji", (err, row) => {
    if (row.count === 0) {
      db.run("INSERT INTO kanji (kanji, onyomi, kunyomi, meaning) VALUES (?, ?, ?, ?)", [
        '一', 'イチ', 'ひと-', 'Uno'
      ]);
    }
  });
});

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas API
app.get('/api/kanji', (req, res) => {
  db.get("SELECT * FROM kanji ORDER BY RANDOM() LIMIT 1", (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
