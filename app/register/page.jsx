import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import RegisterForm from "./RegisterForm";

export default async function RegisterPage() {
  
  return (
    <>
    <div className="h-screen w-screen bg-slate-50">
      <div className="h-screen flex justify-center items-center ">
        <RegisterForm />
      </div>
    </div>
    </>
  );
}
