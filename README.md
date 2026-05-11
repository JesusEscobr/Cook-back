# Cook.io 🍴

App web de reseñas de restaurantes — **frontend + backend integrados**.

## Estructura del proyecto

```
cookio-app/
├── backend/
│   ├── config/db.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js          ← sirve la API y el frontend
├── frontend/
│   ├── index.html         ← app completa (conectada a la API)
│   ├── Estilos.css
│   └── img/
├── package.json
└── .env                   ← crea este archivo (ver abajo)
```

## Configuración

### 1. Variables de entorno
Crea un archivo `.env` en la raíz del proyecto:
```
PORT=5000
MONGO_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/cookio
JWT_SECRET=una_cadena_secreta_larga
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar
```bash
# Producción
npm start

# Desarrollo (con auto-reload)
npm run dev
```

La app queda disponible en: **http://localhost:5000**

## API Endpoints

| Método | Ruta                  | Auth | Descripción              |
|--------|-----------------------|------|--------------------------|
| POST   | /api/users/register   | No   | Registrar usuario        |
| POST   | /api/users/login      | No   | Iniciar sesión           |
| GET    | /api/users/data       | Sí   | Datos del usuario actual |
| POST   | /api/users/delete     | Sí   | Eliminar cuenta          |
| GET    | /api/resenas          | No   | Obtener todas las reseñas|
| POST   | /api/resenas          | Sí   | Crear reseña             |
| PUT    | /api/resenas/:id      | Sí   | Editar reseña propia     |
| DELETE | /api/resenas/:id      | Sí   | Eliminar reseña propia   |

## Funcionalidades del frontend

- ✅ Ver todas las reseñas sin estar logueado
- ✅ Registro e inicio de sesión
- ✅ Publicar reseñas (requiere sesión)
- ✅ Editar y eliminar tus propias reseñas
- ✅ Perfil de usuario y cierre de sesión
- ✅ Eliminación de cuenta
- ✅ Sesión persistente con localStorage
