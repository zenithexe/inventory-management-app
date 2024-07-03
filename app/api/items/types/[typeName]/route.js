import connectMongo from "@/mongodb/connect";
import { ItemType } from "@/mongodb/schema";
import { NextResponse } from "next/server";

export async function GET(req, {params:{ typeName }}){
    try{
        const db = connectMongo();

        const itemType = await ItemType.findOne({name: typeName})

        if(!itemType) return NextResponse.json({error:"Item Type not found"},{status:404});

        return NextResponse.json({itemType},{status:200} )
    }
    catch(e){
        return NextResponse.json({error:"Something went wrong"},{status:400})
    }
}