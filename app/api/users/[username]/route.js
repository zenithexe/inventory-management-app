import connectMongo from "@/mongodb/connect";
import { User } from "@/mongodb/schema";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req, { params: { username }}){
    try{
        
        
        const db = connectMongo();
        const user = await User.findOne({username: username })
        
        if(!user) return NextResponse.json({message:'User Not Found'},{status:404});

        return NextResponse.json(user,{status:200})

    }
    catch(e){
        return NextResponse.json({error:"Something went wrong!"},{status:400})
    }
}