"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";



import { Button } from "@/components/ui/button";

import { MoreHorizontal } from "lucide-react";
import EditItemDialogBox from "./EditItemDialogBox";
import { getItem } from "@/action/items";
import ViewItemDialogBox from "./ViewItemDialogBox";
import DeleteItemAlert from "./DeleteItemAlert";




export default function ItemDropdownMenu({session, row , category }) {
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [itemData, setItemData ] = useState({});

  let isMount = useRef(false);
 

  const getItemDetails = async ()=>{
    const item =  await getItem(row.getValue('itemId'))
    setItemData(item)
  }

  useEffect(()=>{
    if(isMount.current){
      getItemDetails()
      
    }else{
      isMount.current=true
    }

  },[editOpen])


  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={(e)=> setViewOpen(true)}>View Item</DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => setEditOpen(true)}>
            Edit
          </DropdownMenuItem>
          {session.user.isAdmin && 
          <DropdownMenuItem onClick={(e)=> setDeleteOpen(true)}>Delete</DropdownMenuItem>}
        </DropdownMenuContent>
      </DropdownMenu>
      <EditItemDialogBox itemData={itemData} categoryList={category} open={editOpen} onOpenChange={setEditOpen} />
      <ViewItemDialogBox itemData={itemData} open={viewOpen} onOpenChange={setViewOpen} />
      <DeleteItemAlert itemData={itemData} open={deleteOpen} onOpenChange={setDeleteOpen} />
    </>
  );
}


