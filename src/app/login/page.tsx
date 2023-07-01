"use client"
import Link from "next/link";
import React, { useEffect } from "react"
import { useRouter } from "next/navigation";
import { Toaster, toast  } from 'react-hot-toast';


import axios from "axios";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email : "",
        password : "",
    });

    const [buttonDisabled, setButonDisabled] = React.useState(false);

    useEffect(()=>{

        if(user.email.length > 0 && user.password.length > 0)
        {
            setButonDisabled(false);
        }else{
            setButonDisabled(true);
        }
    },[user])


    const [loading , setLoading] = React.useState(false)

    const onLogin = async() =>{

        try {

            setLoading(true);

            const response = await axios.post("/api/users/login", user)
            console.log("Login Successfully", response.data);
            toast.success("Login Successfulluy", { duration: 5000 });
            router.push("/profile")
            
        } catch (error : any) {


            toast.error("Something Went Kharab" , { duration: 5000 })


            console.log("Login failed", error.message);
            
        }finally {
            setLoading(false)
        }


    }

    return (
       
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-center text-white text-2xl">Login</h1>
            <hr />
           
            <label htmlFor="username">Email</label>
            <input className="text-black p-2 border border-gray-300 rounded-md mb-4 mt-3 focus:outline-none focus:border-gray-600 " type="email" id="email"
            value={user.email}
            onChange={(e)=> setUser({...user, email : e.target.value})}
            placeholder="email"
            />
            <label htmlFor="username">UserName</label>
            <input className="text-black p-2 border border-gray-300 rounded-md mb-4 mt-3 focus:outline-none focus:border-gray-600 " type="password" id="password"
            value={user.password}
            onChange={(e)=> setUser({...user, password : e.target.value})}
            placeholder="password"
            />

            <button
            onClick={onLogin}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >
             Login
            </button>

            {/* <Link href="/signup">
                 new user | SignUp here
            </Link> */}
            <p>New User <span className="text-blue-300 hover:underline  transition-all duration-200">
                <Link href="/signup">
                    SignUp Here
                </Link>
            </span>
            </p>
        </div>
    

    );
}