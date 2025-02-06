¡Claro! Aquí tienes un archivo `README.md` bien estructurado que describe el proyecto, cómo configurarlo y usarlo. También he incluido a **Jorge Ikeda** como autor.

---

### **README.md**

```markdown
# Nihongo Mastery

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Nihongo Mastery** es una aplicación web diseñada para ayudarte a aprender japonés, específicamente enfocada en los niveles **N4 y N3** del **JLPT (Japanese Language Proficiency Test)**. La aplicación incluye lecciones interactivas de kanji, vocabulario, gramática, comprensión auditiva y lectura.

## Características Principales

- **Kanji:** Aprende kanji con ejemplos, lecturas y significados.
- **Vocabulario:** Lista de palabras esenciales organizadas por nivel (N4 y N3).
- **Gramática:** Explicaciones claras y ejemplos prácticos de estructuras gramaticales.
- **Comprensión Auditiva:** Audios auténticos con transcripciones y preguntas de comprensión.
- **Lectura:** Textos cortos con preguntas de comprensión.
- **Backend:** API RESTful construida con Node.js y SQLite para gestionar el contenido educativo.
- **Docker:** Compatible con Docker para facilitar el despliegue.

## Capturas de Pantalla

![Captura 1](./screenshots/screenshot1.png)  
*Interfaz principal de la aplicación.*

![Captura 2](./screenshots/screenshot2.png)  
*Ejemplo de una lección de kanji.*

## Requisitos

- Node.js (v16 o superior)
- npm (v8 o superior)
- SQLite
- Docker (opcional, para despliegue)

## Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/TU_USUARIO/nihongo-mastery.git
cd nihongo-mastery
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar la Base de Datos

La base de datos utiliza SQLite. Para crear y poblar la base de datos:

```bash
sqlite3 db/database.sqlite < db/init-db.sql
```

### 4. Iniciar la Aplicación

#### Modo de Desarrollo

```bash
npm run dev
```

#### Modo de Producción

```bash
npm start
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## Uso con Docker

### Construir la Imagen de Docker

```bash
docker build -t nihongo-mastery .
```

### Ejecutar el Contenedor

```bash
docker run -p 3000:3000 nihongo-mastery
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## Estructura del Proyecto

```
/nihongo-mastery
  ├── /db
  │     └── init-db.sql          # Script SQL para inicializar la base de datos
  │     └── database.sqlite      # Base de datos SQLite
  ├── /public
  │     └── index.html           # Frontend de la aplicación
  ├── server.js                  # Servidor principal (backend)
  ├── package.json               # Dependencias y scripts
  └── Dockerfile                 # Archivo para construir la imagen de Docker
```

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas mejorar la aplicación, agregar contenido educativo o corregir errores, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama para tu contribución (`git checkout -b feature/nueva-funcionalidad`).
3. Haz commit de tus cambios (`git commit -m "Agrega nueva funcionalidad"`).
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un pull request.

## Licencia

Este proyecto está bajo la licencia **MIT**. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## Autor

**Jorge Ikeda**  
- GitHub: [@freebot](https://github.com/freebot)  
- Email: jorgeikeda@example.com  

---
```

---

### **Notas Adicionales**

1. **Capturas de Pantalla:**
   - Guarda las capturas de pantalla en una carpeta llamada `/screenshots` dentro del proyecto y actualiza las rutas en el archivo `README.md`.

2. **Licencia:**
   - Crea un archivo llamado `LICENSE` en la raíz del proyecto con el siguiente contenido:

```text
MIT License

Copyright (c) 2023 Jorge Ikeda

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

