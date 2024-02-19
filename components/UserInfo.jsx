"use client";
import { signOut, useSession } from "next-auth/react";

function UserInfo() {
  const {data: session} = useSession();
  console.log(session);
  return (
    <>
        <div className="w-full min-h-screen flex justify-center items-center">
          <div className="userInfo_area border border-slate-100 shadow-md rounded-md w-full max-w-[400px] p-5">
            <h2 className="text-center text-2xl font-medium my-2">User Info:</h2>
            <div className="font-medium text-xl">Name: <span>{session?.user?.name}</span></div>
            <div className="font-medium text-xl">Username: <span>{session?.user?.username}</span></div>
            <div className="font-medium text-xl">Email: <span>{session?.user?.email}</span></div>
            <div className="font-medium text-xl">Phone: <span>{session?.user?.phone_number}</span></div>
            <div className="font-medium text-xl">District: <span>{session?.user?.district}</span></div>
            <div className="font-medium text-xl">Institute Name: <span>{session?.user?.institute_name}</span></div>
            <div className="font-medium text-xl">Course: <span>{session?.user?.course}</span></div>
            <div className="font-medium text-xl">Year: <span>{session?.user?.year}</span></div>
            <div className="font-medium text-xl">Board: <span>{session?.user?.board}</span></div>
            <div className="font-medium text-xl">Facebook Link: <span>{session?.user?.facebook_link}</span></div>
            <div className="font-medium text-xl">User Logo URL: <span>{session?.user?.user_logo_url}</span></div>
            <div className="font-medium text-xl">Verified: <span>{session?.user?.verified ? 'Yes' : 'No'}</span></div>
            <button onClick={() => signOut()} className="bg-red-600 px-5 py-1 rounded-md mx-auto block my-5 text-white font-semibold">Log Out</button>
          </div>
        </div>
    </>
  )
}

export default UserInfo