'use client';
import React from "react";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUserRound, LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";


function UserAvatar({session}) {
  
  const router = useRouter()

  function logout() {
    signOut({
      redirect: true,
      callbackUrl: "/",
    });
  }

  function profile(){
    router.push('/profile')
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <CircleUserRound />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Logged in: {session?.user.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem  onClick={profile}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem  onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default UserAvatar;
