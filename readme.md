# Assignment Project

This project is a Node.js-based application using Express.js and MongoDB.

## Prerequisites

Ensure you have the following installed on your system:

- Node.js (v16 or higher)
- npm (Node Package Manager)
- MongoDB Atlas account or local MongoDB instance

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd Assignment
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   - Rename the `.env` file if necessary or create a new `.env` file in the root directory.
   - Update the following variables in the `.env` file:
     ```
     PORT=3000
     MONGO_URI=<your-mongodb-uri>
     JWT_SECRET_KEY=<your-secret-key>
     ```

4. **Run the Application**

   ```bash
   npm run dev
   ```

5. **Access the Application**
   - Open your browser and navigate to `http://localhost:3000`.

## API Endpoints

### User Routes

- **POST** `/api/user/create` - Create a new user profile.
- **POST** `/api/user/get` - Get user profile.
- **PUT** `/api/user/update/:id` - Update user profile (requires authentication).

## Additional Notes

- Ensure your MongoDB URI is correct and accessible.
- Use a strong `JWT_SECRET_KEY` for security.
- For development, you can use tools like Postman to test the API endpoints.
