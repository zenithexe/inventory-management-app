"use server";

import { categoryZSchema } from "@/lib/zodSchema";
import connectMongo from "@/mongodb/connect";
import { Category } from "@/mongodb/schema";

export const addCategory = async (category) => {
  const db = connectMongo();
  const zodV = categoryZSchema.safeParse(category);
  if (zodV.success == false)
    return JSON.stringify({
      success: false,
      message: "Server-Error: Bad Body Request.",
    });
  const categoryObj = {
    categoryId: category.categoryId,
    name: category.name,
    itemCount: category.itemCount,
  };
  
  try {
    const categoryFound = await Category.findOne({
      categoryId: categoryObj.categoryId,
    });
    if (categoryFound)
      return JSON.stringify({
        success: false,
        message: "Category ID already exists.",
      });

    const category = new Category(categoryObj);
    await category.save();

    return JSON.stringify({ success: true, category: category });
  } catch (err) {
    console.log("Error", err);
    return JSON.stringify({ success: false, message: "Server-side Error." });
  }
};

export const updateCategory = async (category) => {
  try {
    const db = await connectMongo();
    const result = await Category.findOneAndUpdate(
      { categoryId: category.categoryId },
      {
        name: category.name,
      },
      { new: true }
    );
    if (!result) return { success: false, message: "Error: Can't Update." };

    return JSON.stringify({ success: true, category: result });
  } catch (err) {
    console.log("Error ::", err);
    return { success: false, message: "Server Error." };
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const db = connectMongo();
    const result = await Category.deleteOne({ categoryId: categoryId });
    if (!result.acknowledged)
      return { success: false, message: "There is some Error" };
    console.log(result);
    return JSON.stringify({ success: true, result: result });
  } catch (err) {
    console.log("Error ::", err);
    return { success: false, message: "Server Error" };
  }
};
