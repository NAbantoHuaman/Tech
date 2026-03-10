# Informe Técnico del Proyecto - Sistema de Soporte Técnico

## 1. Descripción del Proyecto

El proyecto consiste en el desarrollo del backend para un **Sistema de Gestión de Soporte Técnico**. Su objetivo principal es permitir el registro y seguimiento eficiente de las solicitudes de soporte de los clientes. La aplicación expone una API RESTful que permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las solicitudes de soporte.

Para garantizar tiempos de respuesta rápidos y simplificar la arquitectura en esta fase, la persistencia de datos se ha implementado utilizando estructuras de datos en memoria (específicamente, colecciones recurrentes provistas por Java como `ConcurrentHashMap`), en lugar de una base de datos relacional tradicional. El sistema aplica las mejores prácticas de la arquitectura en capas, separando claramente las responsabilidades, y utiliza una validación estricta de datos de entrada.

## 2. Enlace del Repositorio en GitHub

El código fuente del proyecto se encuentra alojado en el siguiente repositorio de GitHub, al cual se le ha otorgado acceso de lectura al docente para su respectiva evaluación:

**Enlace del Repositorio:** `[INSERTE AQUÍ EL ENLACE A SU REPOSITORIO DE GITHUB]`


## 3. Explicación de la Estructura General del Código

El proyecto está desarrollado en **Java con Spring Boot** y sigue estrictamente el patrón de diseño **MVC (Model-View-Controller)** adaptado para APIs REST. El código fuente está organizado en los siguientes paquetes principales, cada uno con una responsabilidad única y bien definida:

- **`config` (Configuraciones):** Contiene la configuración global de la aplicación (WebConfig), gestionando aspectos como los permisos CORS para permitir la comunicación segura con el frontend.
- **`controller` (Controladores):** Es la capa de entrada de la API. Excepcionalmente responsable de manejar las peticiones HTTP (`GET`, `POST`, `PUT`, `DELETE`), enrutar la solicitud al servicio adecuado y devolver la respuesta con el código de estado HTTP correspondiente (ej. 200 OK, 201 Created). Ejemplo: `SolicitudController.java`.
- **`dto` (Data Transfer Objects):** Objetos utilizados exclusivamente para transportar datos entre el cliente y el servidor. Se dividen en `RequestDTO` (datos de entrada, con validaciones como `@NotBlank` y `@NotNull`) y `ResponseDTO` (datos de salida, incluyendo IDs y fechas generadas por el sistema). Esto protege los modelos internos y proporciona seguridad a la API.
- **`model` (Modelos / Entidades):** Representan el dominio del negocio real. Clases como `Solicitud`, `Cliente`, y `Tecnico` estructuran la información a nivel interno (POJOs transparentes sin acoplamiento a frameworks de base de datos).
- **`service` (Servicios):** Contiene la **Lógica de Negocio** central. Aquí se toman decisiones, se asignan valores automáticos (como la fecha de creación) y se orquesta el flujo entre el controlador y el repositorio.
- **`repository` (Repositorios):** Capa de **Acceso a Datos**. Implementa la persistencia en memoria utilizando un `ConcurrentHashMap` para almacenar los registros de forma "Thread-Safe" (segura en entornos multihilo) y un `AtomicLong` para la generación automática de IDs.
- **`exception` (Manejo de Excepciones):** Captura los errores de ejecución a nivel global (`GlobalExceptionHandler`) para devolver mensajes en formato JSON limpios y consistentes en lugar de trazas de error brutas de Java (StackTrace).
- **`util` (Utilidades):** Contiene clases de soporte, como `SolicitudMapper`, encargado de la transformación de objetos `Model` a `DTO` y viceversa, separando la lógica de mapeo del resto funcional.

## 4. Roles del Equipo en el Desarrollo del Proyecto

Durante el desarrollo del proyecto, el equipo de trabajo se dividió de acuerdo a las siguientes responsabilidades para asegurar un flujo de trabajo ágil y de calidad:


- **Nestor Jose Abanto Huaman - Arquitecto y Líder Backend:** Encargado del diseño de la estructura en capas del proyecto, configuración de Spring Boot, implementación de la capa de Servicios (`service`) y configuración global (`config`).
- **Elmo Gilberto Torres Ordoñez - Desarrollador de API y Calidad:** Responsable de la creación de los endpoints REST en la capa `controller`, definición de validaciones y de realizar las pruebas exhaustivas de la API utilizando Postman para asegurar la integridad de los JSON.
- **Yaro Leguia Joel - Desarrollador de Persistencia:** Encargado de implementar la lógica de almacenamiento en memoria `ConcurrentHashMap`, la capa de Repositorios, el Manejo Global de Excepciones y el mapeo de objetos (`util`).

## 5. Capturas de las Pruebas Realizadas con Postman

A continuación, se presentan las evidencias del correcto funcionamiento de todos los endpoints de nuestra API, validados a través de la herramienta Postman:

_(Debe reemplazar los textos y corchetes por las imágenes reales de sus capturas de pantalla de Postman)_

### 5.1. Prueba: Crear nueva Solicitud de Soporte (POST)

**Endpoint:** `POST /api/solicitudes`
**Descripción:** Se envía un JSON válido y el servidor responde con un código `201 Created` y el objeto creado (incluyendo ID y fecha).

![alt text](<Captura de pantalla 2026-03-09 194428.png>)

### 5.2. Prueba: Listar todas las Solicitudes (GET)

**Endpoint:** `GET /api/solicitudes` (o `/api/solicitudes/{id}`)
**Descripción:** La API nos devuelve todas las solicitudes actualmente guardadas en el `ConcurrentHashMap` con un código `200 OK`.

![alt text](<Captura de pantalla 2026-03-09 194515.png>)

### 5.3. Prueba: Actualizar Solicitud (PUT)

**Endpoint:** `PUT /api/solicitudes/{id}`
**Descripción:** Se actualiza una solicitud existente modificando su estado (ej. de PENDIENTE a EN_PROCESO) y agregándole los datos del Técnico Asignado. El servidor responde con código `200 OK` y el ID autogenerado del técnico.

![alt text](<Captura de pantalla 2026-03-09 194600.png>)

### 5.4. Prueba: Eliminar Solicitud (DELETE)

**Endpoint:** `DELETE /api/solicitudes/{id}`
**Descripción:** Se remueve completamente un ticket de memoria. Al solicitar de nuevo la lista (GET), este registro ya no existirá.

![alt text](<Captura de pantalla 2026-03-09 194706.png>)
