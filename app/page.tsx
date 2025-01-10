"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { User } from "firebase/auth";
import { auth } from "../firebase";
import TodoList from "./TodoList";
import Login from "./Login";
import { signOut } from "firebase/auth";


export default function Home() {
  const [user, setUser] = useState<User | null>(null); // Explicitly define the type
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Use the currentUser directly from Firebase
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser); // Pass the user object from the Login component
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear the user state
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <header className="flex justify-between w-full max-w-lg mb-6">
        <h1 className="text-xl font-bold text-purple-800">Welcome, {user.email}</h1>
        <button
          onClick={handleLogout}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Logout
        </button>
      </header>
      <TodoList userId={user.uid} />
    </main>
  );
}
