import {connect} from  "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";

import bcryptjs from "bcryptjs";



connect();

export async function POST(request: NextRequest)
{
    try {

        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        console.log(reqBody);

        // check if user already exits

        const user = await User.findOne({email})

        if(user)
        {
            return NextResponse.json({
                status : 400,
                error : "User Already Exists"
            })
        }


        // hash the password

        const salt = await bcryptjs.genSalt(10);

        const hashedPassword = await bcryptjs.hash(password,salt);

        const newUser = new User({
            username, 
            email,
            password : hashedPassword
        })

        const savedUser = await newUser.save();

        console.log(savedUser);

        return NextResponse.json({
            status : 201,
            message : "User Created Successfully",
            success : true,
            savedUser
        })

        
    } catch (error : any) {
        return NextResponse.json({
            status : 500,
            error : error.message,
        })
        
    }
}