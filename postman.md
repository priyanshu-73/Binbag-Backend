# Postman Documentation for Assignment Project

This document provides details on how to test the API endpoints using Postman.

## Base URL
```
http://localhost:3000/api/user
```

## Endpoints

### 1. Create User Profile
- **Method:** POST  
- **URL:** `/create`  
- **Headers:**  
  - `Content-Type: application/json`  
- **Body (JSON):**
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "StrongPassword123!"
  }
  ```
- **Response:**
  - **Success (200):**
    ```json
    {
      "message": "User created",
      "user": {
        "name": "John Doe",
        "email": "johndoe@example.com",
        "password": "<hashed_password>"
      }
    }
    ```
  - **Error (400):** Validation or user existence errors.

---

### 2. Get User Profile
- **Method:** POST  
- **URL:** `/get`  
- **Headers:**  
  - `Content-Type: application/json`  
- **Body (JSON):**
  ```json
  {
    "email": "johndoe@example.com",
    "password": "StrongPassword123!"
  }
  ```
- **Response:**
  - **Success (200):**
    ```json
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "id": "<user_id>"
    }
    ```
  - **Error (401):** Invalid credentials.

---

### 3. Update User Profile
- **Method:** PUT  
- **URL:** `/update/:id`  
- **Headers:**  
  - `Content-Type: application/json`  
  - `Authorization: Bearer <access_token>`  
- **Body (JSON):**
  ```json
  {
    "name": "John Updated",
    "email": "johnupdated@example.com",
    "password": "NewStrongPassword123!"
  }
  ```
- **Response:**
  - **Success (200):**
    ```json
    {
      "message": "Profile Updated"
    }
    ```
  - **Error (400/401):** Authorization or validation errors.

---

## Notes
- Replace `<access_token>` with the token received after login.
- Use Postman to set cookies automatically for endpoints requiring authentication.
- Ensure the server is running before testing the endpoints.
