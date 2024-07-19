import React from "react";
import DataTable from "./DataTable";
import NavBar from "@/components/NavBar";
import AddItemButton from "./AddItemButton";
import UserAvatar from "@/components/UserAvatar";
import { auth } from "../auth";
import { redirect } from "next/navigation";
import connectMongo from "@/mongodb/connect";
import { Category, Item } from "@/mongodb/schema";

export default async function InventoryPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const db = connectMongo();

  // const res1 = await fetch("http://localhost:3000/api/items/types");
  // const category = await res1.json();

  // const res2 = await fetch("http://localhost:3000/api/items");
  // const items = await res2.json()

  const categoryDB = await Category.find();
  const category = JSON.parse(JSON.stringify(categoryDB));

  const itemsDB = await Item.find().populate("category").sort({_id:-1});
  const items = JSON.parse(JSON.stringify(itemsDB));

  const data = items.map((item) => {
    return {
      ...item,
      category: item.category.name,
    };
  });

  const categoryFilterValues = category.map((item) => item.name);

  return (
    <>
      <div className="ml-16 mb-20">
        <div className="w-full grid lg:grid-cols-8 grid-cols-10">
          <div className="flex flex-col col-start-2 col-span-8 lg:col-start-2 lg:col-span-6">
            <div className="flex justify-between pt-4 mb-[50px]">
              <div>
                <h1 className="text-[30px] font-mono font-semibold">
                  Inventory
                </h1>
                <p className="font-mono">
                  This Page contains all the items present in the inventory.
                </p>
              </div>
              <div className="pt-2">
                <UserAvatar session={session}/>
              </div>
            </div>
            <div className="w-full">
              <DataTable
                data={data}
                category={category}
                categoryFilters={categoryFilterValues}
                session={session}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
