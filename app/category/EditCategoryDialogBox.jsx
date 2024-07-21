import React, { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { updateCategory } from "@/action/category";
import { BookmarkCheck } from "lucide-react";
import LoadingCircle from "@/components/LoadingCircle";

function EditCategoryDialogBox({ categoryData, open, onOpenChange }) {
  const { toast } = useToast();
  const router = useRouter();

  const [error, setError] = useState({ error: false, message: "" });
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setError({ error: false, message: "" });
    if(!open){
      setLoading(false)
    }
  }, [open]);

  useEffect(()=>{
    if(error.error){
      setLoading(false)
    }
  },[error])

  async function handleSubmit(e) {
    e.preventDefault();
    
    setLoading(true)

    const formData = new FormData(e.target);

    const categoryId = categoryData.categoryId;
    const name = formData.get("name");

    if (categoryId === categoryData.categoryId && name === categoryData.name)
      return setError({ error: true, message: "No Change Applied." });

    if (!categoryId)
      return setError({ error: true, message: "Category ID required." });
    if (!name) return setError({ error: true, message: "Item name required." });

    const category = {
      categoryId: categoryId,
      name: name,
    };

    try {
      const resJson = await updateCategory(category);
      const response = JSON.parse(resJson);
      if (!response.success)
        return setError({ error: true, message: "Error!" });

      toast({
        title: `${response.category.name} Updated`,
        description: "Category successfully updated",
        action: <BookmarkCheck className="text-slate-700" />,
      });

      setLoading(false)
      onOpenChange(false);
      router.refresh();
    } catch (err) {
      console.log("Error ::", err)
      setError({ error: true, message: "Client-side Error." });
    }
  }
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
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
                  disabled
                  name="categoryId"
                  id="categoryId"
                  className="col-span-3"
                  defaultValue={categoryData.categoryId}
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
                  defaultValue={categoryData.name}
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
            <div className="flex gap-2 justify-end">
              <Button type="reset" variant="secondary" onClick={()=>onOpenChange(false)}> Cancel</Button>
              <Button type="submit"><LoadingCircle visible={loading}/> Edit Category</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EditCategoryDialogBox;
