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
- **Cloudinary**: Cloud service for storing and managing uploaded files
- **Multer**: Middleware for handling multipart/form-data, used for file uploads

### Features Implemented

#### User Authentication

- **User Registration**: Users can create a new account with username, email, password, and university information
- **User Login**: Authentication using email and password
- **User Logout**: Secure logout by clearing JWT tokens
- **Protected Routes**: Routes that require authentication

#### User Management

- **User Profile**: Users can view their profile information
- **JWT-based Authentication**: Secure authentication using JWT tokens stored in HTTP-only cookies

#### Study Notes Management

- **Upload Notes**: Users can upload study materials with title, description, price, and file attachment
- **University Tagging**: Study materials are automatically tagged with the user's university
- **File Storage**: Files are securely stored in Cloudinary cloud storage
- **File Access Control**: Only authenticated users can access uploaded files

#### API Structure

- **RESTful API Design**: Well-structured API with proper routes and controllers
- **Error Handling**: Custom error handling with ApiError class
- **Response Formatting**: Standardized API responses with ApiResponse class
- **Middleware**: Middleware for authentication and validation
- **File Handling**: Multer middleware for file uploads

### API Endpoints

| Method | Endpoint                | Description                        | Authentication Required |
| ------ | ----------------------- | ---------------------------------- | ----------------------- |
| POST   | /api/v1/user/register   | Register a new user                | No                      |
| POST   | /api/v1/user/login      | Authenticate user and return token | No                      |
| POST   | /api/v1/user/logout     | Logout user                        | Yes                     |
| GET    | /api/v1/user/getProfile | Get user profile                   | Yes                     |
| POST   | /api/v1/notes/upload    | Upload a new note                  | Yes                     |

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
- Cloudinary account

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
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
4. Start the server
   ```
   npm start
   ```

### Frontend Setup

_Coming soon_

## API Testing

When testing the API endpoints, make sure to:

1. Use the correct Content-Type header: `Content-Type: application/json` for JSON requests
2. Use `multipart/form-data` for file uploads
3. Include all required fields in the request body
4. For protected routes, include the JWT token in the cookie

### Example for User Registration:

```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "securepassword",
  "university": "Test University"
}
```

### Example for Note Upload:

Using Postman:

- Set request type to POST
- URL: `http://localhost:3000/api/v1/notes/upload`
- Authentication: Include authentication cookies
- Body: Form-data with these fields:
  - title: "Sample Note Title"
  - description: "Detailed description about this note"
  - price: "10"
  - file: [Select a PDF or document file]

## Development Notes

- The API uses HTTP-only cookies for storing JWT tokens to prevent XSS attacks
- Password hashing is implemented with bcryptjs for security
- Custom error handling is implemented for better error messages
- File uploads are handled with Multer for temporary local storage
- Files are stored permanently in Cloudinary cloud storage
- Local temporary files are automatically deleted after upload

## Future Enhancements

- Email verification
- Password reset functionality
- User roles and permissions
- Advanced study material organization features
- Real-time collaboration tools
- Search functionality for study materials
- Rating and review system for notes
- Payment integration for premium content
