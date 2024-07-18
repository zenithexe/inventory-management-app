import { deleteItem } from "@/action/items";
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
import { CircleAlert, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import React from "react";

function DeleteItemAlert({ itemData, open, onOpenChange }) {
  const { toast } = useToast();
  const router = useRouter();

  async function handleDelete() {
    try {
      const resJson = await deleteItem(itemData.item.itemId);
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
        title: `${itemData.item.name} Deleted`,
        description: "Item successfully Deleted",
        action: <Trash2 className="text-slate-700" />,
      });

      router.refresh();
    } catch (err) {
      toast({
        variant: "destructive",
        title: `Delete Failed`,
        description: `There is some error.`,
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
              <div className="font-semibold">{`Delete Item : ${itemData?.item?.itemId}`}</div>
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

export default DeleteItemAlert;
