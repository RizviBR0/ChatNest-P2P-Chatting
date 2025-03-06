# React Real-Time Chat Application

A responsive, real-time chat web application built using React.js, Firebase Authentication, and Firestore. Perfect as a starter template or fully-functional messaging platform for your next project.

## 🚀 Key Features

- **Secure Authentication**: Easily manage user accounts with seamless login and signup functionality.
- **Real-Time Messaging**: Engage users instantly with Firebase-powered real-time messaging.
- **Responsive & User-Friendly UI**: Clean, intuitive interface optimized for desktop and mobile.
- **Private Chat Support**: Directly chat one-on-one with any registered user.

## 🛠️ Technologies Used

- **React.js**
- **Firebase Authentication**
- **Firestore Database**
- **React Router v6**
- **Zustand** (for state management)
- **Tailwind CSS** (for styling and responsiveness)

## 🚧 Getting Started

Follow these simple steps to set up the project:

1. **Clone the Repository**:
2. [https://github.com/RizviBR0/ChatNest-P2P-Chatting.git](https://github.com/RizviBR0/ChatNest-P2P-Chatting.git)

```bash
git clone https://github.com/your-username/ChatNest-P2P-Chatting.git
```

2. **Install Dependencies**:

```bash
npm install
```

3. **Firebase Configuration**:

   - Create a new project in [Firebase Console](https://console.firebase.google.com/).
   - Enable Authentication (Email/Password method) and Firestore Database.
   - Update your `.env` file with your Firebase configuration details.

4. **Firestore Security Rules**:

   - Copy the security rules from `src/utils/firebaseRules.txt`.
   - Paste these rules into your Firebase console under Firestore Database rules.

5. **Launch Development Server**:

```bash
npm start
```

## 🎯 How to Use

- Sign up if you're new, or log in if you already have an account.
- The application automatically identifies if your email is registered.
- Upon logging in, a sidebar displays a list of all registered users.
- Click any user’s name to initiate a private chat session.
- Enjoy instant message delivery and updates in real-time!

## 📁 Project Structure

- `/components` - Reusable UI components.
- `/pages` - Core pages of the application.
- `/services` - Firebase setup and related services.
- `/store` - State management using Zustand.
- `/utils` - Utility functions, helpers, and Firebase rules.

## 🌟 Ideal Use Cases

- Personal chat projects
- Real-time communication web apps
- React.js learning and Firebase integration tutorials
- Template for messaging systems

Feel free to customize, expand, and deploy this chat application as per your needs!