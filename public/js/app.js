document.addEventListener('DOMContentLoaded', () => {
  loadKanji();
  loadVocabulary();
  loadGrammar();

  const form = document.getElementById('add-vocab-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
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
      const result = await response.json();
      alert(`Vocabulario agregado: ${result.word}`);
      form.reset();
      loadVocabulary(); // Actualiza la lista de vocabulario
    } catch (error) {
      console.error('Error al agregar vocabulario:', error);
    }
  });
});

async function loadKanji() {
  const response = await fetch('/api/kanji');
  const data = await response.json();
  document.getElementById('kanji-card').innerHTML = `
    <h2>${data.kanji}</h2>
    <p><strong>Lecturas:</strong> On'yomi: ${data.onyomi}, Kun'yomi: ${data.kunyomi}</p>
    <p><strong>Significado:</strong> ${data.meaning}</p>
  `;
}

async function loadVocabulary() {
  const response = await fetch('/api/vocabulary?level=N4');
  const data = await response.json();
  const vocabList = document.getElementById('vocab-list');
  vocabList.innerHTML = data.map(item => `
    <li><strong>${item.word} (${item.reading}):</strong> ${item.meaning}</li>
  `).join('');
}

async function loadGrammar() {
  const response = await fetch('/api/grammar');
  const data = await response.json();
  document.getElementById('grammar-card').innerHTML = `
    <p><strong>Estructura:</strong> ${data.structure}</p>
    <p><strong>Explicación:</strong> ${data.explanation}</p>
    <p><strong>Ejemplo:</strong> ${data.example}</p>
  `;
}
