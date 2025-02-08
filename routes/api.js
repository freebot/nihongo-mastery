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
      if (err) {
        console.error('Error al consultar kanji:', err);
        return res.status(500).json({ error: 'Error al cargar kanji.' });
      }
      if (!row) {
        return res.status(404).json({ error: 'No se encontraron kanji.' });
      }
      res.json(row);
    });
  });

  // Ruta para obtener vocabulario (una palabra aleatoria)
  router.get('/vocabulary', (req, res) => {
    const level = req.query.level || 'N4';
    db.get("SELECT * FROM vocabulary WHERE level = ? ORDER BY RANDOM() LIMIT 1", [level], (err, row) => {
      if (err) {
        console.error('Error al consultar vocabulario:', err);
        return res.status(500).json({ error: 'Error al cargar vocabulario.' });
      }
      if (!row) {
        return res.status(404).json({ error: 'No se encontraron palabras.' });
      }
      res.json(row); // Devuelve un objeto con los datos de la palabra
    });
  });

  // Ruta para agregar nuevo vocabulario
  router.post('/vocabulary', (req, res) => {
    const { word, reading, meaning, level } = req.body;
    db.run(
      "INSERT INTO vocabulary (word, reading, meaning, level) VALUES (?, ?, ?, ?)",
      [word, reading, meaning, level],
      function (err) {
        if (err) {
          console.error('Error al agregar vocabulario:', err);
          return res.status(500).json({ error: 'Error al agregar vocabulario.' });
        }
        res.json({ id: this.lastID, word, reading, meaning, level });
      }
    );
  });

  // Ruta para obtener una estructura gramatical aleatoria
  router.get('/grammar', (req, res) => {
    db.get("SELECT * FROM grammar ORDER BY RANDOM() LIMIT 1", (err, row) => {
      if (err) {
        console.error('Error al consultar gramática:', err);
        return res.status(500).json({ error: 'Error al cargar gramática.' });
      }
      if (!row) {
        return res.status(404).json({ error: 'No se encontró gramática.' });
      }
      res.json(row);
    });
  });

  // Ruta para exportar datos como JSON
  router.get('/export-data', (req, res) => {
    const queries = [
      "SELECT * FROM kanji",
      "SELECT * FROM vocabulary",
      "SELECT * FROM grammar"
    ];

    const results = {};
    let completedQueries = 0;

    queries.forEach((query, index) => {
      db.all(query, [], (err, rows) => {
        if (err) {
          console.error('Error al exportar datos:', err);
          return res.status(500).send('Error al exportar datos.');
        }

        const tableName = ['kanji', 'vocabulary', 'grammar'][index];
        results[tableName] = rows;

        completedQueries++;
        if (completedQueries === queries.length) {
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Content-Disposition', 'attachment; filename="backup.json"');
          res.send(JSON.stringify(results, null, 2));
        }
      });
    });
  });

  // Ruta para importar datos desde un archivo JSON
  router.post('/import-data', express.json({ limit: '10mb' }), (req, res) => {
    const { kanji, vocabulary, grammar } = req.body;

    if (!kanji || !vocabulary || !grammar) {
      return res.status(400).send('Datos inválidos.');
    }

    const insertData = (table, data, columns) => {
      return new Promise((resolve, reject) => {
        const placeholders = columns.map(() => '?').join(', ');
        const query = `INSERT OR IGNORE INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`;

        const tasks = data.map(row => {
          return new Promise((resolveTask, rejectTask) => {
            db.run(query, columns.map(col => row[col]), (err) => {
              if (err) return rejectTask(err);
              resolveTask();
            });
          });
        });

        Promise.all(tasks).then(resolve).catch(reject);
      });
    };

    Promise.all([
      insertData('kanji', kanji, ['kanji', 'onyomi', 'kunyomi', 'meaning']),
      insertData('vocabulary', vocabulary, ['word', 'reading', 'meaning', 'level']),
      insertData('grammar', grammar, ['structure', 'explanation', 'example', 'level'])
    ])
      .then(() => res.send('Datos importados exitosamente.'))
      .catch(err => {
        console.error('Error al importar datos:', err);
        res.status(500).send('Error al importar datos.');
      });
  });
  return router;
};