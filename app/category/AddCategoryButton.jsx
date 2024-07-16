
'use client'
import React, { useState } from 'react';
import { BookmarkPlus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function AddCategoryButton() {
  const [error, setError] = useState({
    error: false,
    message:"",
  })

  async function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target);

    const categoryId = formData.get("categoryId")
    const name = formData.get("name")

    const item = {
      categoryId,
      name,
      itemCount:0,
    }

    try {
      const res = await fetch('http://localhost:3000/api/items/types', {
        method: 'POST',
        body: JSON.stringify(item),
      })

      const resJson = await res.json()
      if(resJson.error) return setError({error:true, message:resJson.error})

      

    } catch(err) {
      setError({error:true, message:err.message})
    }


  }
  return (
    <>
    <Dialog>
        <DialogTrigger asChild>
          <Button>
            <BookmarkPlus className="mr-2 h-4 w-4" /> Add Category
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>
              Fill in the details of your Category.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="categoryId" className="text-right">
                  Category ID
                </Label>
                <Input name="categoryId" id="categoryId" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input name="name" id="name" className="col-span-3" />
              </div>
            </div>
            <div className="my-4 flex justify-center">
              {error.error && (
                <p className="font-mono font-medium text-red-500">
                  {error.message}
                </p>
              )}
            </div>
            <div className="flex justify-end">
              <Button type="submit">Add Category</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddCategoryButton