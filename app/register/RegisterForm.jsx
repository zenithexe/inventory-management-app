"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { register } from "@/action/users";
import { z } from "zod";
import { UserRoundPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

function RegisterForm() {
  const router = useRouter();
  const {toast} = useToast();
  
  const [error, setError] = useState({
    error: false,
    message: "There is some error.",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const role = formData.get("role");

    if (!name || !username || !password || !confirmPassword) {
      setError({
        error: true,
        message: "Mising Input!",
      });
      return;
    }

    const emailCheck = z.string().email().safeParse(email);
    if (!emailCheck.success) {
      console.log(emailCheck);
      setError({
        error: true,
        message: "Invalid Email!",
      });
      return;
    }

    const passwordCheck = z.string().min(4).safeParse(password);
    if (!passwordCheck.success) {
      setError({
        error: true,
        message: "Password must be greater than 8 characters.",
      });
      return;
    }

    if (password != confirmPassword) {
      setError({
        error: true,
        message: "Password didn't match.",
      });
      return;
    }

    const user = {
      name,
      username,
      email,
      password,
      isAdmin: role == "admin",
    };

    try {
      const response = await register(user);

      if (!response.success) {
        setError({ error: true, message: response.error });
      }

      toast({
        title: `Registration Successful!`,
        description: "User successfully registered.",
        action: <UserRoundPlus className="text-slate-700" />,
      });

      router.push('/login')

    } catch (e) {
      console.error("Error ::", e);
    }
  }

  return (
    <>
      <Card className="w-[350px]">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle className="font-mono">Register</CardTitle>
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <p className="font-mono">Name</p>
                <Input name="name" id="name" placeholder="Name" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <p className="font-mono">Username</p>
                <Input name="username" id="username" placeholder="Username" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <p className="font-mono">Email</p>
                <Input name="email" id="email" placeholder="Email" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <p className="font-mono">Password</p>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  placeholder="*******"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <p className="font-mono">Confirm Password</p>
                <Input
                  name="confirmPassword"
                  type="password"
                  id="confirmPassword"
                  placeholder="*******"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Register As</Label>
                <Select name="role" defaultValue="admin">
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4">
              {error.error && (
                <p className="font-mono font-medium text-red-500">
                  {error.message}
                </p>
              )}
            </div>
            <Button className="mt-6 w-full">Register</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default RegisterForm;
