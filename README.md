# 🩸 Blood Bank Management System

A full-stack web application designed to streamline blood donation, tracking, and allocation across donors, NGOs, hospitals, and administrators.

## 🌐 Live Demo

🔗 https://66b618cc3f40816725a8ee06--zesty-pegasus-45f599.netlify.app/login

## 📦 Repositories

- **Frontend:** https://github.com/Akshar22Dubey/Blood_Bank_FrontEnd.git  
- **Backend:** https://github.com/Akshar22Dubey/Blood_Bank_BackEnd.git

## ⚙️ Tech Stack

### Frontend
- React.js
- Axios for API integration
- React Router for navigation

### Backend
- Node.js, Express.js
- MongoDB with Mongoose
- JSON Web Token (JWT) for authentication
- Bcrypt for password hashing
- CORS, dotenv, and middleware handling

### Deployment
- Frontend: Netlify
- Backend: Render

## 🔐 Roles & Features

- **Donor:** Can register, login, and donate blood
- **NGO/Hospital:** View and manage available blood groups
- **Admin:** Manage users and system-wide operations
- **Authentication:** Role-based login and secured API endpoints
- **Real-time blood availability updates**

## 📁 Project Structure

### Frontend
```
Blood_Bank_FrontEnd/
├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── App.js
├── public/
└── package.json
```

### Backend
```
Blood_Bank_BackEnd/
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
├── server.js
└── .env
```

## 🚀 Getting Started Locally

### Clone Both Repos
```bash
git clone https://github.com/Akshar22Dubey/Blood_Bank_BackEnd.git
git clone https://github.com/Akshar22Dubey/Blood_Bank_FrontEnd.git
```

### Backend Setup
```bash
cd Blood_Bank_BackEnd
npm install
# Create .env file with:
# MONGO_URI=<your-mongodb-uri>
# JWT_SECRET=<your-secret>
npm start
```

### Frontend Setup
```bash
cd Blood_Bank_FrontEnd
npm install
npm start
```

Visit `http://localhost:3000` to use the app locally.
