# Sistema de Inventario – Proyecto Final Prog3

Este proyecto es una aplicación web para la gestión básica de inventario de productos.  
Está orientada a pequeños negocios y permite controlar productos, stock, categorías y movimientos de inventario.

---

## Tecnologías utilizadas

### Backend
- Node.js
- Express
- Sequelize (ORM)
- PostgreSQL
- Docker

### Frontend
- React
- React Router
- Tailwind CSS
- React Hook Form
- Axios
- React Hot Toast

### Infraestructura
- Docker Compose
- PgAdmin
- Redis (cache para futura extensión)

---

## Funcionalidades principales

- Gestión completa de productos (CRUD)
- Gestión de categorías (CRUD)
- Registro de movimientos de stock (entradas y salidas)
- Control visual de stock total
- Indicador de productos con poco stock
- Panel de control con resúmenes e indicadores
- Navegación fluida con React Router
- Validaciones con mensajes y toasts

---

## Requisitos para ejecutar

- Docker + Docker Compose
- Puerto libre 3000 (frontend), 3001 (backend), 5432 (PostgreSQL), 5050 (PgAdmin)

---

## Instrucciones para ejecutar el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/lucianoParrotta/Proyecto-Final-Prog3-main.git
cd Proyecto-Final-Prog3-main
```

### 2. Iniciar todos los servicios

```bash
docker-compose up --build
```

Esto inicia:

- PostgreSQL
- Backend (http://localhost:3001)
- Frontend (http://localhost:3000)
- PgAdmin (http://localhost:5050)

> **Usuario PgAdmin:** admin@admin.com  
> **Contraseña:** admin

> **Usuario DB:** postgres  
> **Contraseña DB:** postgres  
> **Puerto DB:** 5432  
> **Base de datos:** inventario_db

---

## Autor

**Luciano Parrotta**  
