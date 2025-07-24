import React, { useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase/firebase";

const OTPForm = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {}
    }, auth);
  };

  const sendOTP = () => {
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      }).catch((error) => {
        console.error("SMS not sent", error);
      });
  };

  const verifyOTP = () => {
    window.confirmationResult.confirm(otp)
      .then((result) => {
        console.log("Logged in user:", result.user);
      }).catch((error) => {
        console.error("OTP verification failed", error);
      });
  };

  return (
    <div>
      <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" />
      <button onClick={sendOTP}>Send OTP</button>
      <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" />
      <button onClick={verifyOTP}>Verify OTP</button>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default OTPForm;
