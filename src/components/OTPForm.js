import React, { useState, useEffect } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase/firebase";

const OTPForm = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !auth) {
      setError("Firebase auth is not available.");
      console.error("Auth not available:", auth);
      return;
    }

    const recaptchaContainer = document.getElementById("recaptcha-container");
    if (!recaptchaContainer) {
      setError("reCAPTCHA container not found.");
      console.error("reCAPTCHA container missing");
      return;
    }

    // Initialize reCAPTCHA
    const initializeRecaptcha = () => {
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
              setIsRecaptchaReady(false);
            },
          },
          auth
        );

        window.recaptchaVerifier.render().then(() => {
          console.log("reCAPTCHA rendered successfully");
          setIsRecaptchaReady(true);
        }).catch((error) => {
          console.error("Failed to render reCAPTCHA:", error);
          setError(`Failed to render reCAPTCHA: ${error.message}`);
        });
      } catch (error) {
        console.error("Failed to initialize reCAPTCHA:", error);
        setError(`Failed to initialize reCAPTCHA: ${error.message}`);
      }
    };

    // Retry initialization if auth is not ready
    const checkAuthAndInitialize = () => {
      if (auth) {
        initializeRecaptcha();
      } else {
        console.warn("Auth not ready, retrying...");
        setTimeout(checkAuthAndInitialize, 100); // Retry after 100ms
      }
    };

    checkAuthAndInitialize();

    // Cleanup
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

    if (!isRecaptchaReady || !window.recaptchaVerifier) {
      setError("reCAPTCHA not initialized. Please wait and try again.");
      return;
    }

    if (!phone.match(/^\+\d{10,15}$/)) {
      setError("Please enter a valid phone number with country code (e.g., +1234567890).");
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
      setError(`Failed to send OTP: ${error.message}`);
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
      setError(`Invalid OTP: ${error.message}`);
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
      <button onClick={sendOTP} disabled={!isRecaptchaReady}>
        {isRecaptchaReady ? "Send OTP" : "Loading reCAPTCHA..."}
      </button>
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
