-- Crear tabla de Kanji
CREATE TABLE IF NOT EXISTS kanji (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  kanji TEXT NOT NULL,
  onyomi TEXT,
  kunyomi TEXT,
  meaning TEXT
);

-- Crear tabla de Vocabulario
CREATE TABLE IF NOT EXISTS vocabulary (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  word TEXT NOT NULL,
  reading TEXT,
  meaning TEXT,
  level TEXT CHECK(level IN ('N4', 'N3'))
);

-- Crear tabla de Gramática
CREATE TABLE IF NOT EXISTS grammar (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  structure TEXT NOT NULL,
  explanation TEXT,
  example TEXT,
  level TEXT CHECK(level IN ('N4', 'N3'))
);

-- Insertar datos de ejemplo en la tabla de Kanji
INSERT INTO kanji (kanji, onyomi, kunyomi, meaning)
VALUES
  ('一', 'イチ', 'ひと-', 'Uno'),
  ('二', 'ニ', 'ふた-', 'Dos'),
  ('三', 'サン', 'み-', 'Tres');

-- Insertar datos de ejemplo en la tabla de Vocabulario
INSERT INTO vocabulary (word, reading, meaning, level)
VALUES
  ('学校', 'がっこう', 'Escuela', 'N4'),
  ('先生', 'せんせい', 'Profesor', 'N4'),
  ('学生', 'がくせい', 'Estudiante', 'N4');

-- Insertar datos de ejemplo en la tabla de Gramática
INSERT INTO grammar (structure, explanation, example, level)
VALUES
  ('～ます/～ません', 'Forma cortés para verbos.', '行きます (ikimasu) - Voy / No voy: 行きません (ikimasen)', 'N4');
