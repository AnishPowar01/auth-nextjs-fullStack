import {connect} from  "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";

import jwt from "jsonwebtoken"

import bcryptjs from "bcryptjs";


connect();

export async function POST(request : NextRequest){
    try {

        const reqBody = await request.json();

        const {email, password} = reqBody;
        console.log(reqBody);

        // check if user exists or not

        const user = await User.findOne({email});

        if(!user)
        {
            return NextResponse.json({
                error : "User Does not Exists",
                status : 400,

            })
        }

        // validate the password

        const validPassword = await bcryptjs.compare(password, user.password);

        if(!validPassword)
        {
            return NextResponse.json({
                error : "Inavalid Password",
                status : 400,
            })
        }

        // create a token data
        const tokenData = {
            id : user._id,
            username: user.username,
            email : user.email
        }

        // create a token

        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!, {
            expiresIn : "1d"
        })


        // create a user cookie

        const response = NextResponse.json({
            message : "Login Successfully",
            success : true
        })

        response.cookies.set("token", token, 
        {
            httpOnly : true,
        })


        return response;

    } catch (error : any) {

        return NextResponse.json({
            error : error.message,
            status : 500,

        })
        
    }

}