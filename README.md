# To-Do List App

A sleek, user-friendly to-do list application that helps users manage their daily tasks efficiently. This project demonstrates the integration of a full-stack web application using modern technologies, showcasing features like authentication, user-specific task management, and real-time updates.

🚀 **Live Demo**: [https://todo-qd5pf7fcl-anilpirwaniis-projects.vercel.app/](https://todo-qd5pf7fcl-anilpirwaniis-projects.vercel.app/)

---

## Features
- **User Authentication**: Secure sign-up and login functionality powered by Firebase Authentication.
- **Task Management**:
  - Add, delete, and toggle tasks as completed.
  - Tasks are user-specific and isolated for each account.
- **Real-Time Sync**: Task data is stored and retrieved from Firebase Firestore.
- **Responsive Design**: Optimized for mobile, tablet, and desktop screens.
- **Animations**: Smooth UI animations for better user experience.
- **Deployment**: Hosted on Vercel for lightning-fast performance.

---

## Tech Stack
### **Frontend**
- **[Next.js](https://nextjs.org/)**: React framework for server-side rendering and static site generation.
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for rapid UI development.
- **[TypeScript](https://www.typescriptlang.org/)**: Type-safe JavaScript for enhanced development experience.

### **Backend**
- **[Firebase Firestore](https://firebase.google.com/docs/firestore)**: NoSQL database for storing user tasks.
- **[Firebase Authentication](https://firebase.google.com/docs/auth)**: Secure and scalable authentication system.

### **Deployment**
- **[Vercel](https://vercel.com/)**: Hosting platform for deploying the app.

---

## How It Works
1. **Authentication**: Users can register and log in securely. Each user's tasks are stored in Firebase Firestore.
2. **Task Management**:
   - Tasks are added with a fade-in animation for better visual feedback.
   - Tasks can be toggled as completed or deleted permanently.
3. **Real-Time Data**: Task updates are reflected instantly, thanks to Firebase’s real-time capabilities.

---

## Development Process
### **1. Planning**
- Decided on the core features: authentication, task management, and a clean UI.
- Chose Firebase for backend services to simplify setup and focus on front-end development.

### **2. Implementation**
- **Frontend**: Used Next.js for building a responsive, component-driven UI.
- **Backend**: Configured Firebase Firestore and Authentication for storing user-specific tasks.
- **Styling**: Designed the interface using Tailwind CSS, focusing on minimalism and modern aesthetics.

### **3. Testing**
- Tested the app locally using the development and production builds.
- Validated task operations and authentication flows across different devices and screen sizes.

### **4. Deployment**
- Deployed the app on Vercel, ensuring a live, production-ready version.

---

## Future Improvements
- Add due dates and reminders for tasks.
- Enable drag-and-drop reordering of tasks.
- Include a progress tracker for task completion.
- Implement dark mode for better accessibility.

---

## Installation
To run the project locally:
1. Clone the repository:
   ```bash
   git clone <repository-link>
   ```
## Navigate to the project directory:
``` bash
cd todo-app
```
## Install dependencies:
```bash
npm install
```
## Run the development server:
```bash
npm run dev
```
Open http://localhost:3000 in your browser.

## Live Demo
Try out the live app here: https://todo-qd5pf7fcl-anilpirwaniis-projects.vercel.app/