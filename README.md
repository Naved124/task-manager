# Personal Task Manager (MERN Stack)

A full-stack task management application built using the MERN stack (MongoDB, Express, React, Node.js). 
This app allows users to create, organize, and track personal tasks with a modern, glassmorphism UI.

## Features
- **Create Tasks:** Add tasks with a title, description, priority, and due date.
- **Update Tasks:** Change the status (To Do, In Progress, Done) seamlessly.
- **Delete Tasks:** Remove tasks you no longer need.
- **Filter & Sort:** Filter tasks by status and sort them by creation date, due date, or priority.
- **Responsive UI:** A premium Vanilla CSS design with glassmorphism effects and modern typography.

## Prerequisites
- Node.js (v16+ recommended)
- MongoDB (Local instance or Atlas URI)

## Setup Instructions

### 1. Backend Setup
1. Open a terminal and navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Rename `.env.example` to `.env`
   - Update `MONGODB_URI` if you are using a custom MongoDB connection string (default is `mongodb://127.0.0.1:27017/task-manager`).
4. Start the development server:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000`.

### 2. Frontend Setup
1. Open a new terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173` (or another port specified by Vite).

## Project Structure
- `server/`: Contains the Express.js API, Mongoose models, controllers, and routing logic.
- `client/`: Contains the React SPA built with Vite, utilizing standard `axios` for data fetching and Vanilla CSS for styling.
- `NOTES.md`: Answers to architectural and scalability questions.
