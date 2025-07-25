import React, { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth }        {
          size: "invisible",
          callback: () => {
            // reCAPTCHA solved - allow sendOTP
          },
          "expired-callback": () => {
            console.warn("reCAPTCHA expired. Please try again.");
          },
        },
        auth
      );
    }
  };

  const sendOTP = () => {
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        alert("OTP sent successfully!");
      })
      .catch((error) => {
        console.error("SMS not sent", error);
        alert("Failed to send OTP. Please check the phone number.");
      });
  };

  const verifyOTP = () => {
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        console.log("Logged in user:", result.user);
        alert("OTP verified successfully!");
      })
      .catch((error) => {
        console.error("OTP verification failed", error);
        alert("Invalid OTP. Please try again.");
      });
  };

  return (
    <div>
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone number"
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
import React from "../firebase/firebase";

const OTPForm = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
