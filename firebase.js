import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkEIRfTG2p22v6-iO_EwJF3I114oES_U0",
  authDomain: "todo-app-d7f8c.firebaseapp.com",
  databaseURL: "https://todo-app-d7f8c-default-rtdb.firebaseio.com",
  projectId: "todo-app-d7f8c",
  storageBucket: "todo-app-d7f8c.firebasestorage.app",
  messagingSenderId: "964203020906",
  appId: "1:964203020906:web:6bfea4a73a6c6742ba4013",
  measurementId: "G-N0MLLC7VEW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
