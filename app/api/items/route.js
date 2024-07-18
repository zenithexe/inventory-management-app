import { itemZSchema } from "@/lib/zodSchema";
import connectMongo from "@/mongodb/connect";
import { Category, Item } from "@/mongodb/schema";
import { NextResponse } from "next/server";


export async function GET(req){
    try{
        const db = await connectMongo();
        
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
        const body = await req.json()


        const itemObj = {
            itemId: body.itemId,
            name: body.name,
            description: body.description,
            quantity: parseInt(body.quantity),
            price: parseInt(body.price),
            category: body.category
        }

        //Zod Validation
        const zodV = itemZSchema.safeParse(itemObj)
    
        if(zodV.success==false) return NextResponse.json({error:"Server : Bad Body Request"},{status:400});

    
        const itemFound = await Item.findOne({itemId: itemObj.itemId})
        if(itemFound) return NextResponse.json({error:"ItemId already exist"},{status:400});

        const categoryFound = await Category.findOne({_id: itemObj.category})
        if(!categoryFound) return NextResponse.json({error:"Category Not Found"},{status:400});
        
        const count = categoryFound.itemCount + 1;

        const item = new Item(itemObj)
        console.log("Item Created :::", item)
        await item.save()
        console.log("Item Saved:::::")

        const categoryCountResult = await Category.findOneAndUpdate(
            {_id: categoryFound._id},
            {
                itemCount: count,
            },
        )
        
        return NextResponse.json({item}, {status:200})
    }
    catch(err){
        return NextResponse.json({Error:err}, {status:400})
    }
}
