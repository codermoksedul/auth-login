"use client"
import Logo from '@/public/images/logo.webp';
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from "react";

function ForgetPassword() {
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [otp, setOtp] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State for showing success popup
  const staticOtp = "1"; // Static OTP value
  const router = useRouter();

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Check if all required fields are filled
    if (!phoneNumberInput) {
      setError("Enter phone number");
      setLoading(false);
      return;
    }
  
    // Remove leading +880 if present
    let processedPhoneNumber = phoneNumberInput.trim().replace(/^\+880/, '');
  
    // Validate Bangladeshi phone number format
    const bangladeshiNumberRegex = /^(?:01)[13-9]\d{8}$/;
    if (!bangladeshiNumberRegex.test(processedPhoneNumber)) {
      setError("Enter a valid phone number");
      setLoading(false);
      return;
    }
  
    // Set the processed phone number for further processing
    setPhoneNumberInput(processedPhoneNumber);
  
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
    if (!otp) {
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
      // Show success popup
      setShowSuccessPopup(true);
      setLoading(false);
    }, 1000); // Delay for 2 seconds before showing success popup
  };
  
  

  // Function to reset error state when input field is focused
  const inputFocusHandle = () => {
    setError("");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
            <div id="login_area" className='w-full h-screen relative flex flex-col justify-center items-center  p-2'>
                <div className="container">
                    <div className="login_box border border-slate-100 max-w-[400px] mx-auto p-5 rounded-lg shadow-md">
                        <span className='w-[80px] block text-center mx-auto py-3'><Image src={Logo} alt="oli academy"/></span>
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
                            {loading ? "Sending..." : "Send OTP"}
                            </button>
                        </form>
                            <div className="mt-5 text-center">
                                <p>Use password to <Link className="font-medium underline text-primary-color hover:text-primary-color" href={'/login'}>login. </Link></p>
                            </div>
                    </div>
                </div>
            </div>
        );
      case 2:
        return (
            <div id="login_area" className='w-full h-screen relative flex flex-col justify-center items-center  p-2'>
                <div className="container">
                    <div className="login_box border border-slate-100 max-w-[400px] mx-auto p-5 rounded-lg shadow-md">
                        <span className='w-[80px] block text-center mx-auto py-3'><Image src={Logo} alt="oli academy"/></span>
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
                    </div>
                </div>
            </div>
        );
      case 3:
        return (
            <div id="login_area" className='w-full h-screen relative flex flex-col justify-center items-center  p-2'>
                <div className="container">
                    <div className="login_box border border-slate-100 max-w-[400px] mx-auto p-5 rounded-lg shadow-md relative m-2">
                        <span className='w-[80px] block text-center mx-auto py-3'><Image src={Logo} alt="oli academy"/></span>
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
                            {showSuccessPopup && (
                            <div className="bg-white p-5 rounded-md shadow-md absolute top-0 left-0 w-full h-full flex justify-center items-center flex-col gap-7">
                                <span className='bg-primary-color text-white p-2 rounded-full w-[60px] h-[60px] flex flex-col justify-center items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>

                                </span>
                            <p className="text-slate-800 font-semibold text-xl text-center">Password saved successfully!</p>
                            <Link href={'/login'} className="btn w-full max-w-[200px]">Login</Link>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
         {renderStep()}
    </>
  );
}

export default ForgetPassword;
