"use client";
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { UserRoundCheck } from "lucide-react";
import { updateUser } from "@/action/users";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoadingCircle from "@/components/LoadingCircle";

function UpdateProfileForm({ session }) {
  const { toast } = useToast();
  const router = useRouter();

  const {data: sessionC, update } = useSession();
  
  const [error, setError] = useState({ error: false, message: "" });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    if(success==true){
        setError({error:false, message:""})
        setLoading(false)
    }
  },[success])

  useEffect(()=>{
    if(error.error){
      setLoading(false)
    }
  },[error])

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true)

    const formData = new FormData(e.target);

    const username = session?.user.username;
    const name = formData.get("name");
    const email = formData.get("email");
    const isAdmin = session?.user.isAdmin;

    if (name == session.user.name && email == session.user.email)
      return setError({ error: true, message: "No Change Applied." });
    if (!name) return setError({ error: true, message: "Name required." });
    if (!email) return setError({ error: true, message: "Email is required." });

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
      
      
      await update({
        ...session,
        user:{
            ...session?.user,
            name:response.user.name,
            email:response.user.email,
        }
      })

      toast({
        title: `Account Updated. `,
        description: "User successfully updated",
        action: <UserRoundCheck className="text-slate-700" />,
      });

      setSuccess(true)

  
    } catch (err) {
      console.log("Error ::", err);
      setError({ error: true, message: "There is some error." });
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="flex gap-4">
            <div className="">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                disabled
                name="username"
                id="username"
                className="col-span-3"
                defaultValue={session?.user.username}
              />
            </div>
            <div className="">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                name="name"
                id="name"
                className="col-span-3"
                defaultValue={session?.user.name}
              />
            </div>
          </div>
          <div className="">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              name="email"
              id="email"
              className="col-span-3"
              defaultValue={session?.user.email}
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
          <Button type="submit"><LoadingCircle visible={loading}/> Update Details</Button>
        </div>
      </form>
    </>
  );
}

export default UpdateProfileForm;
