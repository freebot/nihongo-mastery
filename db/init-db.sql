-- Crear tabla de Kanji
CREATE TABLE IF NOT EXISTS kanji (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  kanji TEXT NOT NULL,
  onyomi TEXT,
  kunyomi TEXT,
  meaning TEXT
);

-- Insertar datos de ejemplo en la tabla de Kanji
INSERT INTO kanji (kanji, onyomi, kunyomi, meaning)
VALUES
  ('一', 'イチ', 'ひと-', 'Uno'),
  ('二', 'ニ', 'ふた-', 'Dos'),
  ('三', 'サン', 'み-', 'Tres');
