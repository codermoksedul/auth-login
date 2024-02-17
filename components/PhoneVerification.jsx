"use client";
import { useState } from "react";

function PhoneVerification({ onComplete }) {
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [otp, setOtp] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const staticOtp = "1"; // Static OTP value

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if all required fields are filled
    if ( !phoneNumberInput ) {
      setError("Enter phone number");
      setLoading(false);
      return;
    }
    setTimeout(() => {
      setStep(2);
      setLoading(false);
    }, 500); // 2000 milliseconds (2 seconds) delay
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulating a delay for demonstration purposes (you may replace this with your actual asynchronous OTP verification process)
    // Check if all required fields are filled
    if ( !otp ) {
      setError("Enter OTP");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      if (otp === staticOtp) {
        setStep(3);
      } else {
        setError("Invalid OTP. Please try again.");
        setOtp("");
      }
      setLoading(false);
    }, 500); // 2000 milliseconds (2 seconds) delay
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if ( !passwordInput ) {
      setError("Enter Your New Password");
      setLoading(false);
      return;
    }
    if ( !confirmPasswordInput ) {
      setError("Enter Your Confirm Password");
      setLoading(false);
      return;
    }

    if (passwordInput !== confirmPasswordInput) {
      setError("Passwords not Matching");
      setLoading(false);
      setPasswordInput("");
      setConfirmPasswordInput("");
      return;
    }
    onComplete(phoneNumberInput, passwordInput); // Passing verified phone number and password to the parent component
  };

  // Function to reset error state when input field is focused
  const inputFocusHandle = () => {
    setError("");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <form onSubmit={handlePhoneSubmit} className="flex flex-col gap-5 mt-5 justify-center items-center">
            {error && (
              <div className="error bg-red-100 rounded-md text-center px-2 w-fit mx-auto my-2 py-0 text-red-600">
                {error}
              </div>
            )}
            <input onFocus={inputFocusHandle} className="input"
              type="text"
              placeholder="Enter phone number"
              value={phoneNumberInput}
              onChange={(e) => setPhoneNumberInput(e.target.value)}
            />
            <button className="w-full btn"
                    type="submit" type="submit" disabled={loading}>
              {loading ? "Loading..." : "Next"}
            </button>
          </form>
        );
      case 2:
        return (
          <form onSubmit={handleOtpSubmit} className="flex flex-col gap-5 mt-5 justify-center items-center">
            {error && (
              <div className="error bg-red-100 rounded-md text-center px-2 w-fit mx-auto my-2 py-0 text-red-600">
                {error}
              </div>
            )}
            <input onFocus={inputFocusHandle} className="input"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button className="w-full btn" type="submit" disabled={loading}>
              {loading ? "Loading..." : "Verify"}
            </button>
          </form>
        );
      case 3:
        return (
          <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-5 mt-5 justify-center items-center">
          {error && (
            <div className="error bg-red-100 rounded-md text-center px-2 w-fit mx-auto my-2 py-0 text-red-600">
              {error}
            </div>
          )}
            <input className="input" onFocus={inputFocusHandle}
              type="password"
              placeholder="Enter password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <input className="input" onFocus={inputFocusHandle}
              type="password"
              placeholder="Confirm password"
              value={confirmPasswordInput}
              onChange={(e) => setConfirmPasswordInput(e.target.value)}
            />
            <button className="w-full btn" type="submit" disabled={loading}>
              {loading ? "Loading..." : "Save Password"}
            </button>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {renderStep()}
    </div>
  );
}

export default PhoneVerification;
