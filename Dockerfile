# Usa una imagen base de Node.js
FROM node:16-alpine

# Instala SQLite
RUN apk add --no-cache sqlite

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto
COPY package.json .
COPY . .

# Instala las dependencias
RUN npm install

# Crea el directorio db si no existe
RUN mkdir -p db

# Copia el script de inicialización de la base de datos
COPY db/init-db.sql /app/db/init-db.sql

# Expone el puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["sh", "-c", "if [ ! -f db/database.sqlite ]; then sqlite3 db/database.sqlite < db/init-db.sql; fi && node server.js"]
