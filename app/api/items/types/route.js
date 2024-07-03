import { itemTypeZSchema } from "@/lib/zodSchema";
import connectMongo from "@/mongodb/connect";
import { ItemType } from "@/mongodb/schema";
import { NextResponse } from "next/server";


export async function GET(req){
    try{
        
        const db = connectMongo();
        const itemTypes = await ItemType.find()
        
        if(!itemTypes) return NextResponse.json({error:"No Item Found"},{status:404});

        return NextResponse.json(itemTypes,{status:200})
    }
    catch(e){
        return NextResponse.json({error:"Something went wrong"},{status:200})
    }
}

export async function POST(req){
    try{
        const db = connectMongo();

        const body = await req.json()

        //Zod Validation
        const zodV = itemTypeZSchema.safeParse(body)
        if(zodV.success==false) return NextResponse.json({error:"Bad Request Body"},{status:400});

        const itemTypeObj = {
            name: body.name,
            itemCount: body.itemCount
        }

        const itemTypeFound = await ItemType.findOne({name: itemTypeObj.name})
        if(itemTypeFound) return NextResponse.json({error:"Item-Type already exist"},{status:400});

        const itemType = new ItemType(itemTypeObj)
        await itemType.save()
        return NextResponse.json(itemType, {status:200})
    }
    catch(e){
        return NextResponse.json(e, {status:400})
    }
}
