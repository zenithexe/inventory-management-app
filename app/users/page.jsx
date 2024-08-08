import React from "react";
import AddUserButton from "./AddUserButton";
import EditProfileButton from "./EditProfileButton";
import UserTable from "./UserTable";
import UserAvatar from "@/components/UserAvatar";
import { getSessionUser } from "@/lib/session";
import { auth } from "../auth";
import { redirect } from "next/navigation";
import connectMongo from "@/mongodb/connect";
import { User } from "@/mongodb/schema";

export default async function UsersPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const db = connectMongo()
  const usersDB = await User.find().sort({_id:-1})
  const users = JSON.parse(JSON.stringify(usersDB))

  return (
    <>
      <div className="mb-20 lg:mt-20">
        <div className="w-full grid lg:grid-cols-8 grid-cols-10">
          <div className="flex flex-col col-start-2 col-span-8 lg:col-start-2 lg:col-span-6">
            <div className="flex justify-between pt-4 mb-[50px]">
              <div>
                <h1 className="text-[30px] font-mono font-semibold">Users</h1>
                <p className="font-mono">
                  This Page contains all the registered users.
                </p>
              </div>
              <div className="pt-2">
                <UserAvatar session={session}/>
              </div>
            </div>

            <div className="w-full">
              <UserTable data={users} session={session} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
