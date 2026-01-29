# 📝 Todo List Application (React + Express)

A full-stack **Todo List application** built using **React (Vite)** for the frontend and **Node.js + Express + MongoDB** for the backend.

This project demonstrates:
- User authentication
- Protected APIs
- Full CRUD functionality

---

## 🚀 Tech Stack

### Frontend
- React 18
- Vite
- JavaScript (ES6+)
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt (password hashing)
- express-validator

---

## 📁 Project Structure

```bash
todo-app-react-express/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── validations/
│   │   ├── index.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
└── README.md


## ✅ Features

### 🔐 Authentication
- User registration
- User login
- Password hashing
- JWT-based authentication
- Protected routes

### 📝 Todo Management (CRUD)
- Create todo
- Read todos (user-specific)
- Update todo
- Delete todo
- Toggle completed status

---
```

## 🔗 API Endpoints

### Auth
| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |

### Todos (Protected)
| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/api/todos` | Create todo |
| GET | `/api/todos` | Get all todos |
| PUT | `/api/todos/:id` | Update todo |
| DELETE | `/api/todos/:id` | Delete todo |
| PATCH | `/api/todos/:id/toggle` | Toggle status |


---

## ▶️ Running the Project

### Backend
```bash
cd backend
npm install
npm run dev

Runs on:
http://localhost:3000

Frontend
cd frontend
npm install
npm run dev

Runs on:
http://localhost:5173


