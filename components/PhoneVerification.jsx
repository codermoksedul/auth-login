"use client";
import logo from '@/public/images/logo.webp';
import Image from "next/image";
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
            <span className='w-[100px]'><Image src={logo} alt="oli academy"/></span>
            {/* <h2 className="text-2xl font-semibold text-center my-2">Register OLI Academy!</h2> */}
            {error && (
              <div className="error bg-red-100 rounded-md text-center px-2 w-fit mx-auto my-2 py-0 text-red-600">
                {error}
              </div>
            )}
            <input onFocus={inputFocusHandle} className="w-full border border-slate-200 px-3 py-2 rounded-md focus:border-b-2 focus:border-b-primary-color outline-none"
              type="text"
              placeholder="Enter phone number"
              value={phoneNumberInput}
              onChange={(e) => setPhoneNumberInput(e.target.value)}
            />
            <button className="w-full bg-primary-color hover:bg-white hover:text-primary-color transition-all duration-300 text-white font-medium border border-primary-color rounded-md px-3 py-2"
                    type="submit" type="submit" disabled={loading}>
              {loading ? "Loading..." : "Next"}
            </button>
          </form>
        );
      case 2:
        return (
          <form onSubmit={handleOtpSubmit} className="flex flex-col gap-5 mt-5 justify-center items-center">
            <span className='w-[100px]'><Image src={logo} alt="oli academy"/></span>
            {error && (
              <div className="error bg-red-100 rounded-md text-center px-2 w-fit mx-auto my-2 py-0 text-red-600">
                {error}
              </div>
            )}
            <input onFocus={inputFocusHandle} className="w-full border border-slate-200 px-3 py-2 rounded-md focus:border-b-2 focus:border-b-primary-color outline-none"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button className="w-full bg-primary-color hover:bg-white hover:text-primary-color transition-all duration-300 text-white font-medium border border-primary-color rounded-md px-3 py-2" type="submit" disabled={loading}>
              {loading ? "Loading..." : "Verify"}
            </button>
          </form>
        );
      case 3:
        return (
          <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-5 mt-5 justify-center items-center">
          <span className='w-[100px]'><Image src={logo} alt="oli academy"/></span>
          {/* <h2 className="text-2xl font-semibold text-center my-2">Register OLI Academy!</h2> */}
          {error && (
            <div className="error bg-red-100 rounded-md text-center px-2 w-fit mx-auto my-2 py-0 text-red-600">
              {error}
            </div>
          )}
            <input className="w-full border border-slate-200 px-3 py-2 rounded-md focus:border-b-2 focus:border-b-primary-color outline-none" onFocus={inputFocusHandle}
              type="password"
              placeholder="Enter password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <input className="w-full border border-slate-200 px-3 py-2 rounded-md focus:border-b-2 focus:border-b-primary-color outline-none" onFocus={inputFocusHandle}
              type="password"
              placeholder="Confirm password"
              value={confirmPasswordInput}
              onChange={(e) => setConfirmPasswordInput(e.target.value)}
            />
            <button className="w-full bg-primary-color hover:bg-white hover:text-primary-color transition-all duration-300 text-white font-medium border border-primary-color rounded-md px-3 py-2" type="submit" disabled={loading}>
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
