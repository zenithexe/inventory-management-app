import React from "react";
import AddUserButton from "./AddUserButton";
import EditProfileButton from "./EditProfileButton";
import UserTable from "./UserTable";
import UserAvatar from "@/components/UserAvatar";
import { getSessionUser } from "@/lib/session";
import { auth } from "../auth";
import { redirect } from "next/navigation";


export default async function UsersPage() {
  const session = await auth()
  if(!session) redirect('/login')
  
  
  return (
    <>
      <div className="">
        <div className="mx-4 grid lg:grid-cols-6 grid-cols-4">
          <div className="flex flex-col lg:col-start-2 col-span-4">
            <div className="flex justify-between pt-4 mb-[50px]">
              <div>
                <h1 className="text-[30px] font-mono font-semibold">Users</h1>
                <p className="font-mono">
                  This Page contains all the registered users.
                </p>
              </div>
              <div className="pt-2">
                <UserAvatar />
              </div>
            </div>
            
            {session.user.isAdmin && <div className="mb-10 flex gap-2"><AddUserButton /></div>}
            <div className="w-full"><UserTable session={session}/></div>
          </div>
        </div>
      </div>
    </>
  );
}
