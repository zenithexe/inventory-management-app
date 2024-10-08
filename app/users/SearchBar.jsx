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
      <div className="flex gap-2 w-full">
        <Input
          placeholder="Search User"
          value={table.getColumn(searchColumn).getFilterValue() ?? ""}
          onChange={(event) => {
            table.getColumn(searchColumn).setFilterValue(event.target.value);
          }}
          className="max-w-xs w-auto grow"
        />
        <Select className="w-[120px]" defaultValue="name"
          onValueChange={(value)=>setSearchColumn(value)}
        >
          <SelectTrigger >
            <SelectValue placeholder=""/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Search By</SelectLabel>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="username">Username</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}

export default SearchBar;
