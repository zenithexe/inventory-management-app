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
import { CircleUserRound } from "lucide-react";

function UserAvatar() {
  return (
    <>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger><CircleUserRound/></MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Your Profile</MenubarItem>
            <MenubarItem>Logout</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
}

export default UserAvatar;
