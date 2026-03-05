## Around Express API

# Descripción del Proyecto

**Around Express API** es un servidor backend desarrollado con Node.js y Express que simula una API REST para el proyecto "Alrededor de los EE. UU.".

Este proyecto permite:

- Obtener una lista de usuarios.
- Obtener una lista de tarjetas.
- Buscar un usuario específico por ID.
- Manejar errores personalizados (404 y 500).
- Implementar una estructura modular profesional separando rutas y datos.

Actualmente, los datos se almacenan en archivos JSON locales, permitiendo obtener los datos e información de nuestra carpeta data.

---

## 🚀 Funcionalidades

### 🔹 Obtener todos los usuarios

```
GET /users
```

Devuelve un arreglo JSON con todos los usuarios.

---

### 🔹 Obtener todas las tarjetas

```
GET /cards
```

Devuelve un arreglo JSON con todas las tarjetas.

---

### 🔹 Obtener usuario por ID

```
GET /users/:id
```

- Si el usuario existe → Devuelve el objeto del usuario.
- Si no existe → Devuelve:

```json
{
  "message": "ID de usuario no encontrado"
}
```

---

### 🔹 Manejo de rutas inexistentes

Cualquier ruta no definida devuelve:

```json
{
  "message": "Recurso solicitado no encontrado"
}
```

Con código de estado 404.

---

### 🔹 Manejo de errores internos (500)

Si ocurre un error al leer los archivos JSON, la API responde con:

```json
{
  "message": "Error interno del servidor"
}
```

---

## Estructura del Proyecto

```
web_project_around_express
│
├── data
│   ├── users.json
│   └── cards.json
│
├── routes
│   ├── users.js
│   └── cards.js
│
├── index.js
├── package.json
├── README.md
```

### 📂 Carpeta `data`

Contiene los archivos JSON que simulan una base de datos.

### 📂 Carpeta `routes`

Contiene los módulos responsables del enrutamiento utilizando `express.Router()`.

### 📄 index.js

Archivo principal que:

- Inicializa el servidor
- Configura middlewares
- Conecta las rutas
- Maneja errores 404 globales

---

## 🛠️ Tecnologías y Técnicas Utilizadas

- **Node.js** – Entorno de ejecución
- **Express.js** – Framework para crear el servidor
- **Nodemon** – Reinicio automático del servidor
- **fs (File System Module)** – Lectura de archivos JSON
- **path** – Manejo seguro de rutas entre sistemas operativos
- **express.Router()** – Modularización de rutas
- Manejo de errores HTTP (404 y 500)
- Arquitectura modular basada en separación de responsabilidades

---

## 🧠 Técnicas Aplicadas

- Separación de rutas en módulos independientes
- Uso de `fs.readFile()` para lectura dinámica de datos
- Uso de `path.join()` para evitar problemas entre sistemas operativos
- Manejo de errores personalizado
- Buenas prácticas en estructura de proyecto backend

---

## 🧪 Cómo Ejecutar el Proyecto

1. Clonar el repositorio:

```
git clone <url-del-repositorio>
```

2. Instalar dependencias:

```
npm install
```

3. Ejecutar el servidor:

```
npm run dev
```

El servidor correrá en:

```
http://localhost:3000
```

---

## 👨‍💻 Autor

Osvaldo Ochoa
Proyecto Sprint 16 – Backend Development
