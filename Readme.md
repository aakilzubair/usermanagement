# Mini User Management System

A full-stack **User Management System** developed as part of the **Backend Developer Intern Assessment** for **Purple Merit Technologies**.  
The application supports secure user authentication, role-based access control (RBAC), and user lifecycle management with a clean backend architecture and responsive frontend UI.

---

## 📌 Project Overview & Purpose

This project demonstrates practical implementation of:
- Authentication & authorization flows
- Role-based access control (Admin / User)
- Secure API design
- Clean backend architecture
- Frontend integration with protected routes
- Cloud deployment

The system allows **admins** to manage users and **users** to manage their own profiles securely.

---

## 🌐 Live Deployment Links

- **Frontend (Vercel)**  
  👉 https://usermanagement-jet.vercel.app/

- **Backend API (Render)**  
  👉 https://usermanagement-yhog.onrender.com

- **GitHub Repository**  
  👉 https://github.com/aakilzubair/usermanagement

---

## 🛠️ Tech Stack Used

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt (password hashing)
- CORS
- dotenv

### Frontend
- React (Vite)
- React Hooks
- Axios
- Context API (Auth handling)
- Tailwind CSS

### Deployment
- Backend: Render
- Frontend: Vercel
- Database: MongoDB Atlas

---

## ✨ Core Features

### Authentication
- User signup with full name, email, password
- Email format validation
- Password strength validation
- JWT token generation on signup & login
- Secure login & logout
- Get current logged-in user details

### Role-Based Access Control (RBAC)
- Admin and User roles
- Protected routes
- Admin-only endpoints restricted to admins

### Admin Functions
- View all users (with pagination)
- Activate user accounts
- Deactivate user accounts

### User Functions
- View own profile
- Update full name and email
- Change password securely

### Security
- Password hashing using bcrypt
- JWT-protected APIs
- Environment variables for secrets
- Proper HTTP status codes
- Consistent error responses

---

## 📂 Project Structure

usermanagement/
│
├── backend/
│ ├── src/
│ │ ├── config/
│ │ ├── controllers/
│ │ ├── middleware/
│ │ ├── routes/
│ │ └── server.js
│ ├── package.json
│ └── .env (ignored)
│
├── frontend/
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── vite.config.js
│
└── README.md


---

## 🔐 Environment Variables

### Backend (`backend/.env`)


PORT
MONGO_URI
JWT_SECRET


⚠️ **Sensitive values are excluded from GitHub using `.gitignore`.**

---

## 🚀 Setup Instructions (Local)

### 1️⃣ Clone Repository
```bash
git clone https://github.com/aakilzubair/usermanagement.git
cd usermanagement

2️⃣ Backend Setup
cd backend
npm install
npm start


Backend runs on:

http://localhost:3000

3️⃣ Frontend Setup
cd ../frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173

🔗 API Documentation (Sample)
Authentication Routes
POST   /api/auth/signup
POST   /api/auth/login
GET    /api/auth/me
POST   /api/auth/logout

Admin Routes
GET    /api/admin/users
PATCH  /api/admin/user/:id/activate
PATCH  /api/admin/user/:id/deactivate


All protected routes require a valid JWT token.

🧪 Testing

Backend APIs tested using Postman

Route protection verified with invalid/expired tokens

Frontend tested via browser & network inspection

🚢 Deployment Instructions
Backend (Render)

Connected GitHub repository

Root directory set to backend

Build command: npm install

Start command: npm start

Environment variables added via Render dashboard

Frontend (Vercel)

Connected GitHub repository

Root directory set to frontend

Environment variables configured in Vercel

👤 Author

Aakil Zubair
GitHub: https://github.com/aakilzubair

⭐ Acknowledgment

This project was built as part of the Backend Developer Intern Assessment for Purple Merit Technologies.


---

## ✅ How to add this README to GitHub (terminal)

From **repo root**:

```bash
touch README.md
nano README.md


