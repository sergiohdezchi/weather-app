# Usa la imagen oficial de Node.js
FROM node:18

# Configura el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias y los instala
COPY package.json package-lock.json ./
RUN npm install

# Copia el código de la aplicación
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Expone el puerto 5173 (Vite usa este puerto por defecto)
EXPOSE 5173

# Inicia el servidor de desarrollo
CMD ["npm", "run", "dev", "--", "--host"]
