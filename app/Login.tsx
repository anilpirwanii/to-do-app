"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { User } from "firebase/auth";
import { auth } from "../firebase"; // Import your `auth` from firebase.js

export default function Login({ onLogin }: { onLogin: (user: User) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      let userCredential;
      if (isRegister) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      onLogin(userCredential.user); // Pass the user object to parent
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        setError("No user found with this email.");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else {
        setError("Incorrect email or password. Please sign up first. If you already have an account, please try again.");
      }
    }
  };  
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">{isRegister ? "Register" : "Login"}</h1>
      {error && (
        <div className="text-red-500 bg-red-100 p-2 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700">
          {isRegister ? "Register" : "Login"}
        </button>
      </form>
      <button
        onClick={() => setIsRegister(!isRegister)}
        className="mt-4 text-purple-600 hover:underline"
      >
        {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
      </button>
    </div>
  );
}