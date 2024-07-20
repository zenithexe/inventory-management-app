import React, { useEffect, useState, useRef } from "react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import EditUserDialogBox from "./EditUserDialogBox";
import DeleteUserAlert from "./DeleteUserAlert";
import { getUser } from "@/action/users";


function UserDropdownMenu({ row, session }) {
  const [editOpen,setEditOpen] = useState(false)
  const [deleteOpen,setDeleteOpen] = useState(false)
  const [userData, setUserData] = useState({})

  let isMount = useRef(false);

  const getUserDetails = async() => {
    const userJSON = await getUser(row.getValue('username'))
    const user = JSON.parse(userJSON)
    setUserData(user.user)
  }

  useEffect(()=>{
    if(isMount.current){
      getUserDetails()
      
    }else{
      isMount.current=true
    }
  },[editOpen])

  return (
    <>
      {session.user.isAdmin &&  (
        <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={()=>setEditOpen(true)}>Edit User</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>setDeleteOpen(true)}>Delete User</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <EditUserDialogBox session={session} userData={userData} open={editOpen} onOpenChange={setEditOpen} />
        <DeleteUserAlert session={session} userData={userData} open={deleteOpen} onOpenChange={setDeleteOpen} />
        </>
      )}
    </>
  );
}

export default UserDropdownMenu;
