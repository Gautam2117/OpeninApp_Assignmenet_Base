// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA20Z3BqKfoMiouP_nepTP2wB_Qx6jFhEY",
    authDomain: "base-14932.firebaseapp.com",
    projectId: "base-14932",
    storageBucket: "base-14932.appspot.com",
    messagingSenderId: "450643506575",
    appId: "1:450643506575:web:a4996faf2917b9740347fa",
    measurementId: "G-SDT6TT2QNC"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Google Auth Provider
const provider = new GoogleAuthProvider();

export { auth, provider };
