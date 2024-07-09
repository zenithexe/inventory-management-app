import React from "react";
import LoginForm from "./LoginForm";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth()
  if(session) redirect('/inventory')


  return (
    <>
    <div className="h-screen w-screen bg-slate-50">
      <div className="h-screen flex justify-center items-center">
        <LoginForm />
      </div>
    </div>
    </>
  );
}
