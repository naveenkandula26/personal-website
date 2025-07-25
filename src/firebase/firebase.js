// firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyC9QsYnvpbNhOIU4sS7aKxKy0s-uyjMBhI",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "my-portfolio-f5c46.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "my-portfolio-f5c46",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "my-portfolio-f5c46.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "891751225530",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:891751225530:web:99a2544b4a9b8fd7448a83",
};

let app;
let auth = null;
let db = null;

try {
  if (typeof window !== "undefined") {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    console.log("Firebase initialized successfully:", app.name);
  } else {
    console.warn("Firebase not initialized: Not running in browser environment");
  }
} catch (error) {
  console.error("Firebase initialization failed:", error);
}

export { app, auth, db };
