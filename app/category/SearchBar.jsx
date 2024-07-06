"use client";
import React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
function SearchBar({ table }) {
  const [searchColumn,setSearchColumn] = useState("name");
  return (
    <>
      <div className="flex gap-2">
        <Input
          placeholder="Search Item"
          value={table.getColumn(searchColumn).getFilterValue() ?? ""}
          onChange={(event) => {
            table.getColumn(searchColumn).setFilterValue(event.target.value);
          }}
          className="max-w-sm w-80"
        />
      </div>
    </>
  );
}

export default SearchBar;
