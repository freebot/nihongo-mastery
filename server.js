const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware para analizar JSON
app.use(express.json());

// Conectar a la base de datos SQLite
const dbPath = path.join(__dirname, 'db/database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
  } else {
    console.log('Conexión exitosa a la base de datos.');
  }
});

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para exportar datos como JSON
app.get('/api/export-data', (req, res) => {
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
app.post('/api/import-data', express.json({ limit: '10mb' }), (req, res) => {
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

// Rutas API para obtener contenido
app.get('/api/kanji', (req, res) => {
  db.get("SELECT * FROM kanji ORDER BY RANDOM() LIMIT 1", (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

app.get('/api/vocabulary', (req, res) => {
  db.get("SELECT * FROM vocabulary WHERE level = ? ORDER BY RANDOM() LIMIT 1", ['N4'], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
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