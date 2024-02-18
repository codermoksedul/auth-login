"use client";
import Logo from '@/public/images/logo.webp';
import { signIn } from 'next-auth/react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function LoginForm() {
    const [username, setUsername] = useState(""); // Change state variable name to 'username'
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if all required fields are filled
        if (!username || !password) {
            setError("Please input your phone & password");
            return;
        }
        
        try {
            setLoading(true);
            const res = await signIn('credentials', {
                username,
                password,
                redirect:false,
            });
            if(res.error){
                setError("Invalid Phone or Password");
                setLoading(false);
                return;
            }

            router.replace("dashboard");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <>
            <div id="login_area" className='w-full h-screen relative flex flex-col justify-center items-center p-2'>
                <div className="container">
                    <div className="login_box border border-slate-100 max-w-[400px] mx-auto p-5 rounded-lg shadow-md">
                        <span className='w-[80px] block text-center mx-auto py-3'><Image src={Logo} alt="oli academy"/></span>
                        <h2 className="text-2xl font-semibold text-center my-2">Login OLI Academy!</h2>
                        {error && (
                            <div className="error bg-red-100 rounded-md text-center px-2 w-fit mx-auto my-2 py-0 text-red-600">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} action="" className="flex flex-col gap-5 mt-5">
                            <input onChange={e => setUsername(e.target.value)} className="border border-slate-200 px-3 py-2 w-full rounded-md focus:border-b-2 focus:border-b-primary-color outline-none" type="text" name="phone number" placeholder="Phone Number" id=""/>
                            <input onChange={e => setPassword(e.target.value)} className="border border-slate-200 px-3 py-2 w-full rounded-md focus:border-b-2 focus:border-b-primary-color outline-none" type="password" name="password" placeholder="Password" id=""/>
                            
                            <div className=" text-start text-sm">
                                <Link className="font-medium underline text-primary-color hover:text-primary-color" href={'/reset-password'}>Forgot password?</Link>
                            </div>
                            <button className="bg-primary-color hover:bg-white hover:text-primary-color transition-all duration-300 text-white font-medium border border-primary-color rounded-md px-3 py-2" type="submit">
                                {loading ? "Loading..." : "Login"}
                            </button>
                        </form>
                        <div className="mt-5 text-center">
                            <p>Don't have account? <Link className="font-medium underline text-primary-color hover:text-primary-color" href={'/register'}>Register</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginForm;
