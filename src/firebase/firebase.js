import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9QsYnvpbNhOIU4sS7aKxKy0s-uyjMBhI",
  authDomain: "my-portfolio-f5c46.firebaseapp.com",
  projectId: "my-portfolio-f5c46",
  storageBucket: "my-portfolio-f5c46.appspot.com",
  messagingSenderId: "891751225530",
  appId: "1:891751225530:web:99a2544b4a9b8fd7448a83"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
