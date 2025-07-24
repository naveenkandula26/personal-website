import React from 'react';
import LoginForm from '../components/LoginForm';
import OTPForm from '../components/OTPForm';
import '../styles/login.css';

const LoginPage = () => {
  return (
    <div className="login-page">
      <h2>Login</h2>
      <LoginForm />
      <OTPForm />
    </div>
  );
};

export default LoginPage;
