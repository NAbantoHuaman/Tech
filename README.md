# Sistema de Gestión de Solicitudes de Soporte

Este proyecto es una aplicación web para la gestión de solicitudes de soporte técnico. Está compuesto por un backend desarrollado en Java con Spring Boot y un frontend desarrollado en React con Vite.

## 🚀 Tecnologías Utilizadas

### Backend
- **Java 21**
- **Spring Boot 3.2.4**
- **Maven** (Wrapper incluido)
- **Lombok** (Para simplificar el código)
- **Spring Validation** (Validación de datos)
- **Springdoc OpenAPI (Swagger)** (Documentación de la API)

### Frontend
- **React 19**
- **Vite** (Herramienta de construcción y servidor de desarrollo)
- **Tailwind CSS 4** (Estilos)
- **Framer Motion** (Animaciones)
- **Lucide React & Heroicons** (Iconografía)

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado en tu máquina lo siguiente:

- **Java Development Kit (JDK) 21**: Necesario para compilar y ejecutar el backend.
- **Node.js (versión 18 o superior)** y **npm**: Necesarios para ejecutar el frontend.
- **Git** (Opcional, para clonar el repositorio).

---

## ⚙️ Instrucciones de Instalación y Ejecución

Puedes ejecutar ambos proyectos de manera independiente o utilizando el comando integrado disponible en el frontend.

### Opción 1: Ejecución Rápida (Ambos a la vez)

El proyecto frontend incluye un script configurado (usando `concurrently`) que te permite levantar tanto el backend como el frontend con un solo comando.

1. Abre una terminal y navega a la carpeta del frontend:
   ```bash
   cd frontend
   ```
2. Instala las dependencias del frontend:
   ```bash
   npm install
   ```
3. Ejecuta el script de inicio simultáneo:
   ```bash
   npm start
   ```
   *Este comando iniciará el backend (usando `mvnw.cmd spring-boot:run`) y el servidor de desarrollo de Vite en la misma terminal.*

### Opción 2: Ejecución Independiente (Por Separado)

Si prefieres ejecutar y ver los logs de cada proyecto en terminales separadas, sigue estos pasos:

#### 1. Iniciar el Backend
1. Abre una terminal.
2. Navega al directorio del backend:
   ```bash
   cd backend
   ```
3. Ejecuta la aplicación usando el Maven Wrapper incluido:
   - **En Windows:**
     ```cmd
     mvnw.cmd spring-boot:run
     ```
   - **En Linux/Mac:**
     ```bash
     ./mvnw spring-boot:run
     ```
4. El backend se iniciará, por lo general, en `http://localhost:8080`.
5. La documentación de la API (Swagger UI) suele estar disponible en `http://localhost:8080/swagger-ui.html`.

#### 2. Iniciar el Frontend
1. Abre una nueva terminal.
2. Navega al directorio del frontend:
   ```bash
   cd frontend
   ```
3. Instala las dependencias de Node (solo la primera vez o si hubo cambios):
   ```bash
   npm install
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
5. La terminal mostrará una dirección local (por ejemplo, `http://localhost:5173/`). Abre esta URL en tu navegador web para ver la aplicación.
