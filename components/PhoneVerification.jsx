"use client";
import { useState } from "react";

function PhoneVerification({ onComplete }) {
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [otp, setOtp] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [step, setStep] = useState(1);
  const staticOtp = "1"; // Static OTP value

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp === staticOtp) {
      setStep(3);
    } else {
      alert("Invalid OTP. Please try again.");
      setOtp("");
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput !== confirmPasswordInput) {
      alert("Passwords do not match. Please try again.");
      setPasswordInput("");
      setConfirmPasswordInput("");
      return;
    }
    onComplete(phoneNumberInput, passwordInput); // Passing verified phone number and password to the parent component
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <form onSubmit={handlePhoneSubmit}>
            <input
              type="text"
              placeholder="Enter phone number"
              value={phoneNumberInput}
              onChange={(e) => setPhoneNumberInput(e.target.value)}
            />
            <button type="submit">Next</button>
          </form>
        );
      case 2:
        return (
          <form onSubmit={handleOtpSubmit}>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button type="submit">Verify</button>
          </form>
        );
      case 3:
        return (
          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              placeholder="Enter password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPasswordInput}
              onChange={(e) => setConfirmPasswordInput(e.target.value)}
            />
            <button type="submit">Save Password</button>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h2>Phone Verification</h2>
      {renderStep()}
    </div>
  );
}

export default PhoneVerification;

