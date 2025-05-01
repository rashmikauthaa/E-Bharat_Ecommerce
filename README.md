
# 🛒 E-Commerce Website (React + Firebase)

This is a fully functional E-commerce web application built using **React**, **Redux Toolkit**, **Firebase** for backend services, and several helpful libraries for UI and routing.

## 🚀 Tech Stack

- **React** (Frontend library)
- **Redux Toolkit** (State management)
- **Firebase** (Authentication, Database, Hosting)
- **React Router DOM** (Routing)
- **React Icons** (Icons)
- **React Tabs** (Tab components)
- **React Toastify** (Toast notifications)
- **Headless UI** (Accessible UI components)

## 📦 Dependencies

```bash
"@headlessui/react": "^1.7.16",
"@reduxjs/toolkit": "^1.9.5",
"firebase": "^10.1.0",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-icons": "^4.10.1",
"react-redux": "^8.1.2",
"react-router-dom": "^6.14.2",
"react-tabs": "^6.0.2",
"react-toastify": "^9.1.3"
```

## 🏗️ Features

- User Authentication (Login / Signup / Logout) using Firebase
- Product listing page
- Product details page
- Shopping cart functionality
- Checkout flow
- Toast notifications for actions
- Responsive design
- Tabs for product categories (using `react-tabs`)

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Firebase**

   - Create a project in [Firebase Console](https://console.firebase.google.com/).
   - Enable **Authentication** (Email/Password) and **Firestore Database**.
   - Create a `.env` file at the root of your project and add:

     ```bash
     VITE_FIREBASE_API_KEY=your_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     VITE_FIREBASE_APP_ID=your_app_id
     ```

4. **Start the project**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```



