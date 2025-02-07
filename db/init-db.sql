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
  ('十', 'ジュウ', 'とお', 'Diez'),
  ('山', 'サン', 'やま', 'Montaña'),
  ('川', 'セン', 'かわ', 'Río'),
  ('日', 'ニチ', 'ひ', 'Día/Sol'),
  ('月', 'ゲツ', 'つき', 'Luna/Mes'),
  ('火', 'カ', 'ひ', 'Fuego'),
  ('水', 'スイ', 'みず', 'Agua'),
  ('木', 'ボク', 'き', 'Árbol'),
  ('金', 'キン', 'かね', 'Metal/Dinero'),
  ('土', 'ド', 'つち', 'Tierra'),
  ('人', 'ジン', 'ひと', 'Persona');

-- Insertar datos de ejemplo en la tabla de Vocabulario
INSERT INTO vocabulary (word, reading, meaning, level) VALUES
  ('学校', 'がっこう', 'Escuela', 'N4'),
  ('先生', 'せんせい', 'Profesor', 'N4'),
  ('学生', 'がくせい', 'Estudiante', 'N4'),
  ('旅行', 'りょこう', 'Viaje', 'N3'),
  ('仕事', 'しごと', 'Trabajo', 'N3'),
  ('本', 'ほん', 'Libro', 'N4'),
  ('猫', 'ねこ', 'Gato', 'N4'),
  ('犬', 'いぬ', 'Perro', 'N4'),
  ('山', 'やま', 'Montaña', 'N4'),
  ('川', 'かわ', 'Río', 'N4'),
  ('友達', 'ともだち', 'Amigo', 'N4'),
  ('家族', 'かぞく', 'Familia', 'N4'),
  ('時間', 'じかん', 'Tiempo', 'N4'),
  ('日本', 'にほん', 'Japón', 'N4'),
  ('外国', 'がいこく', 'Extranjero', 'N3'),
  ('電車', 'でんしゃ', 'Tren', 'N4'),
  ('飛行機', 'ひこうき', 'Avión', 'N3'),
  ('映画', 'えいが', 'Película', 'N3'),
  ('音楽', 'おんがく', 'Música', 'N3'),
  ('料理', 'りょうり', 'Cocina', 'N3'),
  ('勉強', 'べんきょう', 'Estudio', 'N4'),
  ('会話', 'かいわ', 'Conversación', 'N3'),
  ('天気', 'てんき', 'Clima', 'N4'),
  ('明日', 'あした', 'Mañana', 'N4'),
  ('昨日', 'きのう', 'Ayer', 'N4'),
  ('今日', 'きょう', 'Hoy', 'N4');

-- Insertar datos de ejemplo en la tabla de Gramática
INSERT INTO grammar (structure, explanation, example, level) VALUES
  ('～ます/～ません', 'Forma cortés para verbos.', '行きます (ikimasu) - Voy / No voy: 行きません (ikimasen)', 'N4'),
  ('～ている', 'Indica una acción en progreso o estado resultante.', '食べています (tabete imasu) - Estoy comiendo.', 'N3'),
  ('～たい', 'Expresa deseo de hacer algo.', '食べたい (tabetai) - Quiero comer.', 'N4'),
  ('～なければなりません', 'Indica obligación o necesidad.', '勉強しなければなりません (benkyou shinakereba narimasen) - Debo estudiar.', 'N3'),
  ('～てもいいです', 'Permite pedir o dar permiso.', '行っても良いですか？(Itte mo ii desu ka?) - ¿Puedo ir?', 'N4'),
  ('～ほうがいいです', 'Recomienda hacer algo.', '早く寝たほうがいいです (Hayaku netta hou ga ii desu) - Es mejor dormir temprano.', 'N3'),
  ('～たことがあります', 'Expresa experiencias pasadas.', '日本に行ったことがあります (Nihon ni itta koto ga arimasu) - He ido a Japón.', 'N3'),
  ('～ながら', 'Indica realizar dos acciones simultáneamente.', '音楽を聞きながら勉強します (Ongaku o kikinagara benkyou shimasu) - Estudio mientras escucho música.', 'N3');