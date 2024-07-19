"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { updateItem } from "@/action/items";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {  FilePenLine } from "lucide-react";


export default function EditItemDialogBox({
  itemData,
  categoryList,
  open,
  onOpenChange,
}) {
  
  const { toast } = useToast();
  const router = useRouter();
  

  const [error, setError] = useState({ error: false, message: "" });

  useEffect(()=>{
    setError({error:false, message:""})
  },[open])

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const itemId = itemData.item.itemId;
    const name = formData.get("name");
    const category = formData.get("category");
    const description = formData.get("description");
    const quantity = formData.get("quantity");
    const price = formData.get("price");

    if (
      name == itemData.item.name &&
      category == itemData.item.category._id &&
      description == itemData.item.description &&
      quantity == itemData.item.quantity &&
      price == itemData.item.price
    ) return setError({error:true, message:"No Change Applied"})

    if (!itemId) return setError({ error: true, message: "Item ID required." });
    if (!name) return setError({ error: true, message: "Item name required." });
    if (!category)
      return setError({ error: true, message: "Select a category." });
    if (!description)
      return setError({ error: true, message: "Item description required." });
    if (!quantity)
      return setError({ error: true, message: "Quantity is Required." });
    if (!price) return setError({ error: true, message: "Price is Required." });

    const item = {
      id: itemData.item._id,
      itemId,
      name,
      category,
      description,
      quantity,
      price,
      created: itemData.item.created,
    };

    

    try {
      const res = await updateItem(item);
      const response = JSON.parse(res)
      
      if (!response.success)
        return setError({ error: true, message: response.message });

      toast({
        title: `${response.item.itemId} Updated`,
        description: "Item successfully updated",
        action: (<FilePenLine className="text-slate-700"/>)
      });

      onOpenChange(false);
      router.refresh();

    } catch (err) {
      setError({ error: true, message: "There is some error." });
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogDescription>
              Change the fields, which you want to change.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="itemId" className="text-right">
                  Item ID
                </Label>
                <Input
                  disabled
                  name="itemId"
                  id="itemId"
                  className="col-span-3"
                  value={itemData?.item?.itemId}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  name="name"
                  id="name"
                  className="col-span-3"
                  defaultValue={itemData?.item?.name}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Category
                </Label>
                <Select
                  name="category"
                  defaultValue={itemData.item?.category?._id}
                >
                  <SelectTrigger id="category-select">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {categoryList.map((item) => (
                      <SelectItem key={item.categoryId} value={item._id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  name="description"
                  id="descrition"
                  className="col-span-3"
                  defaultValue={itemData?.item?.description}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Quantity
                </Label>
                <Input
                  name="quantity"
                  id="quantity"
                  className="col-span-3"
                  type="number"
                  defaultValue={itemData?.item?.quantity}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  name="price"
                  id="price"
                  className="col-span-3"
                  type="number"
                  defaultValue={itemData?.item?.price}
                />
              </div>
            </div>
            <div className="my-4 flex justify-center">
              {error.error && (
                <p className="font-mono font-medium text-red-500">
                  {error.message}
                </p>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button type="reset" variant="secondary" onClick={(e)=> onOpenChange(false)}>Cancel</Button>
              <Button type="submit">Edit Item</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
