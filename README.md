# 🧠 Task Manager Microservices

Микросервисное backend-приложение для управления пользователями и заметками, построенное на Node.js + TypeScript с использованием API Gateway, PostgreSQL, Redis и Docker.

---

# 🚀 Архитектура проекта

```text
Client
   ↓
API Gateway
   ↓
──────────────────────────
│                        │
Identity Service     Notes Service
│                        │
PostgreSQL             PostgreSQL
│
Redis
```

---

# 🛠 Стек технологий

## Backend

* Node.js
* Express
* TypeScript

## Database & Cache

* PostgreSQL
* Redis

## DevOps

* Docker
* Docker Compose

## Authentication

* JWT Access Token
* Refresh Token Rotation
* httpOnly Cookies
* Token Versioning
* Logout Everywhere

---

# 📦 Сервисы

## 🔐 identity-service

Сервис аутентификации и управления пользователями.

### Возможности

* регистрация
* логин
* refresh token
* JWT авторизация
* role-based access
* soft delete пользователей
* восстановление пользователя
* rate limiting
* token version rotation

### Основные маршруты

```http
POST /auth/register
POST /auth/login
POST /auth/refresh

GET /users
DELETE /users/:id
POST /users/recover/:id
```

---

## 📝 notes-service

Сервис управления заметками.

### Возможности

* CRUD заметок
* заметки пользователей
* admin endpoints
* internal service-to-service endpoints
* soft delete / recovery

### Основные маршруты

```http
GET /notes
GET /notes/:id

POST /notes
PUT /notes/:id
DELETE /notes/:id

GET /notes/getAllUsersNotes
```

### Internal endpoints

```http
POST /internal/notes/delete-by-user
POST /internal/notes/recover-by-user
```

---

## 🌐 api-gateway

Единая точка входа для клиента.

### Что делает gateway

* проксирует запросы
* скрывает внутренние сервисы
* передает JWT и cookies
* объединяет API
* изолирует сервисы от клиента

---

# 🐳 Docker

Все сервисы запускаются в контейнерах через Docker Compose.

## Контейнеры

```text
api_gateway
identity_service
notes_service
task_manager_postgres
task_manager_redis
```

---

# ⚙️ Запуск проекта

## 1. Клонирование репозитория

```bash
git clone <repo_url>
cd task-manager
```

---

## 2. Запуск Docker

```bash
docker compose up --build
```

---

# 🌍 Доступные сервисы

| Сервис      | URL                   |
| ----------- | --------------------- |
| API Gateway | http://localhost:3000 |
| PostgreSQL  | localhost:5432        |
| Redis       | localhost:6379        |

---

# 🔑 ENV переменные

## identity-service

```env
PORT=3000

ACCESS_TOKEN_SECRET=secretaccess
REFRESH_TOKEN_SECRET=secretrefresh

DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=postgres
DB_PORT=5432
DB_NAME=identity_db

REDIS_HOST=redis
REDIS_PORT=6379
```

---

## notes-service

```env
PORT=3000

ACCESS_TOKEN_SECRET=secretaccess

DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=postgres
DB_PORT=5432
DB_NAME=notes_db

REDIS_HOST=redis
REDIS_PORT=6379
```

---

## api-gateway

```env
PORT=3000
```

---

# 🔐 Авторизация

Проект использует:

* JWT Access Token
* Refresh Token
* httpOnly cookies
* token rotation
* token version invalidation

---

# 🧪 Тестирование

Для тестирования использовался Postman.

### Коллекции

* auth
* users
* notes

---

# 📌 Особенности проекта

## ✔ Микросервисная архитектура

Сервисы изолированы и взаимодействуют через HTTP.

## ✔ API Gateway

Клиент работает только с gateway.

## ✔ Dockerized environment

Полностью контейнеризированное окружение.

## ✔ Redis integration

Используется для хранения refresh token и rate limiting.

## ✔ Soft Delete

Пользователи и заметки могут быть восстановлены.

## ✔ Internal APIs

Реализованы internal endpoints для взаимодействия сервисов.
