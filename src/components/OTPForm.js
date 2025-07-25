import React, { useState, useEffect } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase/firebase";

const OTPForm = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined" || !auth) return;

    // Initialize reCAPTCHA verifier
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("reCAPTCHA solved");
          },
          "expired-callback": () => {
            console.warn("reCAPTCHA expired. Please try again.");
            setError("reCAPTCHA expired. Please try again.");
          },
        },
        auth
      );
    } catch (error) {
      console.error("Failed to initialize reCAPTCHA:", error);
      setError("Failed to initialize reCAPTCHA. Please try again.");
    }

    // Cleanup reCAPTCHA on component unmount
    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  const sendOTP = async () => {
    if (!auth) {
      setError("Firebase auth is not available.");
      return;
    }

    if (!window.recaptchaVerifier) {
      setError("reCAPTCHA not initialized. Please try again.");
      return;
    }

    try {
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
      window.confirmationResult = confirmationResult;
      alert("OTP sent successfully!");
      setError(null);
    } catch (error) {
      console.error("SMS not sent:", error);
      setError("Failed to send OTP. Please check the phone number.");
    }
  };

  const verifyOTP = async () => {
    if (!window.confirmationResult) {
      setError("No OTP request found. Please send OTP first.");
      return;
    }

    try {
      const result = await window.confirmationResult.confirm(otp);
      console.log("Logged in user:", result.user);
      alert("OTP verified successfully!");
      setError(null);
    } catch (error) {
      console.error("OTP verification failed:", error);
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Enter phone number (e.g., +1234567890)"
      />
      <button onClick={sendOTP}>Send OTP</button>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
      />
      <button onClick={verifyOTP}>Verify OTP</button>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default OTPForm;
