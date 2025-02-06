document.addEventListener('DOMContentLoaded', () => {
  // Ocultar todas las secciones excepto la primera
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => section.style.display = 'none');
  document.getElementById('kanji').style.display = 'block';

  // Manejar clics en el menú
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = e.target.getAttribute('href').substring(1); // Obtener el ID de la sección
      sections.forEach(section => section.style.display = 'none'); // Ocultar todas las secciones
      document.getElementById(targetId).style.display = 'block'; // Mostrar la sección seleccionada

      // Cargar contenido dinámico si es necesario
      if (targetId === 'kanji') loadKanji();
      if (targetId === 'vocabulario') loadVocabulary();
      if (targetId === 'gramatica') loadGrammar();
    });
  });

  // Cargar contenido inicial
  loadKanji();
  loadVocabulary();
  loadGrammar();
});

async function loadKanji() {
  try {
    const response = await fetch('/api/kanji');
    const data = await response.json();
    document.getElementById('kanji-card').innerHTML = `
      <h2>${data.kanji}</h2>
      <p><strong>Lecturas:</strong> On'yomi: ${data.onyomi}, Kun'yomi: ${data.kunyomi}</p>
      <p><strong>Significado:</strong> ${data.meaning}</p>
    `;
  } catch (error) {
    console.error('Error al cargar kanji:', error);
  }
}

async function loadVocabulary() {
  try {
    const response = await fetch('/api/vocabulary?level=N4');
    const data = await response.json();
    const vocabList = document.getElementById('vocab-list');
    vocabList.innerHTML = data.map(item => `
      <li><strong>${item.word} (${item.reading}):</strong> ${item.meaning}</li>
    `).join('');
  } catch (error) {
    console.error('Error al cargar vocabulario:', error);
  }
}

async function loadGrammar() {
  try {
    const response = await fetch('/api/grammar');
    const data = await response.json();
    document.getElementById('grammar-card').innerHTML = `
      <p><strong>Estructura:</strong> ${data.structure}</p>
      <p><strong>Explicación:</strong> ${data.explanation}</p>
      <p><strong>Ejemplo:</strong> ${data.example}</p>
    `;
  } catch (error) {
    console.error('Error al cargar gramática:', error);
  }
}
