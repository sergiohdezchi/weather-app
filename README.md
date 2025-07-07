# ☁️ ClimaSphere

<div align="center">
  
![Banner ClimaSphere](https://via.placeholder.com/800x300/1565c0/FFFFFF?text=ClimaSphere)

> *Donde la meteorología se transforma en arte*

[![Rails Version](https://img.shields.io/badge/Rails-7.0.0-red.svg)](https://rubyonrails.org/)
[![React Version](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue.svg)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Supported-2496ED.svg?logo=docker)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

## 📋 Descripción

**ClimaSphere** es una aplicación full-stack moderna para consulta de información meteorológica en tiempo real de ciudades alrededor del mundo. Con un diseño elegante e intuitivo, ClimaSphere transforma los datos meteorológicos en una experiencia visual cautivadora, proporcionando pronósticos precisos con una interfaz que responde a las condiciones climáticas de cada lugar.

### ✨ Experiencia ClimaSphere

- 🌍 **Exploración mundial** - Busca cualquier ciudad del planeta con autocompletado inteligente
- � **Pronóstico inmersivo** - Visualización interactiva del clima actual y futuro
- 🎨 **Interfaz adaptativa** - Diseño que cambia según las condiciones meteorológicas
- 📱 **Experiencia multiplataforma** - Optimizado para todos los dispositivos y pantallas
- 🔐 **Personalización segura** - Tu perfil protegido con OAuth 2.0
- ⚡ **Rendimiento superior** - Sistema de caché inteligente para respuestas instantáneas

## 🖼️ La experiencia ClimaSphere

<div align="center">
  <table>
    <tr>
      <td><img src="https://via.placeholder.com/400x250/1565c0/FFFFFF?text=ClimaSphere+Dashboard" alt="ClimaSphere Dashboard"/></td>
      <td><img src="https://via.placeholder.com/400x250/ff9800/FFFFFF?text=Forecast+Details" alt="Forecast Details"/></td>
    </tr>
    <tr>
      <td><img src="https://via.placeholder.com/400x250/4caf50/FFFFFF?text=City+Explorer" alt="City Explorer"/></td>
      <td><img src="https://via.placeholder.com/400x250/9c27b0/FFFFFF?text=ClimaSphere+Portal" alt="ClimaSphere Portal"/></td>
    </tr>
  </table>
</div>

## 🏗️ Arquitectura

La aplicación está construida siguiendo principios de arquitectura limpia y patrones de diseño modernos:

### Backend (Ruby on Rails)
- API RESTful con autenticación OAuth 2.0 (Doorkeeper)
- Capa de servicios para comunicación con OpenWeather API
- Sistema de caché con Redis para optimizar peticiones

### Frontend (React + TypeScript + Material UI)
- Arquitectura basada en características utilizando Redux Toolkit
- Componentes reutilizables con Material UI
- Animaciones fluidas con Framer Motion

## 🚀 Instalación y Ejecución

### Prerrequisitos

- [Docker](https://www.docker.com/get-started) y [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/downloads) (opcional, para clonar el repositorio)
- Una clave de API de [OpenWeather](https://openweathermap.org/api)

### Guía rápida de instalación

<details>
<summary><b>1️⃣ Configurar Variables de Entorno</b></summary>
<br>

Crea un archivo `.env` en la carpeta `weather-service` usando el template proporcionado:

```bash
cp weather-service/.env.example weather-service/.env
```

Abre el archivo `.env` y configura tu API key:

```env
OPENWEATHER_API_KEY=tu_api_key_aquí
```
</details>

<details>
<summary><b>2️⃣ Construir y Iniciar los Servicios</b></summary>
<br>

Ejecuta el siguiente comando para construir e iniciar todos los servicios:

```bash
docker-compose up --build
```

Este comando iniciará:

| Servicio | Descripción | Puerto |
|----------|-------------|--------|
| PostgreSQL | Base de datos | 5433 |
| Redis | Cache system | 6380 |
| Rails API | Backend | 3000 |
| React App | Frontend | 5173 |

> ⏱️ La primera ejecución puede tomar varios minutos mientras se construyen las imágenes.
</details>

<details>
<summary><b>3️⃣ Sembrar Datos Iniciales (Opcional)</b></summary>
<br>

Para cargar datos de prueba en la aplicación:

```bash
docker-compose exec weather-service rails db:seed
```

Esto creará un usuario de prueba:
- Email: `user@example.com`
- Password: `password`
</details>

### 🌐 Acceso a ClimaSphere

Una vez que todos los servicios estén en funcionamiento:

- **🖥️ Portal ClimaSphere:** [http://localhost:5173](http://localhost:5173)
- **⚙️ API ClimaSphere:** [http://localhost:3000/api/v1](http://localhost:3000/api/v1)
- **📚 Documentación API:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## ⚙️ Gestión de la Aplicación

### Comandos Docker frecuentes

```bash
# Iniciar todos los servicios en modo detached (background)
docker-compose up -d

# Ver logs en tiempo real
docker-compose logs -f

# Reiniciar todos los servicios
docker-compose restart

# Detener la aplicación sin eliminar volúmenes
docker-compose down

# Detener y eliminar volúmenes (borra datos persistentes)
docker-compose down -v

# Ejecutar comandos en el contenedor de Rails
docker-compose exec weather-service rails console
docker-compose exec weather-service rails db:migrate
```

## 🧪 Pruebas

La aplicación incluye un conjunto completo de tests automatizados:

```bash
# Ejecutar pruebas del backend
docker-compose exec weather-service rails test

# Ejecutar pruebas del frontend
docker-compose exec weather-webapp npm test
```

## 🛠️ Stack Tecnológico

<div align="center">
  <table>
    <tr>
      <th>Backend</th>
      <th>Frontend</th>
      <th>Infraestructura</th>
    </tr>
    <tr>
      <td>
        <img src="https://img.shields.io/badge/Ruby%20on%20Rails-CC0000?logo=ruby-on-rails&logoColor=white" alt="Rails"/><br>
        <img src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL"/><br>
        <img src="https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white" alt="Redis"/><br>
        <img src="https://img.shields.io/badge/Devise-8B5CF6?logo=ruby&logoColor=white" alt="Devise"/><br>
        <img src="https://img.shields.io/badge/Doorkeeper-000000?logo=ruby&logoColor=white" alt="Doorkeeper"/>
      </td>
      <td>
        <img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black" alt="React"/><br>
        <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript"/><br>
        <img src="https://img.shields.io/badge/Material%20UI-0081CB?logo=material-ui&logoColor=white" alt="Material UI"/><br>
        <img src="https://img.shields.io/badge/Redux%20Toolkit-764ABC?logo=redux&logoColor=white" alt="Redux Toolkit"/><br>
        <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white" alt="Vite"/>
      </td>
      <td>
        <img src="https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white" alt="Docker"/><br>
        <img src="https://img.shields.io/badge/Docker%20Compose-2496ED?logo=docker&logoColor=white" alt="Docker Compose"/><br>
        <img src="https://img.shields.io/badge/OpenWeather%20API-EB6E4B?logo=openstreetmap&logoColor=white" alt="OpenWeather API"/><br>
        <img src="https://img.shields.io/badge/OAuth%202.0-000000?logo=auth0&logoColor=white" alt="OAuth 2.0"/>
      </td>
    </tr>
  </table>
</div>

## 📡 API Endpoints

La API del backend proporciona los siguientes endpoints:

| Método | Endpoint | Descripción | Requiere Auth |
|--------|----------|-------------|:-------------:|
| GET | `/api/v1/cities` | Lista ciudades con información meteorológica | ✅ |
| GET | `/api/v1/cities?city=new` | Busca ciudades por nombre | ✅ |
| GET | `/api/v1/weather_forecasts` | Pronóstico por ciudad | ✅ |
| POST | `/oauth/token` | Obtener token de acceso | ❌ |
| POST | `/api/v1/users` | Registro de usuario | ❌ |

## 🔍 La magia detrás de ClimaSphere

### Exploración Global Inteligente

ClimaSphere transforma la búsqueda de ciudades en una experiencia fluida:

- **Sugerencias predictivas** que anticipan tu búsqueda mientras escribes
- **Algoritmo de relevancia** que prioriza resultados según tu ubicación y búsquedas anteriores
- **Sistema de caché adaptativo** que aprende de los patrones de uso colectivos

### Visualización Atmosférica

La información meteorológica cobra vida con representaciones visuales inmersivas:

- **Interfaz reactiva al clima** que adapta colores, iconos y animaciones según las condiciones
- **Transiciones suaves** entre estados meteorológicos con animaciones fluidas
- **Gráficos de tendencias** que permiten comprender patrones climáticos de un vistazo
- **Mapas térmicos interactivos** para visualizar cambios de temperatura por zonas

## 🤝 Contribución

Las contribuciones son bienvenidas. Para contribuir:

1. Haz un fork del proyecto
2. Crea tu rama de características (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - vea el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">
  <p>🌈 <b>ClimaSphere</b> - El clima mundial en la palma de tu mano</p>
  <p>Desarrollado con ❤️ por <a href="https://github.com/yourusername">Tu Nombre</a></p>
  <p>
    <a href="https://github.com/yourusername/climasphere/issues">Reportar Bug</a> ·
    <a href="https://github.com/yourusername/climasphere/issues">Solicitar Feature</a>
  </p>
</div>
