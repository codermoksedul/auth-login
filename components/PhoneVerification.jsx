"use client";
import { useEffect, useState } from "react";

function PhoneVerification({ onComplete }) {
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [otp, setOtp] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userExists, setUserExists] = useState(false); // New state to track user existence

  const staticOtp = "1"; // Static OTP value

  // Function to check if a user with the provided phone number already exists
  const checkUserExists = async () => {
    setLoading(true);

    try {
      setLoading(true);
      const res = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: phoneNumberInput }),
      });

      const { user } = await res.json();

      if (user) {
        setError("User already exists");
        setLoading(false);
        setUserExists(true);
      } else {
        setUserExists(false);
        setLoading(true);
        setStep(2); 
      }
    } catch (error) {
      setError("Error checking user existence");
    }

    setLoading(false);
  };


  useEffect(() => {
    // Remove non-numeric characters from phone number input
    setPhoneNumberInput(phoneNumberInput.replace(/\D/g, ""));
  }, [phoneNumberInput]);

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
  
    // Check if all required fields are filled
    if (!phoneNumberInput) {
      setError("Enter your phone number");
      return;
    }
  
    // Remove leading +880 if present
    let processedPhoneNumber = phoneNumberInput.trim().replace(/^\+880/, '');
  
    // Validate Bangladeshi phone number format
    const bangladeshiNumberRegex = /^(?:01)[13-9]\d{8}$/;
    if (!bangladeshiNumberRegex.test(processedPhoneNumber)) {
      setError("Enter a valid phone number");
      return;
    }
  
    // Set the processed phone number for further processing
    setPhoneNumberInput(processedPhoneNumber);
  
    // Show loading animation after a 2-second delay
    setLoading(true);
    setTimeout(async () => {
      try {
        // Check if the user exists
        const res = await fetch("api/userExists", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: processedPhoneNumber }),
        });
  
        const { user } = await res.json();
  
        if (user) {
          setError("User already exists");
          setUserExists(true);
        } else {
          setUserExists(false);
          setStep(2); // Proceed to OTP verification step
        }
      } catch (error) {
        setError("Error checking user existence");
      } finally {
        setLoading(false); // Hide loading animation after API call
      }
    }, 1000); // 2-second delay
  };
  

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulating a delay for demonstration purposes (you may replace this with your actual asynchronous OTP verification process)
    // Check if all required fields are filled
    if (!otp) {
      setError("Enter OTP");
      setLoading(false);
      return;
    }

    // Simulate OTP verification
    setTimeout(() => {
      if (otp === staticOtp) {
        setStep(3);
      } else {
        setError("Invalid OTP. Please try again.");
        setOtp("");
      }
      setLoading(false);
    }, 1000);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!passwordInput) {
      setError("Enter Your New Password");
      setLoading(false);
      return;
    }
    if (!confirmPasswordInput) {
      setError("Enter Your Confirm Password");
      setLoading(false);
      return;
    }

    // Password complexity check
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_+=])[a-zA-Z0-9!@#$%^&*()-_+=]{6,20}$/;
    if (!passwordRegex.test(passwordInput)) {
      setError("Provide a strong password");
      setLoading(false);
      return;
    }

    if (passwordInput !== confirmPasswordInput) {
      setError("Passwords do not match");
      setLoading(false);
      setPasswordInput("");
      setConfirmPasswordInput("");
      return;
    }

    // Simulate a delay for demonstration purposes
    setTimeout(() => {
      onComplete(phoneNumberInput, passwordInput); // Passing verified phone number and password to the parent component
      setLoading(false);
    }, 1000); // Delay for 2 seconds before proceeding
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
              type="text" name="phone number"
              placeholder="Enter phone number"
              value={phoneNumberInput}
              onChange={(e) => setPhoneNumberInput(e.target.value)}
            />
            <button className="w-full btn"
                    type="submit" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
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
              {loading ? "Verifying..." : "Verify"}
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
              {loading ? "Saving..." : "Save Password"}
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
