import React from 'react';
import SignupForm from '../components/SignupForm';
import '../styles/signup.css';

const SignupPage = () => {
  return (
    <div className="signup-page">
      <h2>Sign Up</h2>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
