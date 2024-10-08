# Dockerfile (backend)

# Imagen base
FROM python:3.9-slim

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de requisitos
COPY ./requirements.txt /app/requirements.txt

# Instalar dependencias
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

# Copiar todo el código de la aplicación
COPY . /app

# Exponer el puerto en el que correrá la aplicación
EXPOSE 8000

# Comando para correr la aplicación
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
