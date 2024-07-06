import { Button } from '@/components/ui/button'
import { FolderPlus } from 'lucide-react'
import React from 'react'

function AddItemButton() {
  return (
    <>
    <Button>
        <FolderPlus className="mr-2 h-4 w-4" /> Add Item
    </Button>
    </>
  )
}

export default AddItemButton