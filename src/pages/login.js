import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import LoginForm from '../components/LoginForm';
import OTPForm from '../components/OTPForm';
import '../styles/login.css';

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/home');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="login-page">
      <h2>Login</h2>
      <LoginForm />
      <OTPForm />
    </div>
  );
};

export default LoginPage;
