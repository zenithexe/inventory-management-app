import { BookmarkPlus } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'

function AddCategoryButton() {
  return (
    <>
    <Button>
        <BookmarkPlus className="mr-2 h-4 w-4" /> Add Category
      </Button>
    </>
  )
}

export default AddCategoryButton