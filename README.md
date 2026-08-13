# Administrador de Proyectos para Empresas

Sistema web para la gestión de empresas, empleados y proyectos, desarrollado como un escenario práctico para implementar y representar diferentes reglas y procesos de lógica de negocio.

El sistema permite administrar empresas, empleados, usuarios y proyectos, incluyendo la asignación de empleados a proyectos y el control de diferentes estados durante el ciclo de vida de un proyecto.

El proyecto está planteado como una base para futuras funcionalidades relacionadas con la gestión y asignación de tareas.

---

## Características

### Autenticación y usuarios

* Inicio de sesión.
* Registro de usuarios.
* Gestión básica de usuarios.

### Gestión de empresas

* Registrar empresas.
* Consultar empresas.
* Mostrar todas las empresas.
* Actualizar información de empresas.
* Eliminar empresas.

### Gestión de empleados

* Registrar empleados.
* Mostrar todos los empleados.
* Consultar información de empleados.
* Actualizar empleados.
* Eliminar empleados.
* Consultar información adicional de empleados.
* Actualizar horas trabajadas.
* Consultar profesiones.

### Gestión de proyectos

* Registrar proyectos.
* Mostrar todos los proyectos.
* Consultar información de proyectos.
* Asociar empleados a proyectos.
* Eliminar empleados asociados.
* Comenzar proyectos.
* Terminar proyectos.
* Cancelar proyectos.

---

## Tecnologías utilizadas

### Frontend

El frontend fue desarrollado utilizando:

* Next.js 15
* React 19
* TypeScript
* Tailwind CSS 4
* Framer Motion
* Lucide React
* tsParticles
* @hello-pangea/dnd
* React Type Animation

El frontend se encarga de la interfaz de usuario, navegación, formularios, visualización de información y comunicación con la API del backend.

### Backend

El backend fue desarrollado utilizando:

* Python
* Flask
* MySQL Connector
* PyODBC
* Flask-CORS
* Werkzeug

El backend se encuentra dentro de la carpeta `backend/` y utiliza el archivo `app.py` como punto principal de la aplicación.

El archivo `app.py` funciona como una API desarrollada con Flask y contiene las funciones necesarias para procesar las solicitudes del frontend, aplicar la lógica correspondiente y comunicarse con la base de datos.

### Base de datos

* MySQL

En la raíz del proyecto se encuentra el archivo `proyectos.sql`, que contiene la estructura y los datos necesarios para configurar la base de datos utilizada por el sistema.

---

## Arquitectura

La aplicación utiliza una arquitectura separada en tres componentes principales:

```text
Frontend
Next.js + React
       │
       │ HTTP / API
       ▼
Backend
Flask - app.py
       │
       │ SQL
       ▼
Base de datos
MySQL
```


---

# Instalación

## 1. Clonar el repositorio


Ingresar al proyecto:

# Configuración del Frontend

El frontend utiliza Next.js, React y TypeScript.

### Instalar dependencias

Desde la raíz del proyecto:

```bash
npm install
```

### Ejecutar el proyecto

```bash
npm run dev
```

El frontend estará disponible normalmente en:

```text
http://localhost:3000
```

---

# Configuración del Backend

El backend se encuentra en:

```text
backend/app.py
```

El archivo `app.py` contiene la API desarrollada con Flask y las funciones encargadas de procesar las operaciones del sistema.

### 1. Entrar a la carpeta backend

Desde la raíz del proyecto:

```bash
cd backend
```

### 3. Ejecutar el backend

```bash
python app.py
```

La API estará disponible en el localhost:5000 configurados dentro de `app.py`.

---

# Configuración de la base de datos

El proyecto utiliza MySQL como sistema gestor de base de datos.

En la raíz del proyecto se encuentra:

```text
proyectos.sql
```

Este archivo contiene la estructura y la información necesaria para configurar la base de datos.

## Importar la base de datos

El archivo puede importarse utilizando herramientas como:

* MySQL Workbench
* phpMyAdmin
* HeidiSQL
* MySQL CLI




---

# Principales operaciones

El backend implementa diferentes operaciones relacionadas con la lógica de negocio del sistema:

### Usuarios

```text
registrar_usuario
```

### Empresas

```text
registrar_empresa
mostrar_todo_empresas
Consultar_empresa
Actualizar_empresa
eliminar_empresa
```

### Empleados

```text
registrar_empleado
mostrar_todo_empleados
mostrar_todo_profesiones
mas_info_empleados
consular_empleado
Actualizar_empleado
Actualizar_horas
eliminar_empleado
```

### Proyectos

```text
registrar_proyecto
mostrar_todo_proyectos
proyectos
registrar_asosiados
eliminar_empleado_asosiado
Comenzar_proyecto
Terminar_proyecto
Cancelar_proyecto
```

Estas operaciones permiten representar diferentes escenarios relacionados con la administración de empresas, empleados y proyectos.

---

# Objetivo del proyecto

El objetivo principal es plantear un escenario de lógica de negocio empresarial mediante un sistema que permita gestionar diferentes entidades y las relaciones existentes entre ellas.

El proyecto busca aplicar conceptos de desarrollo de software como:

* Operaciones CRUD.
* Relaciones entre entidades.
* Diseño y utilización de bases de datos relacionales.
* Desarrollo de APIs.
* Comunicación entre frontend y backend.
* Gestión de estados de proyectos.
* Asociación de empleados a proyectos.
* Control de horas trabajadas.
* Implementación de procesos básicos de negocio.

El sistema está planteado como una base sobre la cual se pueden agregar funcionalidades más complejas.

---

# Futuras funcionalidades

Entre las funcionalidades que se pueden incorporar posteriormente se encuentran:

* [ ] Gestión de tareas.
* [ ] Asignación de tareas a empleados.
* [ ] Seguimiento del progreso de proyectos.
* [ ] Control avanzado de horas trabajadas.
* [ ] Roles y permisos de usuarios.
* [ ] Dashboard con estadísticas.
* [ ] Reportes de proyectos.
* [ ] Sistema de notificaciones.
* [ ] Validaciones y reglas de negocio más avanzadas.
* [ ] Documentación de la API.

---

# Autor

Nicolás Arrieta

Ingeniero de Sistemas | Software Developer

GitHub: [nicolas-arrieta-dev](https://github.com/nicolas-arrieta-dev)

Este proyecto fue desarrollado con fines educativos y como proyecto de demostración para aplicar conceptos de desarrollo web, APIs, bases de datos y lógica de negocio.
---

# Licencia

Este proyecto fue desarrollado con fines educativos y como proyecto de demostración para aplicar conceptos de desarrollo web, APIs, bases de datos y lógica de negocio.
