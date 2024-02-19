"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

function UserInfo() {
  const {data: session} = useSession();
  return (
    <>
        <div className="w-full min-h-screen flex justify-center items-center">
            <div className="userInfo_area border border-slate-100 shadow-md rounded-md w-full max-w-[400px] p-5">
                <h2 className="text-center text-2xl font-medium my-2">User Info:</h2>
                <div className="font-medium text-xl">Name: <span>{session?.user?.name}</span></div>
                <div  className="font-medium text-xl">Email: <span>{session?.user?.email}</span></div>
                <button onClick={ () => signOut()} className="bg-red-600 px-5 py-1 rounded-md mx-auto block my-5 text-white font-semibold">Log Out</button>
            </div>
        </div>
    </>
  )
}

export default UserInfo