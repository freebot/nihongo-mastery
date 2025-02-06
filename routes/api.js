module.exports = (db) => {
  const express = require('express');
  const router = express.Router();

  // Ruta para obtener un kanji aleatorio
  router.get('/kanji', (req, res) => {
    db.get("SELECT * FROM kanji ORDER BY RANDOM() LIMIT 1", (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(row);
    });
  });

  // Ruta para obtener vocabulario por nivel
  router.get('/vocabulary', (req, res) => {
    const level = req.query.level || 'N4';
    db.all("SELECT * FROM vocabulary WHERE level = ?", [level], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  // Ruta para agregar nuevo vocabulario
  router.post('/vocabulary', (req, res) => {
    const { word, reading, meaning, level } = req.body;
    db.run(
      "INSERT INTO vocabulary (word, reading, meaning, level) VALUES (?, ?, ?, ?)",
      [word, reading, meaning, level],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, word, reading, meaning, level });
      }
    );
  });

  // Ruta para obtener gramática
  router.get('/grammar', (req, res) => {
    db.get("SELECT * FROM grammar ORDER BY RANDOM() LIMIT 1", (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(row);
    });
  });

  return router;
};
