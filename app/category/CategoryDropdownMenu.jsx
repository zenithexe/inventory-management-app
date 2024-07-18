import React, { useState, useRef, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import EditCategoryDialogBox from "./EditCategoryDialogBox";
import DeleteCategoryAlert from "./DeleteCategoryAlert";

function CategoryDropdownMenu({ row, session }) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const categoryData = {
    categoryId: row.getValue('categoryId'),
    name: row.getValue('name'),
    itemCount: row.getValue('itemCount'),
  }
  
  return (
    <>
      {session.user.isAdmin && (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setEditOpen(true)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDeleteOpen(true)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <EditCategoryDialogBox categoryData={categoryData} open={editOpen} onOpenChange={setEditOpen} />
          <DeleteCategoryAlert categoryData={categoryData} open={deleteOpen} onOpenChange={setDeleteOpen} />
        </>
      )}
    </>
  );
}

export default CategoryDropdownMenu;
