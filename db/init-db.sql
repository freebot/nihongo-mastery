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
INSERT INTO kanji (kanji, onyomi, kunyomi, meaning) VALUES
  ('一', 'イチ', 'ひと-', 'Uno'),
  ('二', 'ニ', 'ふた-', 'Dos'),
  ('三', 'サン', 'み-', 'Tres'),
  ('四', 'シ', 'よん', 'Cuatro'),
  ('五', 'ゴ', 'いつ', 'Cinco'),
  ('六', 'ロク', 'むっ-', 'Seis'),
  ('七', 'シチ', 'なな', 'Siete'),
  ('八', 'ハチ', 'やっ-', 'Ocho'),
  ('九', 'キュウ', 'ここの', 'Nueve'),
  ('十', 'ジュウ', 'とお', 'Diez');

-- Generar automáticamente más kanji (hasta 1,000)
WITH RECURSIVE numbers AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM numbers WHERE n < 1000
)
INSERT INTO kanji (kanji, onyomi, kunyomi, meaning)
SELECT
  CASE n % 10
    WHEN 1 THEN '一'
    WHEN 2 THEN '二'
    WHEN 3 THEN '三'
    WHEN 4 THEN '四'
    WHEN 5 THEN '五'
    WHEN 6 THEN '六'
    WHEN 7 THEN '七'
    WHEN 8 THEN '八'
    WHEN 9 THEN '九'
    ELSE '十'
  END || '番',
  CASE n % 10
    WHEN 1 THEN 'イチ'
    WHEN 2 THEN 'ニ'
    WHEN 3 THEN 'サン'
    WHEN 4 THEN 'シ'
    WHEN 5 THEN 'ゴ'
    WHEN 6 THEN 'ロク'
    WHEN 7 THEN 'シチ'
    WHEN 8 THEN 'ハチ'
    WHEN 9 THEN 'キュウ'
    ELSE 'ジュウ'
  END || '番',
  CASE n % 10
    WHEN 1 THEN 'ひと-'
    WHEN 2 THEN 'ふた-'
    WHEN 3 THEN 'み-'
    WHEN 4 THEN 'よん'
    WHEN 5 THEN 'いつ'
    WHEN 6 THEN 'むっ-'
    WHEN 7 THEN 'なな'
    WHEN 8 THEN 'やっ-'
    WHEN 9 THEN 'ここの'
    ELSE 'とお'
  END || '番',
  'Kanji número ' || n
FROM numbers;

-- Insertar datos de ejemplo en la tabla de Vocabulario
INSERT INTO vocabulary (word, reading, meaning, level) VALUES
  ('学校', 'がっこう', 'Escuela', 'N4'),
  ('先生', 'せんせい', 'Profesor', 'N4'),
  ('学生', 'がくせい', 'Estudiante', 'N4'),
  ('旅行', 'りょこう', 'Viaje', 'N3'),
  ('仕事', 'しごと', 'Trabajo', 'N3');

-- Generar automáticamente más vocabulario (hasta 3,000)
WITH RECURSIVE numbers AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM numbers WHERE n < 3000
)
INSERT INTO vocabulary (word, reading, meaning, level)
SELECT
  CASE n % 5
    WHEN 1 THEN '学校'
    WHEN 2 THEN '先生'
    WHEN 3 THEN '学生'
    WHEN 4 THEN '旅行'
    ELSE '仕事'
  END || n,
  CASE n % 5
    WHEN 1 THEN 'がっこう'
    WHEN 2 THEN 'せんせい'
    WHEN 3 THEN 'がくせい'
    WHEN 4 THEN 'りょこう'
    ELSE 'しごと'
  END || n,
  'Palabra número ' || n,
  CASE n % 2
    WHEN 0 THEN 'N4'
    ELSE 'N3'
  END
FROM numbers;

-- Insertar datos de ejemplo en la tabla de Gramática
INSERT INTO grammar (structure, explanation, example, level) VALUES
  ('～ます/～ません', 'Forma cortés para verbos.', '行きます (ikimasu) - Voy / No voy: 行きません (ikimasen)', 'N4'),
  ('～ている', 'Indica una acción en progreso o estado resultante.', '食べています (tabete imasu) - Estoy comiendo.', 'N3');

-- Generar automáticamente más gramática (hasta 500)
WITH RECURSIVE numbers AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM numbers WHERE n < 500
)
INSERT INTO grammar (structure, explanation, example, level)
SELECT
  'Estructura ' || n,
  'Explicación para la estructura número ' || n,
  'Ejemplo de uso para la estructura número ' || n,
  CASE n % 2
    WHEN 0 THEN 'N4'
    ELSE 'N3'
  END
FROM numbers;
