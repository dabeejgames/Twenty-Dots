// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChDHK7XGt947lqn8_sLCJynqBop6YkEh4",
  authDomain: "twenty-dots.firebaseapp.com",
  projectId: "twenty-dots",
  storageBucket: "twenty-dots.firebasestorage.app",
  messagingSenderId: "751012829918",
  appId: "1:751012829918:web:865348edbf86434539c04f",
  measurementId: "G-BHYZPRQ09G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export it for use in your app
export const db = getFirestore(app);