import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC9QsYnvpbNhOIU4sS7aKxKy0s-uyjMBhI",
  authDomain: "my-portfolio-f5c46.firebaseapp.com",
  projectId: "my-portfolio-f5c46",
  storageBucket: "my-portfolio-f5c46.firebasestorage.app",
  messagingSenderId: "891751225530",
  appId: "1:891751225530:web:99a2544b4a9b8fd7448a83"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
