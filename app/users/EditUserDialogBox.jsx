import React, { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

import {  UserRoundCheck } from "lucide-react";
import { updateUser } from "@/action/users";

function EditUserDialogBox({ userData, open, onOpenChange }) {
  const { toast } = useToast();
  const router = useRouter();

  const [error, setError] = useState({ error: false, message: "" });

  useEffect(() => {
    setError({ error: false, message: "" });
  }, [open]);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const username = userData.username;
    const name = formData.get("name");
    const email = formData.get("email");
    const isAdmin = Boolean(formData.get("role"));

    if (
      name == userData.name &&
      email == userData.email &&
      isAdmin == userData.isAdmin
    )
      return setError({ error: true, message: "No Change Applied." });

    if (!username)
      return setError({ error: true, message: "Username required." });
    if (!name) return setError({ error: true, message: "Name required." });
    if (!email) return setError({ error: true, message: "Email is required." });
    if (!isAdmin)
      return setError({ error: true, message: "User Role is required." });

    const user = {
      username,
      name,
      email,
      isAdmin,
    };
    try {
      const resJSON = await updateUser(user);
      const response = JSON.parse(resJSON);

      if (!response.success)
        return setError({ error: true, message: response.message });

      toast({
        title: `${response.user.username} Updated`,
        description: "User successfully updated",
        action: <UserRoundCheck className="text-slate-700" />,
      });

      onOpenChange(false);
      router.refresh();
    } catch (err) {
      console.log("Error ::", err);
      setError({ error: true, message: "There is some error." });
    }
  }
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Fill in the details of the User.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  disabled
                  name="username"
                  id="username"
                  className="col-span-3"
                  defaultValue={userData.username}
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
                  defaultValue={userData.name}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  name="email"
                  id="email"
                  className="col-span-3"
                  defaultValue={userData.email}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select name="role" defaultValue={userData.isAdmin?.toString()}>
                  <SelectTrigger id="role-select">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem key="admin" value="true">
                      Admin
                    </SelectItem>
                    <SelectItem key="user" value="false">
                      User
                    </SelectItem>
                  </SelectContent>
                </Select>
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
              <Button
                type="reset"
                variant="secondary"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Edit Category</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EditUserDialogBox;
