"use client";
import logo from '@/public/images/logo.webp';
import Image from "next/image";
import { useEffect, useState } from "react";
import PhoneVerification from "./PhoneVerification";
import BoardList from './register/BoardList';
import DistrictList from './register/DistrictList';
import YearList from './register/YearList';

export default function RegisterForm({ handleSubmit }) {
  // State variables to manage form inputs and loading state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [institute_name, setInstituteName] = useState("");
  const [district, setDistrict] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [board, setBoard] = useState("");
  const [facebook_link, setFacebookLink] = useState("");
  const [user_logo_url, setUserLogoURI] = useState("");
  const [password, setPassword] = useState("");
  const [verified, setVerified] = useState(false);
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
      setPhoneNumber(verifiedPhoneNumber);
      setUserName(verifiedPhoneNumber);
      setPassword(verifiedPassword);
      setVerified(true); 
    }
  }, [phoneVerified, verifiedPhoneNumber, verifiedPassword]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const resUserExists = await fetch("api/userExists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    const { user } = await resUserExists.json();

    if (user) {
      setError("User already exists please Login!");
      setLoading(false); // Reset loading state
      return;
    }
  
    // Check if all required fields are filled
    if (!name || !email || !institute_name || !district || !course || !year || !board ) {
      setError("All fields are necessary.");
      return;
    }
  
    setLoading(true); // Move setLoading inside try block
  
    try {
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name, email, username, phone_number, institute_name, district, course, year, board, facebook_link, user_logo_url, verified, password,
        }),
      });
  
      if (res.ok) {
        const form = e.target;
        form.reset();
        window.location.href = "/login";
      } else {
        setError("User registration failed.");
      }
    } catch (error) {
      setError("Error during registration: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const inputFocusHandle = () => {
    setError("");
  };

  return (
    <>
      <div id="login_area" className="bg-[url('/images/bg-patern.webp')] w-full h-screen relative flex flex-col justify-center items-center my-5  p-2">
        <div className="container">
          <div className="login_box bg-white border border-slate-200 max-w-[400px] mx-auto p-10 py-[50px] justify-center items-center rounded-lg shadow-md">
            <span className='w-[100px] block mx-auto mb-[50px]'><Image src={logo} alt="oli academy"/></span>
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

                  <input onFocus={inputFocusHandle} onChange={(e) => setInstituteName(e.target.value)} className="input" type="text" name="institute" placeholder="School/College" id="" />

                  <select
                            onFocus={inputFocusHandle}
                            onChange={(e) => setDistrict(e.target.value)}
                            className="input"
                            name="district"
                            id=""
                            defaultValue=""
                            >
                            <option value="" disabled>Select District</option>
                            <DistrictList/>
                        </select>


                        <select
                            onFocus={inputFocusHandle}
                            onChange={(e) => setCourse(e.target.value)}
                            className="input"
                            name="course"
                            id=""
                            defaultValue="" // Set default value to empty
                        >
                            <option value="" disabled>SSC/HSC</option>
                            <option value="SSC">SSC</option>
                            <option value="HSC">HSC</option>
                        </select>

                        <select
                            onFocus={inputFocusHandle}
                            onChange={e => setYear(e.target.value)}
                            className="input"
                            name="Year"
                            id=""
                            defaultValue=""
                            >
                            <option value="" disabled>Select Year</option>
                            <YearList/>
                        </select>

                        <select
                            onFocus={inputFocusHandle}
                            onChange={e => setBoard(e.target.value)}
                            className="input"
                            name="board"
                            id=""
                            defaultValue=""
                            >
                            <option value="" disabled>Select Board</option>
                            <BoardList/>
                        </select>

                        <input onFocus={inputFocusHandle} onChange={e => setFacebookLink(e.target.value)}  className="input" type="text" name="facebooklink" placeholder="Facebook link (optional)" id="" />

                        <input onFocus={inputFocusHandle} onChange={e => setUserLogoURI(e.target.value)}  className="input" type="text" name="logo" placeholder="profile photo link (optional)" id="" />

                  <div className="absolute left-0 top-0 pointer-events-none select-none opacity-0">
                    <input value={phone_number} onFocus={inputFocusHandle} onChange={(e) => setPhoneNumber(e.target.value)} className="input" type="text" name="phone" placeholder="Enter Your Phone" id="" readOnly />
                    
                    <input value={username} onFocus={inputFocusHandle} onChange={(e) => setUserName(e.target.value)} className="input" type="text" name="username" placeholder="Enter Your Username" id="" readOnly />

                    <input value={password} onFocus={inputFocusHandle} onChange={(e) => setPassword(e.target.value)} className="input" type="password" name="password" placeholder="Enter Your Password" id=""  readOnly/>

                    <input value={verified} onFocus={inputFocusHandle} onChange={(e) => setVerified(e.target.value)} className="input" type="text" name="verified" placeholder="verified" id=""  readOnly/>
                  </div>

                  <button
                    className="btn"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Register"} {/* Show loading text or Register text */}
                  </button>
                </form>
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
