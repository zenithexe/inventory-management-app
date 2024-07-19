import React from "react";
import AddCategoryButton from "./AddCategoryButton";
import CategoryTable from "./CategoryTable";
import UserAvatar from "@/components/UserAvatar";
import { auth } from "../auth";
import { redirect } from "next/navigation";
import connectMongo from "@/mongodb/connect";
import { Category } from "@/mongodb/schema";

export default async function CategoryPage() {
  const session = await auth()
  if(!session) redirect('/login')

  const db = connectMongo()
  const categoryDB = await Category.find().sort({_id:-1})
  const category = JSON.parse(JSON.stringify(categoryDB))
  
  return (
    <>
      <div className="ml-16 mb-20">
        <div className="w-full grid lg:grid-cols-8 grid-cols-10">
          <div className="flex flex-col col-start-2 col-span-8 lg:col-start-2 lg:col-span-6">
            <div className="flex justify-between pt-4 mb-[50px]">
              <div>
                <h1 className="text-[30px] font-mono font-semibold">
                  Item Category
                </h1>
                <p className="font-mono">Add or Manage the Item Categories.</p>
              </div>
              <div className="pt-2">
                <UserAvatar session={session} />
              </div>
            </div>
            {session.user.isAdmin && <div className="mb-10 flex gap-2"> <AddCategoryButton /></div>}
            <div className="w-full">
              <CategoryTable data={category} session={session} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
