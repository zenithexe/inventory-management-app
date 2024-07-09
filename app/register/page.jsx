import { redirect } from "next/navigation";
import React from "react";
import RegisterForm from "./RegisterForm";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package, ShieldCheck, User } from "lucide-react";
import { auth } from "../auth";

export default async function RegisterPage() {
  const session = await auth()
  if(session) redirect('/inventory')

  return (
    <>
      <div className="h-screen w-screen bg-slate-50">
        <div className="h-screen flex flex-col justify-center items-center gap-4  md:flex-row">
          <RegisterForm />
          <div className="w-[300px]  gap-4 font-mono hidden md:grid   ">
            <Card>
              <CardHeader>
                <CardTitle className="flex text-xl">
                  <ShieldCheck />
                  Admin
                </CardTitle>
                <CardDescription>Administration Permissions</CardDescription>
              </CardHeader>
              <CardContent className="mt-[-15px]">
                <p>Add/Edit/Delete Items</p>
                <p>Create/Manage Categories</p>
                <p>Add/Manage Users</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex text-xl">
                  <User />
                  User
                </CardTitle>
                <CardDescription>Normal Permissions</CardDescription>
              </CardHeader>
              <CardContent className="mt-[-15px]">
                <p>Add and Edit Items</p>
                <p>View Categories</p>
                <p>View Users</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
