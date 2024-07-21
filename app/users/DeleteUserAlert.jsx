import React from "react";
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
import { deleteUser } from "@/action/users";
import { signOut } from "next-auth/react";

function DeleteUserAlert({ session, userData, open, onOpenChange }) {
  const { toast } = useToast();
  const router = useRouter();

  async function handleDelete() {
    try {
      const resJson = await deleteUser(userData.username);
      const response = JSON.parse(resJson);

      if (!response.success) {
        toast({
          variant: "destructive",
          title: `Delete Failed`,
          description: `${response.message}`,
          action: <CircleAlert className="text-white" />,
        });
        return;
      }

      toast({
        title: `${userData.username} Deleted`,
        description: "User successfully Deleted",
        action: <Trash2 className="text-slate-700" />,
      });

      if (userData.username === session.user.username) {
        signOut({
          redirect: true,
          callbackUrl: "/",
        });
      }

      router.refresh();
    } catch (err) {
      console.log("Error ::", err);
      toast({
        variant: "destructive",
        title: `Delete Failed`,
        description: `There is some error.`,
        action: <CircleAlert className="text-white" />,
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
              <div className="font-semibold">{`Delete User : ${userData?.username}`}</div>
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

export default DeleteUserAlert;
