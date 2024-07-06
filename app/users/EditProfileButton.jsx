import React from 'react'
import { UserCog } from "lucide-react";
import { Button } from '@/components/ui/button';

function EditProfileButton() {
  return (
    <>
      <Button variant="secondary">
        <UserCog  className="mr-2 h-4 w-4" /> Edit Your Profile
      </Button>
    </>
  )
}

export default EditProfileButton