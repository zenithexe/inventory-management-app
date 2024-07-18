"use client";
import React , {useState} from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


import { Badge } from "@/components/ui/badge";
import { Tag } from "lucide-react";




import SearchBar from "./SearchBar";
import TablePagination from "./TablePagination";
import CategoryDropdownMenu from "./CategoryDropdownMenu";



function CategoryTable({data, session}) {

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

  const columns = [
    {
      header:"Category ID",
      accessorKey:"categoryId"
    },

    {
      header: "Category Name",
      accessorKey: "name",
    },
    {
      header: "Item Count",
      accessorKey: "itemCount",
    },
    {
      id: "options",
      enableHiding: false,
      cell: ({row}) => {
        return (
          <CategoryDropdownMenu row={row} session={session}/>
        );
      },
    },
  ];


  const categoryTable = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,

    getFilteredRowModel: getFilteredRowModel(),

    state : {
      pagination,
    }

  });

  
  return (
    <>
      <div className="w-auto flex flex-col gap-2">
        <div className="flex justify-between gap-1">
          <SearchBar table={categoryTable} />
        </div>
        <div className="flex items-center rounded-md border">
          <Table>
            <TableHeader>
              {categoryTable.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        <div className="flex">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </div>
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {categoryTable.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <TablePagination table={categoryTable} setPagination={setPagination} />
      </div>
    </>
  );
}

export default CategoryTable;
