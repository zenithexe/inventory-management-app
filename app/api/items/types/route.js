import { categoryZSchema } from "@/lib/zodSchema";
import connectMongo from "@/mongodb/connect";
import { Category } from "@/mongodb/schema";
import { NextResponse } from "next/server";


export async function GET(req){
    try{
        
        const db = connectMongo();
        const category = await Category.find()
        
        if(!category) return NextResponse.json({error:"No Item Found"},{status:404});

        return NextResponse.json(category,{status:200})
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
        const zodV = categoryZSchema.safeParse(body)
        if(zodV.success==false) return NextResponse.json({error:"Bad Request Body"},{status:400});

        const categoryObj = {
            categoryId: body.categoryId,
            name: body.name,
            itemCount: body.itemCount
        }

        const categoryFound = await Category.findOne({categoryId: categoryObj.categoryId})
        if(categoryFound) return NextResponse.json({error:"Category ID already exists."},{status:400});

        const category = new Category(categoryObj)
        await category.save()
        return NextResponse.json(category, {status:200})
    }
    catch(e){
        return NextResponse.json(e, {status:400})
    }
}
