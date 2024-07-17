"use client";
import { Button } from "@/components/ui/button";
import { CodeSquare, FolderPlus } from "lucide-react";
import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";


function AddItemButton({ category }) {

  const router = useRouter()
  const {toast} = useToast()

  const [dialogOpen, setDialogOpen] = useState(false);

  const [error, setError] = useState({
    error: false,
    message:"",
  })

  useEffect(()=>{
    setError({error:false, message:""})
  },[dialogOpen])

  async function handleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);

    const itemId = formData.get("itemId")
    const name = formData.get("name")
    const category = formData.get("category")
    const description = formData.get("description")
    const quantity = formData.get("quantity")
    const price = formData.get("price")

    if(!itemId) return setError({error:true, message:"Item ID required."})
    if(!name) return setError({error:true, message:"Item name required."})
    if(!category) return setError({error:true, message:"Select a category."})
    if(!description) return setError({error:true, message:"Item description required."})
    if(!quantity) return setError({error:true, message:"Quantity is missing."})
    if(!price) return setError({error:true, message:"Price is missing."})

    const item = {
      itemId,
      name,
      category,
      description,
      quantity,
      price,
    }


    try {
      const res = await fetch('http://localhost:3000/api/items', {
        method: 'POST',
        body: JSON.stringify(item),
      })
      const body = await res.json();
    
      console.log(body);

      if(!res.ok){
        setError({error:true, message:body.error})
        return
      }

      toast({
        title:`${body.item.name} Added`,
        description:"Item successfully added to inventory.",
      })

      setDialogOpen(false)
      router.refresh()

    } catch(err) {
      console.log("There is Error::::::",err)
      
    }

  }

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button>
            <FolderPlus className="mr-2 h-4 w-4" /> Add Item
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Item</DialogTitle>
            <DialogDescription>
              Fill in the details of your item.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="itemId" className="text-right">
                  Item ID
                </Label>
                <Input name="itemId" id="itemId" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input name="name" id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Category
                </Label>
                <Select name="category">
                  <SelectTrigger id="category-select">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {category.map((item)=> <SelectItem key={item.categoryId} value={item._id}>{item.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea name="description" id="descrition" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Quantity
                </Label>
                <Input name="quantity" id="quantity" className="col-span-3" type="number" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input name="price" id="price" className="col-span-3" type="number" />
              </div>
            </div>
            <div className="my-4 flex justify-center">
              {error.error && (
                <p className="font-mono font-medium text-red-500">
                  {error.message}
                </p>
              )}
            </div>
            <div className="flex justify-end">
              <Button type="submit">Add Item</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddItemButton;