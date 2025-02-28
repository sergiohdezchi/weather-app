# Weather App

Este proyecto es una aplicación full-stack compuesta por un backend en **Ruby on Rails** y un frontend en **React con Vite**. La aplicación consume la API de OpenWeather para obtener información meteorológica y la ejecutamos con **Docker Compose**.

## 📂 Estructura del Proyecto

- **`weather-service/`** → Backend (Rails + PostgreSQL + Redis)
- **`weather-webapp/`** → Frontend (React + Vite)

## 🚀 Instalación y Ejecución

### 1️⃣ **Configurar Variables de Entorno**

Antes de ejecutar la aplicación, debes agregar tu clave de API de OpenWeather en el archivo de variables de entorno del backend:


Edita `weather-service/.env.example` y añade tu API key:

```
OPENWEATHER_API_KEY=<TU_CLAVE_DE_API>
```

### 2️⃣ **Construir y Levantar los Contenedores**

Ejecuta el siguiente comando para construir y ejecutar la aplicación con Docker:

```sh
docker-compose up --build
```

Esto iniciará los siguientes servicios:
- **PostgreSQL** en el puerto `5433`
- **Redis** en el puerto `6380`
- **Backend (Rails API)** en el puerto `3000`
- **Frontend (React + Vite)** en el puerto `5173`

### 3️⃣ **Acceder a la Aplicación**

Una vez que los contenedores estén en funcionamiento, puedes acceder a:
- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:3000/api/v1](http://localhost:3000/api/v1)

## 📌 Comandos Útiles

### 🔄 **Reiniciar la Aplicación**
Si necesitas reiniciar los contenedores, usa:
```sh
docker-compose restart
```

### 🛑 **Detener la Aplicación**
Para detener los contenedores sin eliminar los volúmenes:
```sh
docker-compose down
```

Si deseas eliminar los volúmenes (base de datos y caché de Redis):
```sh
docker-compose down -v
```
### **Iniciar la Aplicación**
Para iniciar los contenedores:
```sh
docker-compose up
```

## 🛠 Tecnologías Utilizadas
- **Backend:** Ruby on Rails, PostgreSQL, Redis, Devise, Doorkeeper
- **Frontend:** React, Vite, TypeScript, Material ui
- **Infraestructura:** Docker, Docker Compose
