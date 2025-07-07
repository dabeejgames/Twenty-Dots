import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyChDHK7XGt947lqn8_sLCJynqBop6YkEh4",
  authDomain: "twenty-dots.firebaseapp.com",
  databaseURL: "https://twenty-dots-default-rtdb.firebaseio.com/", // <-- this line is required for RTDB!
  projectId: "twenty-dots",
  storageBucket: "twenty-dots.appspot.com",
  messagingSenderId: "751012829918",
  appId: "1:751012829918:web:865348edbf86434539c04f",
  measurementId: "G-BHYZPRQ09G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and export it
export const db = getDatabase(app);