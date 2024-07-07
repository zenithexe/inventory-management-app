"use client";
import React from "react";
import DataTable from "./DataTable";
import NavBar from "@/components/NavBar";
import AddItemButton from "./AddItemButton";
import UserAvatar from "@/components/UserAvatar";

function InventoryPage() {
  const data = [
    {
      itemId: 1,
      name: "Jalish",
      category: "B",
      quantity: 60,
      price: 100,
    },
    {
      itemId: 2,
      name: "Ricku",
      category: "C",
      quantity: 50,
      price: 101,
    },
    {
      itemId: 1,
      name: "Ricku",
      category: "A",
      quantity: 40,
      price: 120,
    },
    {
      itemId: 2,
      name: "Ricku",
      category: "B",
      quantity: 30,
      price: 130,
    },
    {
      itemId: 1,
      name: "Ricku",
      category: "N",
      quantity: 20,
      price: 150,
    },
    {
      itemId: 2,
      name: "Ricku",
      category: "A",
      quantity: 10,
      price: 100,
    },
    {
      itemId: 1,
      name: "Ricku",
      category: "Z",
      quantity: 10,
      price: 100,
    },
  ];

  const category = ["A", "B", "C", "Z", "N", "T", "R"];
  return (
    <>
      <div className="">
        <div className="mx-4 grid lg:grid-cols-6 grid-cols-4">
          <div className="flex flex-col lg:col-start-2 col-span-4">
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
                <UserAvatar />
              </div>
            </div>
            <div className="mb-10">
              <AddItemButton />
            </div>
            <div className="w-full">
              <DataTable data={data} category={category} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InventoryPage;
