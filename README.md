
---

# Nihongo Mastery

**Nihongo Mastery** es una aplicación web diseñada para ayudarte a aprender japonés enfocándose en los niveles JLPT N4 y N3. La aplicación incluye secciones para practicar kanji, vocabulario, gramática, listening (comprensión auditiva) y reading (comprensión lectora). Además, ofrece funcionalidades avanzadas como exportar e importar datos para hacer respaldos y evitar duplicados.

## Características Principales

- **Kanji del Día:** Muestra un kanji aleatorio con su significado, lecturas on'yomi y kun'yomi.
- **Vocabulario del Día:** Muestra una palabra aleatoria con su lectura y significado.
- **Gramática del Día:** Explica una estructura gramatical aleatoria con ejemplos.
- **Quiz Interactivo:** Realiza preguntas sobre kanji y vocabulario con opciones múltiples y lleva un sistema de puntuación.
- **Agregar Conocimiento:** Permite añadir nuevos kanji, vocabulario o estructuras gramaticales a la base de datos.
- **Exportar/Importar Datos:** Exporta tus datos como un archivo JSON y vuelve a importarlos para evitar duplicados.
- **Descargas:** Descarga la base de datos SQLite o las instrucciones para recrear el entorno Docker.

---

## Requisitos Previos

Antes de ejecutar la aplicación, asegúrate de tener instalado lo siguiente:

1. **Node.js:** Versión 16 o superior.
2. **Docker:** Para ejecutar la aplicación en un contenedor Docker.
3. **SQLite3:** Para gestionar la base de datos localmente.

---

## Configuración Inicial

### 1. Clonar el Repositorio

Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/tu-usuario/nihongo-mastery.git
cd nihongo-mastery
```

### 2. Instalar Dependencias

Instala las dependencias necesarias usando npm:

```bash
npm install
```

### 3. Crear la Base de Datos

Asegúrate de que el archivo `db/database.sqlite` exista. Si no existe, puedes crearlo ejecutando el script `init-db.sql`:

```bash
sqlite3 db/database.sqlite < db/init-db.sql
```

El archivo `init-db.sql` contiene las tablas y datos iniciales para `kanji`, `vocabulary`, `grammar`, `listening` y `reading`.

---

## Ejecutar la Aplicación

### Opción 1: Ejecutar Localmente

Para ejecutar la aplicación localmente:

```bash
node server.js
```

Abre tu navegador y accede a:

```
http://localhost:3000
```

### Opción 2: Usar Docker

Si prefieres usar Docker, sigue estos pasos:

1. Construye la imagen de Docker:

   ```bash
   docker build -t nihongo-mastery .
   ```

2. Crea un directorio local para los datos:

   ```bash
   mkdir -p ./db-data
   ```

3. Coloca el archivo `database.sqlite` en el directorio `./db-data`.

4. Ejecuta el contenedor:

   ```bash
   docker run -p 3000:3000 -v $(pwd)/db-data:/app/db --name nihongo-mastery nihongo-mastery
   ```

5. Accede a la aplicación en:

   ```
   http://localhost:3000
   ```

---

## Uso de la Aplicación

### 1. Navegar por las Secciones

Usa el menú de navegación para moverte entre las diferentes secciones:

- **Kanji:** Muestra un kanji aleatorio con su significado y lecturas.
- **Vocabulario:** Muestra una palabra aleatoria con su lectura y significado.
- **Gramática:** Explica una estructura gramatical aleatoria con ejemplos.
- **Quiz:** Realiza preguntas interactivas sobre kanji y vocabulario.
- **Agregar Conocimiento:** Añade nuevos kanji, vocabulario o estructuras gramaticales.
- **Descargas:** Exporta/importa datos o descarga la base de datos.

### 2. Exportar e Importar Datos

- **Exportar Datos:** Haz clic en "Exportar Datos (JSON)" para descargar un archivo JSON con todos los datos.
- **Importar Datos:** Usa el formulario "Importar Datos (JSON)" para cargar un archivo JSON previamente exportado.

---

## Estructura del Proyecto

```
nihongo-mastery/
├── db/
│   ├── database.sqlite       # Base de datos SQLite
│   └── init-db.sql           # Script para inicializar la base de datos
├── public/
│   ├── css/                  # Archivos CSS
│   ├── js/                   # Archivos JavaScript
│   └── index.html            # Página principal
├── routes/
│   └── api.js                # Rutas API del backend
├── server.js                 # Servidor Express
├── package.json              # Dependencias y scripts
└── README.md                 # Documentación del proyecto
```

---

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas mejorar la aplicación, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m "Añadir nueva funcionalidad"`).
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un pull request.

---

## Licencia

Este proyecto está bajo la licencia [MIT](LICENSE). Esto significa que puedes usar, modificar y distribuir el código libremente, siempre que incluyas la licencia original.

---

## Contacto

Si tienes preguntas o sugerencias, no dudes en contactarme:

- **Correo Electrónico:** freebot@gmail.com
- **GitHub:** [https://github.com/freebot(https://github.com/freebot)

---

¡Espero que disfrutes aprendiendo japonés con **Nihongo Mastery**! 😊
