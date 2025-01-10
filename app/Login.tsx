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
    } catch (error: unknown) {
        if (typeof error === "object" && error !== null && "code" in error) {
          const firebaseError = error as { code: string };
          if (firebaseError.code === "auth/email-already-in-use") {
            setError("This email is already registered. Please log in instead.");
          } else if (firebaseError.code === "auth/user-not-found") {
            setError("No user found with this email.");
          } else if (firebaseError.code === "auth/wrong-password") {
            setError("Incorrect password.");
          } else if (firebaseError.code === "auth/invalid-email") {
            setError("Invalid email format.");
          } else {
            setError(
              isRegister
                ? "Failed to register. Please try again."
                : "Failed to log in. Please check your credentials."
            );
          }
        } else {
          setError("An unexpected error occurred.");
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