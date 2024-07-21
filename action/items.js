"use server";

import { itemZSchema } from "@/lib/zodSchema";
import connectMongo from "@/mongodb/connect";
import { Category, Item } from "@/mongodb/schema";

export const addItem = async (itemReq) => {
  const item = {
    itemId: itemReq.itemId,
    name: itemReq.name,
    description: itemReq.description,
    quantity: parseInt(itemReq.quantity),
    price: parseInt(itemReq.price),
    category: itemReq.category,
  };

  const zodV = itemZSchema.safeParse(item);
  if (zodV.success == false)
    return JSON.stringify({ success: false, message: "Bad Request Body" });
  try {
    const itemFound = await Item.findOne({ itemId: item.itemId });
    if (itemFound)
      return JSON.stringify({
        success: false,
        message: "Item ID already exists.",
      });

    const categoryFound = await Category.findOne({ _id: item.category });
    if (!categoryFound)
      return JSON.stringify({
        success: false,
        message: "Category doesn't exists.",
      });

    const categoryItemCount = categoryFound.itemCount + 1;

    const itemDB = new Item(item);
    await itemDB.save();

    const categoryUpdateResult = await Category.findOneAndUpdate(
      { _id: categoryFound._id },
      {
        itemCount: categoryItemCount,
      }
    );

    return JSON.stringify({ success: true, item: item });
  } catch (err) {
    console.log("Error ::", err);
    return JSON.stringify({ success: false, message: "Server-side Error." });
  }
};

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
      { new: true }
    );

    if (!result) return { success: false, message: "Error: Can't Update." };

    return JSON.stringify({ success: true, item: result });
  } catch (err) {
    console.log("Error ::", err);
    return { success: false, message: "Server Error." };
  }
};

export const deleteItem = async (itemId) => {
  try {
    const db = connectMongo();
    const result = await Item.deleteOne({ itemId: itemId });
    if (!result.acknowledged)
      return { success: false, message: "There is some Error" };

    return JSON.stringify({ success: true, result: result });
  } catch (err) {
    console.log("Error ::", err);
    return { success: false, message: "Server Error." };
  }
};
