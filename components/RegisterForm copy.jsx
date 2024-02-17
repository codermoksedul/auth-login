"use client";
import { useState } from "react";
import PhoneVerification from "./PhoneVerification";

export default function RegisterForm({ handleSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [verifiedPhoneNumber, setverifiedPhoneNumber] = useState("");
  const [verifiedpassword, setVerifiedPassword] = useState("");


  const onComplete = (phone, pass) => {
    console.log("Phone verification and password setup completed");
    setPhoneVerified(true);
    setverifiedPhoneNumber(phone);
    setVerifiedPassword(pass);
  };

    // Function to handle form submission
    const handleFormSubmit = async (e) => {
      e.preventDefault();

      try {
  
        const res = await fetch("http://localhost:3000/api/register", {
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
      } 
    };
  

  return (
    <div id="login_area" className="w-full h-screen relative flex flex-col justify-center items-center my-5">
      <div className="container">
        <div className="login_box border border-slate-100 max-w-[400px] mx-auto p-5 rounded-lg shadow-md">
          {phoneVerified ? (
            
          ) : (
            <PhoneVerification onComplete={onComplete} />
          )}
        </div>
      </div>
    </div>
  );
}
