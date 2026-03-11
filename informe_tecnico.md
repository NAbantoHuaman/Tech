# Informe Técnico del Proyecto - Sistema de Soporte Técnico

## 1. Descripción del Proyecto

El proyecto consiste en el desarrollo del backend para un **Sistema de Gestión de Soporte Técnico**. Su objetivo principal es permitir el registro y seguimiento eficiente de las solicitudes de soporte de los clientes. La aplicación expone una API RESTful que permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las solicitudes de soporte.

Para garantizar tiempos de respuesta rápidos y simplificar la arquitectura en esta fase, la persistencia de datos se ha implementado utilizando estructuras de datos en memoria (específicamente, colecciones recurrentes provistas por Java como `ConcurrentHashMap`), en lugar de una base de datos relacional tradicional. El sistema aplica las mejores prácticas de la arquitectura en capas, separando claramente las responsabilidades, y utiliza una validación estricta de datos de entrada.

### 1.1 Tecnologías Clave y Optimizaciones
Para llevar el código a los más altos estándares de calidad de la industria, hemos integrado dos herramientas fundamentales:
*   **Lombok:** Se implementó para eliminar el código repetitivo (*boilerplate*). Mediante el uso de anotaciones como `@Data`, `@NoArgsConstructor`, `@AllArgsConstructor` y `@RequiredArgsConstructor`, logramos generar automáticamente getters, setters y constructores, resultando en un código Java mucho más limpio, fácil de leer y libre de métodos redundantes.
*   **Swagger / OpenAPI 3.0:** Hemos asegurado que la API esté adecuadamente documentada instalando Springdoc OpenAPI. Mediante anotaciones en nuestros controladores (como `@Operation` y `@ApiResponse`), el sistema genera automáticamente un contrato interactivo en la ruta `/swagger-ui.html`. Esta interfaz permite a la capa Frontend entender el formato exacto de los JSON que debe enviar o recibir, además de brindar un entorno en tiempo real para hacer pruebas directamente desde el navegador, asegurando cero fricción entre el backend y los clientes.
## 2. Enlace del Repositorio en GitHub

El código fuente del proyecto se encuentra alojado en el siguiente repositorio de GitHub, al cual se le ha otorgado acceso de lectura al docente para su respectiva evaluación:

**Enlace del Repositorio:** https://github.com/NAbantoHuaman/Tech.git

## 3. Explicación de la Estructura General del Código

El proyecto está desarrollado en **Java con Spring Boot** y sigue el patrón de diseño **MVC (Modelo-Vista-Controlador)**. Para que el proyecto sea fácil de mantener y entender, hemos dividido el código en distintas carpetas (paquetes), donde cada una tiene un trabajo específico, como en una cadena de montaje:

- **`config` (Configuraciones):** Es como el recepcionista del edificio. Aquí definimos las reglas de quién puede entrar a hablar con nuestra aplicación. Por ejemplo, autorizamos que nuestro sistema Frontend pueda conectarse sin que el navegador lo bloquee (CORS).
- **`controller` (Controladores):** Son los "meseros" de nuestra API. Su único trabajo es tomar la "orden" (la petición HTTP del cliente como GET o POST), llevársela al área encargada de procesarla (el Service), y luego devolverle el "platillo" (la respuesta, como un código 200 OK) al cliente.
- **`dto` (Data Transfer Objects):** Son como unas "cajas de envío" seguras. En lugar de exponer directamente nuestros datos internos (Modelos) a internet, usamos estas cajas para transportar solo la información necesaria entre el frontend y el backend de forma segura y validada.
- **`model` (Modelos / Entidades):** Es el corazón de nuestros datos. Aquí definimos cómo lucen los "objetos" en la vida real. Por ejemplo, aquí establecemos que una `Solicitud` debe tener un `Cliente`, un estado y una descripción.
- **`service` (Servicios):** Es la "cocina" o el "cerebro" de la operación. Aquí ocurre toda la lógica importante. El controlador le entrega los datos, y el servicio se encarga de procesarlos, hacer cálculos (como ponerle la fecha de hoy a una solicitud nueva) y decidir qué hacer con ellos.
- **`repository` (Repositorios):** Es nuestro archivo o "bóveda". Es la capa que interactúa directamente para guardar o buscar datos. Como no usamos una base de datos externa, aquí implementamos un mapa en memoria (`ConcurrentHashMap`) que guarda la información mientras el servidor esté encendido.
- **`exception` (Manejo de Excepciones):** Es nuestro sistema de "bomberos". Si algo sale mal en cualquier punto de la aplicación (por ejemplo, si buscan un ticket que no existe), esta capa apaga el incendio y devuelve un mensaje de error limpio y amigable en lugar de mostrar los temibles errores rojos de Java.
- **`util` (Utilidades):** Aquí guardamos herramientas de uso general. Por ejemplo, nuestro `SolicitudMapper`, que es una herramienta que nos ayuda a traducir los objetos de nuestro `Model` interno hacia las cajas seguras `DTO` para poder enviarlas.

## 4. Roles del Equipo en el Desarrollo del Proyecto

Durante el desarrollo del proyecto, el equipo de trabajo se dividió de acuerdo a las siguientes responsabilidades para asegurar un flujo de trabajo ágil y de calidad:

- **Nestor Jose Abanto Huaman - Arquitecto y Líder Backend:** Encargado del diseño de la estructura en capas del proyecto, configuración de Spring Boot, implementación de la capa de Servicios (`service`) y configuración global (`config`).
- **Elmo Gilberto Torres Ordoñez - Desarrollador de API y Calidad:** Responsable de la creación de los endpoints REST en la capa `controller`, definición de validaciones y de realizar las pruebas exhaustivas de la API utilizando Postman para asegurar la integridad de los JSON.
- **Yaro Leguia Joel - Desarrollador de Persistencia:** Encargado de implementar la lógica de almacenamiento en memoria `ConcurrentHashMap`, la capa de Repositorios, el Manejo Global de Excepciones y el mapeo de objetos (`util`).

## 5. Capturas de las Pruebas Realizadas con Postman

A continuación, se presentan las evidencias del correcto funcionamiento de todos los endpoints de nuestra API, validados a través de la herramienta Postman:

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
