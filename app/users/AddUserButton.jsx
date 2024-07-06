import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import React from "react";

function AddUserButton() {
  return (
    <>
      <Button>
        <UserPlus className="mr-2 h-4 w-4" /> Add User
      </Button>
    </>
  );
}

export default AddUserButton;
