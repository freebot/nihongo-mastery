document.addEventListener('DOMContentLoaded', () => {
  // Ocultar todas las secciones excepto la primera
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
      const targetId = e.target.getAttribute('href').substring(1); // Obtener el ID de la sección

      // Ocultar todas las secciones
      sections.forEach(section => section.style.display = 'none');

      // Mostrar la sección seleccionada
      const selectedSection = document.getElementById(targetId);
      if (selectedSection) {
        selectedSection.style.display = 'block';

        // Cargar contenido dinámico si es necesario
        if (targetId === 'kanji') loadKanji();
        if (targetId === 'vocabulario') loadVocabulary();
        if (targetId === 'gramatica') loadGrammar();
      }
    });
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
    const vocabList = document.getElementById('vocab-list');
    if (data.length > 0) {
      vocabList.innerHTML = data.map(item => `
        <li><strong>${item.word} (${item.reading}):</strong> ${item.meaning}</li>
      `).join('');
    } else {
      vocabList.innerHTML = '<p>No hay vocabulario disponible.</p>';
    }
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
