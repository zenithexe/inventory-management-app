import React from "react";
import AddUserButton from "./AddUserButton";
import EditProfileButton from "./EditProfileButton";
import UserTable from "./UserTable";
import UserAvatar from "@/components/UserAvatar";

export default function UsersPage() {
  return (
    <>
      <div className="">
        <div className="mx-4 grid lg:grid-cols-6 grid-cols-4">
          <div className="flex flex-col lg:col-start-2 col-span-4">
            <div className="flex justify-between pt-4 mb-[50px]">
              <div>
                <h1 className="text-[30px] font-mono font-semibold">Users</h1>
                <p className="font-mono">
                  This Page contains all the registered users. This is only
                  visible by an admin.
                </p>
              </div>
              <div className="pt-2">
                <UserAvatar />
              </div>
            </div>
            <div className="mb-10 flex gap-2">
              <AddUserButton />
            </div>
            <div className="w-full">
              <UserTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
