"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import PhoneVerification from "./PhoneVerification";

export default function RegisterForm({ handleSubmit }) {
  // State variables to manage form inputs and loading state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [verifiedPhoneNumber, setVerifiedPhoneNumber] = useState("");
  const [verifiedPassword, setVerifiedPassword] = useState("");

  // Function to handle phone verification completion
  const onComplete = (phone, pass) => {
    console.log("Phone verification and password setup completed");
    setPhoneVerified(true);
    setVerifiedPhoneNumber(phone);
    setVerifiedPassword(pass);
  };

// useEffect to update phone number and password fields when phoneVerified changes
useEffect(() => {
  if (phoneVerified) {
    setPhoneNumber(verifiedPhoneNumber); // Set phone number input to verified phone number
    setPassword(verifiedPassword); // Set password input to verified password
  }
}, [phoneVerified, verifiedPhoneNumber, verifiedPassword]);


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if all required fields are filled
    if (!name || !email || !phone_number || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone_number,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        window.location.href = "/login";
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to reset error state when input field is focused
  const inputFocusHandle = () => {
    setError("");
  };

  return (
    <>
      <div id="login_area" className="w-full h-screen relative flex flex-col justify-center items-center my-5">
        <div className="container">
          <div className="login_box border border-slate-100 max-w-[400px] mx-auto p-10 py-[50px] rounded-lg shadow-md">
            {phoneVerified ? (
              <>
                <h2 className="text-2xl font-semibold text-center my-2">Register OLI Academy!</h2>
                {error && (
                  <div className="error bg-red-100 rounded-md text-center px-2 w-fit mx-auto my-2 py-0 text-red-600">
                    {error}
                  </div>
                )}
                <form onSubmit={handleFormSubmit} action="" className="flex flex-col gap-5 mt-5">
                  <input onFocus={inputFocusHandle} onChange={(e) => setName(e.target.value)} className="input" type="text" name="name" placeholder="Enter Your Full Name" id="" />

                  <input onFocus={inputFocusHandle} onChange={(e) => setEmail(e.target.value)} className="input" type="email" name="email" placeholder="Enter Your Email" id="" />

                  <div className="absolute pointer-events-none opacity-0 select-none left-0 -z-0">
                  <input value={phone_number} onFocus={inputFocusHandle} onChange={(e) => setPhoneNumber(e.target.value)} className="input" type="text" name="phone" placeholder="Enter Your Phone" id="" readOnly />

                  <input value={password} onFocus={inputFocusHandle} onChange={(e) => setPassword(e.target.value)} className="input" type="password" name="password" placeholder="Enter Your Password" id=""  readOnly/>
                  </div>

                  <button
                    className="bg-primary-color hover:bg-white hover:text-primary-color transition-all duration-300 text-white font-medium border border-primary-color rounded-md px-3 py-2"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Register"} {/* Show loading text or Register text */}
                  </button>
                </form>
                <div className="mt-5 text-center">
                  <p>
                    Already have an account? <Link className="font-medium underline text-primary-color hover:text-primary-color" href={'/login'}>Login</Link>
                  </p>
                </div>
              </>
            ) : (
              <PhoneVerification onComplete={onComplete} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}