import React from "react";
import UserAvatar from "@/components/UserAvatar";
import { auth } from "../auth";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

async function page() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <>
      <div className="ml-16 mb-20">
        <div className="w-full grid lg:grid-cols-8 grid-cols-10">
          <div className="flex flex-col col-start-2 col-span-8 lg:col-start-2 lg:col-span-6">
            <div className="flex justify-between pt-4 mb-[50px]">
              <div>
                <h1 className="text-[30px] font-mono font-semibold">
                  Your Profile
                </h1>
                <p className="font-mono">Manage your account details.</p>
              </div>
              <div className="pt-2">
                <UserAvatar session={session} />
              </div>
            </div>

            <div className="w-auto flex ">
              <div className="w-full max-w-md">
                <form>
                  <div className="grid gap-4 py-4">
                    <div className="flex gap-4">
                      <div className="">
                        <Label htmlFor="username" className="text-right">
                          Username
                        </Label>
                        <Input
                          name="username"
                          id="username"
                          className="col-span-3"
                        />
                      </div>
                      <div className="">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input name="name" id="name" className="col-span-3" />
                      </div>
                    </div>
                    <div className="">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input name="email" id="email" className="col-span-3" />
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button type="submit">Update Details</Button>
                  </div>
                </form>
              </div>
            </div>
            <Separator className="my-10 max-w-md" />

            <div className="w-auto flex ">
              <div className="w-full max-w-md">
                <form>
                  <div className="grid gap-4 py-4">
                    <div className="">
                      <Label htmlFor="presentPassword" className="text-right">
                        Present Password
                      </Label>
                      <Input type="password" name="presentPassword" id="presentPassword" />
                    </div>
                    <div className="">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input type="password" name="newPassword" id="newPassword" />
                    </div>

                    <div className="">
                      <Label htmlFor="confirmPassword">
                        Confirm New Password
                      </Label>
                      <Input type="password" name="confirmPassword" id="confirmPassword" />
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button type="submit">Change Password</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
