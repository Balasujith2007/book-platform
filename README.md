# Book Platform - MERN Stack

A simple and professional book platform built with MongoDB, Express.js, React.js, and Node.js.

## Features

- User authentication (Login/Signup)
- Browse 50 books
- View book details
- Clean and responsive UI

## Project Structure

```
book-platform/
├── client/              # React frontend
│   ├── public/
│   ├── src/
│   │   ├── pages/      # Login, Signup, Home, Books, BookDetails
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── server/              # Express backend
│   ├── models/         # User, Book models
│   ├── routes/         # auth, books routes
│   ├── server.js
│   ├── seedBooks.js
│   └── package.json
└── README.md
```

## Installation

### 1. Install Dependencies

Backend:
```bash
cd server
npm install
```

Frontend:
```bash
cd client
npm install
```

### 2. Setup Environment Variables

Create `server/.env` file:
```
MONGODB_URI=mongodb://localhost:27017/bookplatform
JWT_SECRET=your_secret_key
PORT=5000
```

### 3. Seed Database

```bash
cd server
node seedBooks.js
```

### 4. Run Application

Backend (Terminal 1):
```bash
cd server
npm start
```

Frontend (Terminal 2):
```bash
cd client
npm start
```

Visit: http://localhost:3000

## Technologies Used

- MongoDB - Database
- Express.js - Backend framework
- React.js - Frontend library
- Node.js - Runtime environment
- JWT - Authentication
- bcryptjs - Password hashing

## API Endpoints

- POST /api/auth/signup - Register user
- POST /api/auth/login - Login user
- GET /api/books - Get all books
- GET /api/books/:id - Get single book

## License

MIT
