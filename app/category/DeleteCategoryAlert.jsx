import React, { useState } from "react";
import { CircleAlert } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { deleteCategory } from "@/action/category";
import { Trash2 } from "lucide-react";

function DeleteCategoryAlert({ categoryData, open, onOpenChange }) {
  const { toast } = useToast();
  const router = useRouter();
  

  async function handleDelete() {
    if (categoryData.itemCount > 0) {
      toast({
        variant: "destructive",
        title: `Delete Failed`,
        description: `Item Count must be zero.`,
        action: <CircleAlert className="text-slate-700" />,
      });
      return;
    }

    try {
      const resJson = await deleteCategory(categoryData.categoryId);
      const response = JSON.parse(resJson);

      if (!response.success) {
        toast({
          variant: "destructive",
          title: `Delete Failed`,
          description: `${response.message}`,
          action: <CircleAlert className="text-slate-700" />,
        });
        return;
      }

      toast({
        title: `${categoryData.name} Deleted`,
        description: "Category successfully Deleted",
        action: <Trash2 className="text-slate-700" />,
      });

      router.refresh();

    } catch (err) {
        console.log(err)
        toast({
            variant: "destructive",
            title: `Delete Failed`,
            description: `There is some Error.`,
            action: <CircleAlert className="text-slate-700" />,
          });
    }
  }
  return (
    <>
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{`Are you absolutely sure?`}</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="font-semibold">{`Delete Category : ${categoryData.categoryId}`}</div>
              This action cannot be undone. This will permanently delete the
              item and remove your data from our servers.
              
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default DeleteCategoryAlert;
