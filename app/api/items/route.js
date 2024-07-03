import { itemZSchema } from "@/lib/zodSchema";
import connectMongo from "@/mongodb/connect";
import { Item } from "@/mongodb/schema";
import { NextResponse } from "next/server";


export async function GET(req){
    try{
        const db = connectMongo();
        const items = await Item.find().populate('category')
        
        if(!items) return NextResponse.json({error:"No Item Found"},{status:404});

        return NextResponse.json(items,{status:200})
    }
    catch(e){
        NextResponse.json({error:"Something went wrong"},{status:200})
    }
}

export async function POST(req){
    try{
        const db = connectMongo();
        const body = req.json()

        //Zod Validation
        const zodV = itemZSchema.safeParse(body)
        if(zodV.success==false) return NextResponse.json({error:"Bad Request Body"},{status:400});

        const itemObj = {
            itemId: body.itemId,
            name: body.name,
            description: body.description,
            quantity: body.quantity,
            price: body.price,
            category: body.category
        }

        const itemFound = await Item.findOne({itemId: itemObj.itemId})
        if(itemFound) return NextResponse.json({error:"ItemId already exist"},{status:400});

        const item = new Item(itemObj)
        await item.save()
        return NextResponse.json({item}, {status:200})
    }
    catch(e){
        return NextResponse.json({e}, {status:400})
    }
}
