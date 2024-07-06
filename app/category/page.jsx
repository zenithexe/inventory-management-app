import React from 'react'
import AddCategoryButton from './AddCategoryButton'
import CategoryTable from './CategoryTable'

export default function CategoryPage() {
  return (
    <>
      <div className="">
        <div className="mx-4 grid lg:grid-cols-6 grid-cols-4">
          <div className="flex flex-col lg:col-start-2 col-span-4">
            <div className="mb-[50px]">
              <h1 className="mt-4 text-[30px] font-mono font-semibold">
                Item Category
              </h1>
              <p className="font-mono">
                Add or Manage the Item Categories.
              </p>
            </div>
            <div className="mb-10 flex gap-2">
              <AddCategoryButton />
            </div>
            <div className="w-full"><CategoryTable/></div>
          </div>
        </div>
      </div>
    </>
  )
}

