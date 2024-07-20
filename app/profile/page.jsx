import React from "react";
import UserAvatar from "@/components/UserAvatar";
import { auth } from "../auth";

import { Separator } from "@/components/ui/separator";
import UpdateProfileForm from "./UpdateProfileForm";
import { SessionProvider } from "next-auth/react";
import ChangePasswordForm from "./ChangePasswordForm";

async function page() {
  const session = await auth();

  return (
    <>
      <SessionProvider session={session}>
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
                  <UpdateProfileForm session={session} />
                </div>
              </div>
              <Separator className="my-10 max-w-md" />

              <div className="w-auto flex ">
                <div className="w-full max-w-md">
                  <ChangePasswordForm session={session}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SessionProvider>
    </>
  );
}

export default page;
