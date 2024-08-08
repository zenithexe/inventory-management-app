"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Terminal } from "lucide-react";
import Link from "next/link";
import { logIn } from "@/action/users";
import { useState } from "react";
import LoadingCircle from "@/components/LoadingCircle";

function LoginForm() {
  const [error, setError] = useState({
    error: false,
    message: "There is some error.",
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await logIn({ username, password });
    } catch (e) {
      console.error(e.message);
      setError({ error: true, message: "Login Failed." });
    }
    setLoading(false);
  }

  return (
    <>
      <div className="w-auto">
        <Card className="w-[350px]">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle className="font-mono">Log In</CardTitle>
              <Link href="/register">
                <Button variant="outline">Register</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <p className="font-mono">Username</p>
                  <Input name="username" id="username" placeholder="Username" />
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
              </div>
              <div className="mt-4">
                {error.error && (
                  <p className="font-mono font-medium text-red-500">
                    {error.message}
                  </p>
                )}
              </div>
              <Button className="mt-6 w-full"><LoadingCircle visible={loading}/> Log In</Button>
            </form>
          </CardContent>
          
        </Card>
        <Alert className="mt-2">
            <Terminal className="h-4 w-4" />
            <AlertTitle className="font-mono font-semibold">Quick Test :</AlertTitle>
            <AlertDescription>
              <div className="font-mono">
              <span className="font-semibold">Username:</span> sample
              |
              <span className="font-semibold"> Password:</span> sample
              </div>
            </AlertDescription>
          </Alert>
      </div>
    </>
  );
}

export default LoginForm;
