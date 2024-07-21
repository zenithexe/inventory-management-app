"use client";
import React, { useEffect, useState } from "react";
import { BookmarkPlus } from "lucide-react";


import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { addCategory } from "@/action/category";
import LoadingCircle from "@/components/LoadingCircle";

function AddCategoryButton() {
  
  const { toast } = useToast();
  const router = useRouter();

  const [error, setError] = useState({
    error: false,
    message: "",
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    setError({error:false, message:""})
    if(!open){
      setLoading(false)
    }
  },[open])

  useEffect(()=>{
    if(error.error){
      setLoading(false)
    }
  },[error])


  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true)

    const formData = new FormData(e.target);
    const categoryId = formData.get("categoryId");
    const name = formData.get("name");

    const category = {
      categoryId,
      name,
      itemCount: 0,
    };

    try {
      
      const resJSON = await addCategory(category)
      const response = JSON.parse(resJSON)
      if (!response.success)
        return setError({ error: true, message: response.message });

      toast({
        title: `${response.category.categoryId} Added`,
        description: "Category successfully added",
        action: <BookmarkPlus className="text-slate-700" />,
      });

      setLoading(false)
      setOpen(false);
      router.refresh();

    } catch (err) {
      console.log("Error ::", err)
      setError({ error: true, message: "Client-side Error." });
    }
  }
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <BookmarkPlus className="mr-2 h-4 w-4" /> Add Category
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>
              Fill in the details of your Category.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="categoryId" className="text-right">
                  Category ID
                </Label>
                <Input
                  name="categoryId"
                  id="categoryId"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input name="name" id="name" className="col-span-3" />
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
              <Button type="submit"><LoadingCircle visible={loading}/>Add Category</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddCategoryButton;
