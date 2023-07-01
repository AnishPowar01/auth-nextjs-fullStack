"use client"
import Link from "next/link";
import React, { useEffect } from "react"
import { useRouter } from "next/navigation";

import axios from "axios";
import { Toaster, toast } from 'react-hot-toast';

export default function LoginPage() {
    const router = useRouter()
    const [user, setUser] = React.useState({
        email : "",
        password : "",
        username: "",
    });

    const [buttonDisabled, setButonDisabled] = React.useState(false);

    useEffect(()=>{

        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0)
        {
            setButonDisabled(false);
        }else{
            setButonDisabled(true);
        }
    },[user])


    const [loading , setLoading] = React.useState(false)

    const onSignup = async() =>{
        try {

            setLoading(true);

            const response = await axios.post("/api/users/signup", user)

            console.log(response.data)

          
            toast.success("Signup SuccessFully" , { duration: 5000 });
            router.push("/login")
            
        } catch (error : any) {
            toast.error("Something Went Kharab" , { duration: 5000 })
            console.log("Signup Failed", error.message)
        }finally{
            setLoading(false)
        }

    }

    return (
       
        
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-center text-white text-2xl">SignUp</h1>
            <hr />
            <label htmlFor="username">UserName</label>
            <input className="p-2 border border-gray-300 rounded-md mb-4 mt-3 focus:outline-none focus:border-gray-600 text-black" type="text" id="username"
            value={user.username}
            onChange={(e)=> setUser({...user, username : e.target.value})}
            placeholder="username"
            />

            <label htmlFor="username">Email</label>
            <input className="p-2 border border-gray-300 rounded-md mb-4 mt-3 focus:outline-none focus:border-gray-600 text-black" type="email" id="email"
            value={user.email}
            onChange={(e)=> setUser({...user, email : e.target.value})}
            placeholder="email"
            />
            <label htmlFor="username">UserName</label>
            <input className="p-2 border border-gray-300 rounded-md mb-4 mt-3 focus:outline-none focus:border-gray-600 text-black" type="password" id="password"
            value={user.password}
            onChange={(e)=> setUser({...user, password : e.target.value})}
            placeholder="password"
            />

            <div className="flex items-center gap-4">
            <button
            onClick={onSignup}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
            >
             {buttonDisabled ? " No Sign Up" : " Sign Up"}
            </button>

            <Link href="/login">
                <span className="bg-orange-500 text-black p-2 rounded-lg font-bold" >Login Here</span>
            </Link>
            </div>
        </div>

    );
}