// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCC8PD_ijqf3EHoqNrABj05WaSlMbSdoo",
  authDomain: "brainspark-db.firebaseapp.com",
  projectId: "brainspark-db",
  storageBucket: "brainspark-db.firebasestorage.app",
  messagingSenderId: "845480397952",
  appId: "1:845480397952:web:e043037b0e44ad17612a65",
  measurementId: "G-67THLG3JT8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Auth for Google Login
export const firebaseAuth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();