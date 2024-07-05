import React from "react";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function TablePagination({ table, setPagination}) {
  return (
    <>
    <div className="flex gap-2">

    
      <Select defaultValue="5" onValueChange={(value)=>{
          setPagination({pageIndex:0, pageSize: value})
      }}>
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="5"/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>No. of Items</SelectLabel>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      </div>
    </>
  );
}

export default TablePagination;
