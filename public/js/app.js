let currentQuestion = null;
let score = 0;

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => section.style.display = 'none');
  document.getElementById('kanji').style.display = 'block';

  // Cargar contenido inicial
  loadKanji();
  loadVocabulary();

  // Manejar clics en el menú
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = e.target.getAttribute('href').substring(1);

      sections.forEach(section => section.style.display = 'none');

      const selectedSection = document.getElementById(targetId);
      if (selectedSection) {
        selectedSection.style.display = 'block';

        if (targetId === 'kanji') loadKanji();
        if (targetId === 'vocabulario') loadVocabulary();
        if (targetId === 'gramatica') loadGrammar();
        if (targetId === 'quiz') loadQuiz();
      }
    });
  });

  // Agregar vocabulario
  document.getElementById('add-vocab-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = document.getElementById('add-vocab-form');
    const formData = new FormData(form);
    const data = {
      word: formData.get('word'),
      reading: formData.get('reading'),
      meaning: formData.get('meaning'),
      level: formData.get('level'),
    };

    try {
      const response = await fetch('/api/vocabulary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Error al agregar la palabra.');

      const result = await response.json();
      document.getElementById('form-message').textContent = `Palabra agregada: ${result.word}`;
      document.getElementById('form-message').style.color = 'green';
      form.reset();
      loadVocabulary();
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('form-message').textContent = 'Error al agregar la palabra.';
      document.getElementById('form-message').style.color = 'red';
    }
  });

  // Importar datos desde un archivo JSON
  document.getElementById('import-data-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('import-file');
    const file = fileInput.files[0];

    if (!file) {
      alert('Selecciona un archivo JSON.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);

        const response = await fetch('/api/import-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(jsonData),
        });

        if (!response.ok) throw new Error('Error al importar datos.');

        alert('Datos importados exitosamente.');
        loadKanji();
        loadVocabulary();
        loadGrammar();
      } catch (error) {
        console.error('Error al importar datos:', error);
        alert('Error al importar datos.');
      }
    };
    reader.readAsText(file);
  });

  // Quiz
  document.getElementById('next-question').addEventListener('click', () => {
    loadQuiz();
  });
});

async function loadKanji() {
  try {
    const response = await fetch('/api/kanji');
    if (!response.ok) throw new Error('Error al cargar kanji');
    const data = await response.json();
    document.getElementById('kanji-card').innerHTML = `
      <h2>${data.kanji}</h2>
      <p><strong>Lecturas:</strong> On'yomi: ${data.onyomi}, Kun'yomi: ${data.kunyomi}</p>
      <p><strong>Significado:</strong> ${data.meaning}</p>
    `;
  } catch (error) {
    console.error('Error al cargar kanji:', error);
    document.getElementById('kanji-card').innerHTML = '<p>No se pudo cargar el kanji.</p>';
  }
}

async function loadVocabulary() {
  try {
    const response = await fetch('/api/vocabulary?level=N4');
    if (!response.ok) throw new Error('Error al cargar vocabulario');
    const data = await response.json();
    document.getElementById('vocab-list').innerHTML = `
      <li><strong>${data.word} (${data.reading}):</strong> ${data.meaning}</li>
    `;
  } catch (error) {
    console.error('Error al cargar vocabulario:', error);
    document.getElementById('vocab-list').innerHTML = '<p>No se pudo cargar el vocabulario.</p>';
  }
}

async function loadGrammar() {
  try {
    const response = await fetch('/api/grammar');
    if (!response.ok) throw new Error('Error al cargar gramática');
    const data = await response.json();
    document.getElementById('grammar-card').innerHTML = `
      <p><strong>Estructura:</strong> ${data.structure}</p>
      <p><strong>Explicación:</strong> ${data.explanation}</p>
      <p><strong>Ejemplo:</strong> ${data.example}</p>
    `;
  } catch (error) {
    console.error('Error al cargar gramática:', error);
    document.getElementById('grammar-card').innerHTML = '<p>No se pudo cargar la gramática.</p>';
  }
}

async function loadQuiz() {
  try {
    const [kanjiResponse, vocabularyResponse] = await Promise.all([
      fetch('/api/kanji'),
      fetch('/api/vocabulary?level=N4'),
    ]);

    if (!kanjiResponse.ok || !vocabularyResponse.ok) {
      throw new Error('Error al cargar datos para el quiz.');
    }

    const kanjiData = await kanjiResponse.json();
    const vocabularyData = await vocabularyResponse.json();

    const questionType = Math.random() < 0.5 ? 'kanji' : 'vocabulary';
    if (questionType === 'kanji') {
      currentQuestion = {
        type: 'kanji',
        question: `¿Cuál es el significado de este kanji: ${kanjiData.kanji}?`,
        answer: kanjiData.meaning,
      };
    } else {
      currentQuestion = {
        type: 'vocabulary',
        question: `¿Cuál es el significado de esta palabra: ${vocabularyData.word} (${vocabularyData.reading})?`,
        answer: vocabularyData.meaning,
      };
    }

    // Generar opciones múltiples
    const options = [currentQuestion.answer];
    while (options.length < 4) {
      let randomOption;
      if (Math.random() < 0.5) {
        const randomKanji = await fetch('/api/kanji');
        const data = await randomKanji.json();
        randomOption = data.meaning;
      } else {
        const randomVocab = await fetch('/api/vocabulary?level=N4');
        const data = await randomVocab.json();
        randomOption = data.meaning;
      }
      if (!options.includes(randomOption)) {
        options.push(randomOption);
      }
    }

    // Mezclar opciones
    options.sort(() => Math.random() - 0.5);

    // Mostrar pregunta y opciones
    document.getElementById('quiz-question').textContent = currentQuestion.question;
    document.getElementById('quiz-options').innerHTML = options.map(option => `
      <button onclick="checkAnswer('${option}')">${option}</button>
    `).join('');
    document.getElementById('quiz-feedback').textContent = '';
    document.getElementById('next-question').disabled = true;
  } catch (error) {
    console.error('Error al cargar el quiz:', error);
    document.getElementById('quiz-question').textContent = 'No se pudo cargar el quiz.';
    document.getElementById('quiz-options').innerHTML = '';
    document.getElementById('quiz-feedback').textContent = '';
  }
}

function checkAnswer(selectedAnswer) {
  const feedback = document.getElementById('quiz-feedback');
  if (selectedAnswer === currentQuestion.answer) {
    feedback.textContent = '¡Respuesta correcta!';
    feedback.style.color = 'green';
    score += 1;
    document.getElementById('score').textContent = score;
  } else {
    feedback.textContent = `Respuesta incorrecta. La respuesta correcta era: ${currentQuestion.answer}`;
    feedback.style.color = 'red';
  }
  document.getElementById('next-question').disabled = false;
}