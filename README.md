# Aplicación móvil para gestión, comunicación y monitoreo de adultos mayores de San Rafael, Mendoza

## Herramientas Necesarias
- **Node.js:** Asegúrate de tener Node.js instalado en tu sistema. Se utiliza para ejecutar el entorno de desarrollo y administrar las dependencias del proyecto.
- **Gestor de Paquetes (npm o Yarn):** Se necesitará un gestor de paquetes como npm o Yarn para instalar las dependencias del proyecto.
- **Expo CLI o React Native CLI:** Si estás utilizando Expo para el desarrollo, asegúrate de tener instalado Expo CLI. Si no estás usando Expo, necesitarás React Native CLI para ejecutar la aplicación.

## Instalación
Sigue estos pasos para instalar todas las dependencias necesarias para ejecutar el proyecto:
1. Clona el repositorio: `https://drive.google.com/drive/folders/113M5I5d-gHTgzQfAjldBnII1YHGveWvm?usp=sharing`
2. Navega a la carpeta del proyecto: `cd AppMovil`
3. Instala las dependencias: `npm install`

## Uso
Para ejecutar la aplicación y acceder a sus funcionalidades principales, utiliza el siguiente comando:
npm start

## Estructura del Proyecto
El proyecto sigue la siguiente estructura de archivos y carpetas:
- `/src`: Contiene los archivos fuente.
- `/navigation`: Configuración de navegación.
- `/screens`: Pantallas de la aplicación.
- `/components`: Componentes reutilizables.
- `App.js`: Archivo principal que inicia la aplicación y contiene el componente principal renderizado por React Native.

## Dependencias Principales
Principales bibliotecas y herramientas utilizadas en el proyecto:
- React Native
- Node.js
- JavaScript
- JSON
- Expo

## Base de Datos y Configuración
El proyecto utiliza una base de datos MySQL para almacenar información crítica. Sigue estos pasos para configurar la base de datos y la estructura de las tablas necesarias:
1. Instala MySQL si no lo tienes instalado.
2. Configura el usuario y contraseña: Usuario: root, Contraseña: 1234.
3. Crea la base de datos `db_mayoresapp` con el siguiente comando SQL:
CREATE DATABASE IF NOT EXISTS db_mayoresapp;
USE db_mayoresapp;
4. Abre el archivo con el script y ejecútalo para crear las tablas necesarias.

## Servidor Express
El proyecto emplea un servidor Express como el núcleo del backend para la aplicación móvil. Este servidor se conecta a una base de datos MySQL y proporciona puntos finales para la gestión de usuarios y otras funcionalidades esenciales.

### Requisitos Previos
Asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu sistema para ejecutar el servidor.

### Configuración del Servidor
Sigue estos pasos para ejecutar el servidor:
1. Abre la terminal en la carpeta `nombre-proyecto completo-servidor`.
2. Instala las dependencias ejecutando: `npm install`.
3. Ejecuta el servidor con el siguiente comando: `node index.js`.
4. El servidor se iniciará en el puerto `3000`.

### Puntos Finales
El servidor ofrece los siguientes puntos finales:
- `GET /registrationrequests`: Obtiene todas las solicitudes de registro.
- `GET /registrationrequest`: Obtiene una solicitud de registro por ID y contraseña.
- `POST /register`: Registra un nuevo usuario con la información proporcionada.

