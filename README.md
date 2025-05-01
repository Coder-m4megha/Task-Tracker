# Task Tracker Application

A full-stack task tracker application built with Express.js, React, and MongoDB.

## Features

- User authentication with JWT
- Project management (up to 4 projects per user)
- Task management with status tracking
- Responsive design

## Requirements

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

## Installation

### Clone the repository

```bash
git clone <repository-url>
cd task-tracker
```

### Backend Setup

1. Install dependencies:

```bash
cd backend
npm install
```

2. Configure environment variables:
   - Rename `.env.example` to `.env` (if needed)
   - Update MongoDB URI and JWT secret

3. Start the server:

```bash
npm run dev
```

The server will run on http://localhost:5000

### Frontend Setup

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Start the development server:

```bash
npm run dev
```

The frontend will run on http://localhost:3000

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user

### Users

- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update user profile

### Projects

- `GET /api/projects` - Get all projects for current user
- `GET /api/projects/:id` - Get single project by ID
- `POST /api/projects` - Create a new project
- `PUT /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project

### Tasks

- `GET /api/tasks` - Get all tasks for current user
- `GET /api/tasks/:id` - Get single task by ID
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## User Flow

1. Register/Login
2. Create a project (up to 4)
3. Add tasks to the project
4. Update task status as progress is made
5. View and manage all projects and tasks

## Technologies Used

- **Backend**:
  - Express.js
  - MongoDB with Mongoose
  - JWT Authentication
  - bcryptjs for password hashing

- **Frontend**:
  - React
  - React Router
  - Context API for state management
  - Axios for API requests
  - Bootstrap for styling

## License

MIT
