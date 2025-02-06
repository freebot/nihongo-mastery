const path = require('path');
const fs = require('fs');

module.exports = (db) => {
  const express = require('express');
  const router = express.Router();

  // Ruta para descargar el archivo database.sqlite
  router.get('/download-db', (req, res) => {
    const dbPath = path.join(__dirname, '../db/database.sqlite');
    if (fs.existsSync(dbPath)) {
      res.download(dbPath, 'database.sqlite', (err) => {
        if (err) {
          console.error('Error al descargar la base de datos:', err);
          res.status(500).send('Error al descargar la base de datos.');
        }
      });
    } else {
      res.status(404).send('La base de datos no existe.');
    }
  });

  // Ruta para descargar las instrucciones (README.txt)
  router.get('/download-instructions', (req, res) => {
    const instructions = `
Instrucciones para Recrear el Entorno Docker

1. Instala Docker en tu sistema:
   https://www.docker.com/get-started

2. Construye la imagen de Docker:
   docker build -t nihongo-mastery .

3. Crea un directorio local para los datos:
   mkdir -p ./db-data

4. Coloca el archivo database.sqlite en ./db-data.

5. Ejecuta el contenedor con el volumen:
   docker run -p 3000:3000 -v $(pwd)/db-data:/app/db --name nihongo-mastery nihongo-mastery

6. Accede a la aplicación en:
   http://localhost:3000
    `;

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', 'attachment; filename="README.txt"');
    res.send(instructions);
  });

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

  // Ruta para obtener una estructura gramatical aleatoria
  router.get('/grammar', (req, res) => {
    db.get("SELECT * FROM grammar ORDER BY RANDOM() LIMIT 1", (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(row);
    });
  });

  return router;
};
