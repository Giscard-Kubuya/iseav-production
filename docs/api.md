# API Documentation

## Authentication

### POST /api/auth/login
Login endpoint for users.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "role": "student"
  }
}
```

### POST /api/auth/register
Register new user account.

## Academic APIs

### GET /api/academics/programs
Get all academic programs.

### GET /api/academics/courses
Get all courses.

## Student Portal APIs

### GET /api/students/grades
Get student grades.

### GET /api/students/attendance
Get student attendance records.

## Admin APIs

### GET /api/admin/users
Get all users (admin only).

### POST /api/admin/users
Create new user (admin only).