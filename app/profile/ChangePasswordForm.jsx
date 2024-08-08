"use client";
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { changePassword } from "@/action/users";
import { UserRoundCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import LoadingCircle from "@/components/LoadingCircle";

function ChangePasswordForm({ session }) {
  const { toast } = useToast();
  const router = useRouter();

  const [error, setError] = useState({ error: false, message: "" });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target);

    const presentPass = formData.get("presentPassword");
    const newPass = formData.get("newPassword");
    const confirmPass = formData.get("confirmPassword");

    if (!presentPass || !newPass || !confirmPass)
      return setError({ error: true, message: "Missing Field." });

    if (newPass != confirmPass)
      return setError({ error: true, message: "New Password didn't match." });

    const body = {
      username: session.user.username,
      presentPassword: presentPass,
      newPassword: newPass,
    };

    if (session.user.username==="sample") return setError({error: true, message:"You cannot change Sample Account's Password."})

    try {
      const resJSON = await changePassword(body);
      const response = JSON.parse(resJSON);

      if (!response.success)
        return setError({ error: true, message: response.message });

      toast({
        title: `Password Updated`,
        description: "Password successfully changed",
        action: <UserRoundCheck className="text-slate-700" />,
      });

      setSuccess(true)
      router.refresh();

    } catch (err) {
      console.log("Error ::", err);
      return setError({ error: true, message: "There is some error." });
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="">
            <Label htmlFor="presentPassword" className="text-right">
              Present Password
            </Label>
            <Input
              type="password"
              name="presentPassword"
              id="presentPassword"
            />
          </div>
          <div className="">
            <Label htmlFor="newPassword">New Password</Label>
            <Input type="password" name="newPassword" id="newPassword" />
          </div>

          <div className="">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
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
          <Button type="submit"><LoadingCircle visible={loading}/>Change Password</Button>
        </div>
      </form>
    </>
  );
}

export default ChangePasswordForm;
