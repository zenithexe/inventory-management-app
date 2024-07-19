'use client';
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUserRound, LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";


async function UserAvatar({session}) {
  
  function logout() {
    signOut({
      redirect: true,
      callbackUrl: "/",
    });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <CircleUserRound />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{`Logged in: ${session.user.username}`}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default UserAvatar;
