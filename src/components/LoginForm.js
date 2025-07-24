import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";

const LoginForm = () => {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Logged in user:", result.user);
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <div>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

export default LoginForm;
