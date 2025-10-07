# SMK-SuPer Project

This guide will help you set up and run the **SMK-SuPer** MERN stack project, including both the frontend and backend.

---

## Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (Recommended: Latest LTS version)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (Package managers)
- [MongoDB](https://www.mongodb.com/) (Database)
- A code editor like [VS Code](https://code.visualstudio.com/)

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/EDOHWARES/SMK-SuPer
```

### 2. Navigate to the Project Directory
```bash
cd smk-super
```

---

## Frontend Setup

### 1. Navigate to the Client Directory
```bash
cd client
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```

### Notes
- Replace `smk-super` with the actual path to your project directory if necessary.
- Ensure that the backend server is running if the frontend depends on it.

The frontend should now be running on [http://localhost:5173/](http://localhost:5173/) (default Vite port).

---

## Backend Setup

### 1. Navigate to the Server Directory
```bash
cd ../server
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the `server` directory and add the following:
```env
MONGO_URI=
JWT_SECRET=
PORT=
```

### 4. Start the Backend Server
```bash
npm start
```

### Notes
- The backend server will run on [http://localhost:5000/](http://localhost:5000/) by default.
- Ensure MongoDB is running locally or update the `MONGO_URI` in the `.env` file to point to your MongoDB instance.

---

## Admin Setup

### 1. Create an Admin Account
Use the `/api/auth/admin/signup` endpoint to create an admin account.

#### Example Request:
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/auth/admin/signup`
- **Headers:**
  - `Content-Type: application/json`
- **Body:**
  ```json
  {
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "adminpassword"
  }
  ```

### 2. Log in as Admin
Use the `/api/auth/admin/login` endpoint to log in as an admin.

#### Example Request:
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/auth/admin/login`
- **Headers:**
  - `Content-Type: application/json`
- **Body:**
  ```json
  {
    "email": "admin@example.com",
    "password": "adminpassword"
  }
  ```

#### Response:
You will receive a JWT token. Use this token to access admin-protected routes.

---

## Additional Notes
- Ensure both the frontend and backend servers are running simultaneously for the application to work correctly.
- Use tools like **Postman** or **Thunder Client** to test API endpoints.
- For production, configure your environment variables and deploy the app to a hosting service like **Heroku**, **Vercel**, or **AWS**.

---

Let me know if you need further assistance!