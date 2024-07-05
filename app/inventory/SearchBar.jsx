import React from 'react'
import { Input } from '@/components/ui/input';
function SearchBar({table}) {
  return (
    <>
    <Input
          placeholder="Search Item"
          value={table.getColumn("name").getFilterValue() ?? ""}
          onChange={(event) => {
            table.getColumn("name").setFilterValue(event.target.value);
          }}
          className="max-w-sm"
        />
    </>
  )
}

export default SearchBar