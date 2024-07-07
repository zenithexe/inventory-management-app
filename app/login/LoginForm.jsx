import React from "react";
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

function LoginForm() {
  return (
    <>
      <Card className="w-[350px]">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle className="font-mono">Log In</CardTitle>
            <Link href="/register"><Button variant="outline">Register</Button></Link>
          </div>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <p className="font-mono">Username</p>
                <Input id="username" placeholder="Username" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <p className="font-mono">Password</p>
                <Input type="password" id="password" placeholder="*******" />
              </div>
            </div>
            <Button className="mt-6 w-full">Log In</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default LoginForm;
