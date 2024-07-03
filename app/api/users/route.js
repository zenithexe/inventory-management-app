import { hashPassword } from "@/lib/encrypt";
import { userZSchema } from "@/lib/zodSchema";
import connectMongo from "@/mongodb/connect";
import { User } from "@/mongodb/schema";

import { NextResponse } from "next/server";


export async function GET(req){
    try{
       
        const db = connectMongo();  
        const users = await User
            .find()
            .select({username:1,name:1,isAdmin:1,_id:0})

        return NextResponse.json(users,{status: 200})
    }
    catch(e){
        return NextResponse.json({error:"Bad Request"},{status:400})
    }
}

export async function POST(req){
    try{
        const db = connectMongo();
        const body = await req.json();

        //Zod Validation
        const zodV = userZSchema.safeParse(body);
        if(zodV.success==false) return NextResponse.json({error:"Bad Request Body"},{status:400});

        const hpassword = await hashPassword(body.password)
        const userObj = {
            name: body.name,
            username: body.username,
            hpassword: hpassword,
            isAdmin: body.isAdmin
        }

        //Searching if User Already Exist
        const userFound = await User.findOne({username: userObj.username})
        console.log("userFound :", userFound)
        if(userFound) return NextResponse.json({error:"User Already Exist"},{status:400});

        //Created User in DB
        const user = new User(userObj)
        await user.save()
        return NextResponse.json({user}, {status:200})
    }
    catch(e){
        return NextResponse.json({e},{status:400})
    }
}