# React Chat Application

A real-time chat application built with React, Firebase Authentication, and Firestore.

## Features

- User authentication (login/signup)
- Real-time messaging
- User-friendly interface
- Mobile responsive design

## Technologies Used

- React.js
- Firebase Authentication
- Firestore Database
- React Router v6
- Zustand for state management
- Tailwind CSS

## Project Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a Firebase project and enable Authentication and Firestore
4. Update the `.env` file with your Firebase configuration
5. Copy the Firestore security rules from `src/utils/firebaseRules.txt` to your Firebase console
6. Start the development server:
   ```
   npm start
   ```

## Usage

1. Register an account or log in if you already have one
2. The app will automatically detect if your email already exists in the system
3. After logging in, you'll see a list of users on the left sidebar
4. Click on any user to start a conversation
5. Messages are sent and received in real-time

## Project Structure

- `/components` - Reusable UI components
- `/pages` - Main application pages
- `/services` - Firebase configuration and services
- `/store` - State management with Zustand
- `/utils` - Utility functions and helpers
