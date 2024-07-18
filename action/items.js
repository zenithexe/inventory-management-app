"use server";

import connectMongo from "@/mongodb/connect";
import { Item } from "@/mongodb/schema";

export const getItem = async (itemId) => {
  try {
    const db = await connectMongo();
    const item = await Item.findOne({ itemId: itemId }).populate("category");
    if (!item)
      return JSON.parse(
        JSON.stringify({ success: false, error: "Item ID doesn't exists." })
      );

    return JSON.parse(JSON.stringify({ success: true, item: item }));
  } catch (err) {
    return JSON.parse(
      JSON.stringify({ success: false, error: "Internal Server Error." })
    );
  }
};

export const updateItem = async (item) => {
  try {
    const db = connectMongo();

    const result = await Item.findOneAndUpdate(
      { _id: item.id },
      {
        name: item.name,
        category: item.category,
        description: item.description,
        quantity: item.quantity,
        price: item.price,
      },
      {new: true}
    );

    if(!result) return {success:false, message:"Error: Can't Update."}

    return JSON.stringify({success:true, item: result})
    
  } catch (err) {
    console.log("Error ::", err);
    return {success:false, message: "Server Error."}
  }
};

export const deleteItem = async (itemId) => {
  try{
    const db = connectMongo();
    const result = await Item.deleteOne({itemId:itemId})
    if(!result.acknowledged) return {success:false, message:"There is some Error"}

    
    return JSON.stringify({success:true, result:result})

  }catch(err){
    console.log("Error ::", err)
    return {success:false, message:"Server Error."}
  }
  
}
