"use client"
import axios from "axios";

import Link from "next/link";

import {toast} from "react-hot-toast"

import { useRouter } from "next/navigation";

export default function ProfilePage()
{
    const router = useRouter();

    const handleLogOut = () =>{

        try {

            const response = axios.get("/api/users/logout")
            toast.success("LogOut Successfully");
            router.push("/login")

        } catch (error : any) {

            console.log(error.message);

            toast.error("Logout Failed", {
                duration : 5000
            })


            
        }

    }
    return(

        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <hr />
            <button onClick={handleLogOut} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-4">
                LogOut
            </button>
        </div>

    );
}