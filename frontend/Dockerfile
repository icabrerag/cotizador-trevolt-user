# Dockerfile (frontend)

# Imagen base
FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar el archivo package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código de la aplicación
COPY . .

# Compilar la aplicación Next.js
RUN npm run build

# Exponer el puerto en el que correrá la aplicación
EXPOSE 3000

# Comando para correr la aplicación
CMD ["npm", "start"]
