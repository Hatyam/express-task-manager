# 🧠 Task Manager API

REST API для управления пользователями и заметками с авторизацией, refresh-токенами и системой ролей.

Проект полностью реализован на TypeScript и построен по слоистой архитектуре:
**controllers → services → repositories**

---

## 🚀 Функциональность

* 🔐 Регистрация и авторизация пользователей (JWT)
* ♻️ Refresh токены с хранением в БД (hash + rotation)
* 🚫 Инвалидация токенов через `token_version`
* 🔎 Детект повторного использования refresh-токена (re-use detection)
* 📝 CRUD для заметок
* 👥 Ролевая модель (user / admin)
* 🔒 Ownership (доступ только к своим данным)
* 🗑 Soft delete пользователей и заметок
* 🔎 Поиск и пагинация заметок
* ⚡ Rate limiting (Redis)
* 🛡 Middleware для авторизации и прав доступа

---

## 🏗 Архитектура

```id="9n2v6m"
src/
 ├── controllers/
 ├── services/
 ├── repositories/
 ├── middlewares/
 ├── routes/
 ├── types/
 ├── db/
```

---

## 🧰 Технологии

* Node.js
* Express
* TypeScript
* PostgreSQL
* Redis
* JWT
* bcrypt

---

## ⚙️ Установка

```bash id="p9jw6g"
git clone <repo_url>
cd task-manager
npm install
```

---

## 🔑 Переменные окружения

```env id="0w5x4w"
PORT=5000

ACCESS_TOKEN_SECRET=your_secret

DB_USER=your_user
DB_HOST=localhost
DB_NAME=task_manager
DB_PORT=5432

REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

---

## ▶️ Запуск

### Development

```bash id="r4i6pn"
npm run dev
```

### Production

```bash id="fq2dpk"
npm run build
npm start
```

---

## 📡 Основные эндпоинты

### Auth

* `POST /auth/register`
* `POST /auth/login`
* `POST /auth/refresh`

---

### Notes

* `GET /notes`
* `GET /notes/:id`
* `POST /notes`
* `PUT /notes/:id`
* `DELETE /notes/:id`

---

### Users (admin only)

* `GET /users`
* `DELETE /users/:id`
* `POST /users/recoverUser/:id`

---

## 🔐 Авторизация

```id="v3l2ka"
Authorization: Bearer <access_token>
```

Refresh токен хранится в httpOnly cookie.

---

## 🧠 Особенности реализации

* Access token содержит `token_version` → позволяет инвалидировать все токены пользователя
* Refresh токены хранятся в БД в виде hash
* Реализован механизм **refresh token rotation**
* Детект повторного использования refresh токена:

  * если старый refresh токен используется повторно → все токены пользователя инвалидируются
* Ownership проверяется на уровне сервисов (`user_id`)
* Rate limiting реализован через Redis (IP + IP/email)
* Middleware расширяет `Request` (`req.user`)

---

## 👨‍💻 Автор

Bogdan Denisev
