# Study Stash

Study Stash is a comprehensive learning management platform designed to help students organize their study materials, collaborate with peers, and enhance their learning experience.

## Project Structure

The project is divided into two main parts:

- **Frontend**: User interface built with modern web technologies
- **Backend**: RESTful API server built with Node.js and Express

## Backend

The backend provides a RESTful API for the frontend to interact with.

### Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express**: Web application framework for Node.js
- **MongoDB**: NoSQL database for storing application data
- **Mongoose**: MongoDB object modeling for Node.js
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Library for hashing passwords

### Features Implemented

#### User Authentication

- **User Registration**: Users can create a new account with username, email, password, and university information
- **User Login**: Authentication using email and password
- **User Logout**: Secure logout by clearing JWT tokens
- **Protected Routes**: Routes that require authentication

#### User Management

- **User Profile**: Users can view their profile information
- **JWT-based Authentication**: Secure authentication using JWT tokens stored in HTTP-only cookies

#### API Structure

- **RESTful API Design**: Well-structured API with proper routes and controllers
- **Error Handling**: Custom error handling with ApiError class
- **Response Formatting**: Standardized API responses with ApiResponse class
- **Middleware**: Middleware for authentication and validation

### API Endpoints

| Method | Endpoint                | Description                        | Authentication Required |
| ------ | ----------------------- | ---------------------------------- | ----------------------- |
| POST   | /api/v1/user/register   | Register a new user                | No                      |
| POST   | /api/v1/user/login      | Authenticate user and return token | No                      |
| POST   | /api/v1/user/logout     | Logout user                        | Yes                     |
| GET    | /api/v1/user/getProfile | Get user profile                   | Yes                     |

## Frontend

_Note: The frontend is currently under development._

### Planned Features

- User authentication interface
- Dashboard for study materials
- Resource organization tools
- Collaborative study spaces
- University-specific resource sections

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup

1. Navigate to the backend directory
   ```
   cd backend
   ```
2. Install dependencies
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=3000
   JWT_TOKEN_SECRET=your_secret_key
   JWT_TOKEN_EXPIRY=30d
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Start the server
   ```
   npm start
   ```

### Frontend Setup

_Coming soon_

## API Testing

When testing the API endpoints, make sure to:

1. Use the correct Content-Type header: `Content-Type: application/json`
2. Include all required fields in the request body
3. For protected routes, include the JWT token in the cookie

Example for registration:

```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "securepassword",
  "university": "Test University"
}
```

## Development Notes

- The API uses HTTP-only cookies for storing JWT tokens to prevent XSS attacks
- Password hashing is implemented with bcryptjs for security
- Custom error handling is implemented for better error messages

## Future Enhancements

- Email verification
- Password reset functionality
- User roles and permissions
- Advanced study material organization features
- Real-time collaboration tools
