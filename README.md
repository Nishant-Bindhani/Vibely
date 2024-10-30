# 📸 Vibely - Social Media Application

**Vibely** is a comprehensive full-stack social media application that allows users to connect, share posts, and engage in real-time chat. With a modern interface and real-time communication, Vibely delivers a seamless social experience backed by powerful technologies.

## 🌟 Features

- 🔐 **User Authentication**: Secure user registration and login using JWT tokens.
- 💬 **Real-Time Chat**: Instantly message friends using Socket.io for real-time communication.
- 🖼️ **Posts and Media Sharing**: Users can create and share posts, images, and videos, with uploads managed by Cloudinary.
- 💻 **Responsive UI**: Developed with Chakra UI for a visually appealing, responsive user interface.
- 🌐 **Global State Management**: RecoilJS handles global state in the frontend for optimal performance.

## 🛠️ Tech Stack

- **Frontend**: React ⚛️, RecoilJS 🎛️, Chakra UI 🎨
- **Backend**: Node.js 🟩, Express 🚀
- **Database**: MongoDB 🍃
- **Real-time Communication**: Socket.io 🔌
- **Media Storage**: Cloudinary ☁️

## 📂 Project Structure

```plaintext
Vibely/
├── backend/
│   ├── controllers/
│   │   ├── messageController.js       # Manages chat message operations
│   │   ├── postController.js          # Manages post operations
│   │   └── userController.js          # Handles user-related operations
│   ├── db/
│   │   └── connectDB.js               # MongoDB connection setup
│   ├── models/
│   │   ├── conversationModel.js       # Schema for chat conversations
│   │   ├── messageModel.js            # Schema for messages
│   │   └── userModel.js               # Schema for users
│   │   └── postModel.js               # Schema for posts
│   ├── routes/
│   │   ├── userRoutes.js              # Routes for user management
│   │   ├── postRoutes.js              # Routes for post-related operations
│   │   └── messageRoutes.js           # Routes for messaging
│   ├
│   ├── socket/
│   │   └── socket.js                  # Socket.io server setup
│   ├── .env                           # Environment variables
│   └── server.js                      # Backend entry point
├── frontend/
│   ├── public/                        #Static files images,logos.
│   │   
│   │   
│   │ 
│   ├── src/
│   │   ├── assets/                    # Conatins notification sound mp3 file
│   │          
│   │   ├── atoms/                     # Recoil atoms for global state management
│   │   │    
│   │   ├── components/                # Reusable UI components
│   │   │
│   │   │  
│   │   │  
│   │   │   
│   │   ├── context/                   # Context API for managing shared state I have used it for client side socket-io
│   │   │   
│   │   ├── hooks/                     # Custom React hooks for reusable logic
│   │   │   
│   │   ├── pages/                     # Pages rendered by routes
│   │   
│   │   
│   │   
│   │   
│   │      
│   │     
│   ├── App.js                         # Main application component
│   ├── index.js                       # Entry point for React app
```
## 🚀 Installation Guide

Follow these steps to set up the Vibely project locally for development.

### Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** and **npm**: [Download and install Node.js](https://nodejs.org/)
- **MongoDB**: Ensure you have a running MongoDB instance, either locally or via [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- **Cloudinary**: Sign up at [Cloudinary](https://cloudinary.com/) and obtain your API credentials for media storage.

### Steps to Install

1. **Clone the Repository**

   Clone the repository to your local machine using Git:

   ```bash
   git clone https://github.com/your-username/Vibely.git
   ```
   
2. **Navigate to the Project Directory**

   After cloning the repository in Step 1, change into the project directory:

   ```bash
   cd Vibely
   ```
3. **Install Dependencies**

   The Vibely project has separate dependencies for the backend and frontend. You’ll need to install these separately.

   - **Backend dependencies**:

     First, navigate to the backend folder and install all necessary packages by running the following commands:

     ```bash
     cd backend
     npm install
     ```

     This will install all required dependencies for the server-side, such as Express, MongoDB, Socket.IO, and others.

   - **Frontend dependencies**:

     Next, go to the frontend folder and install the dependencies needed for the client-side:

     ```bash
     cd ../frontend
     npm install
     ```

     This will install all required packages for the frontend, including React, RecoilJS, Chakra UI, and Socket.IO client.

   Once both backend and frontend dependencies are installed, you're ready to configure your environment variables in Step 4.

4. **Environment Setup**

   To configure the necessary environment variables, create a `.env` file inside the `backend` folder. This file will store sensitive information required for the application to connect to external services securely.

   In the `backend/.env` file, add the following configuration:

   ```plaintext
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   PORT=5000
   ```
   Replace each placeholder with your actual values:

   MONGODB_URI: The connection string for your MongoDB database.
   JWT_SECRET: A secret key for signing JSON Web Tokens (choose a strong, unique value).
   CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET: Your Cloudinary account credentials, used for storing media files.
   PORT: Port number for the backend server to listen on (default is 5000).
   
5. **Starting the Application**

   Now that dependencies are installed and environment variables are configured, you can start both the backend and frontend servers. Open two separate terminals to run each server individually.

   - **Start the backend server**:

     In the first terminal, navigate to the `backend` directory and start the server with the following commands:

     ```bash
     cd backend
     npm run dev
     ```

     This will start the backend server in development mode on the port specified in the `.env` file (default is `5000`).

   - **Start the frontend server**:

     In the second terminal, navigate to the `frontend` directory and run the following commands:

     ```bash
     cd frontend
     npm run dev
     ```

     This will launch the frontend React application, typically on `http://localhost:3000`.

     

   



