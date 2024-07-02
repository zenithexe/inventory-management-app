"use client";
import React, { useState } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const data = [
  {
    rollno: 1,
    name: "Jalish",
    phone: 99,
  },
  {
    rollno: 2,
    name: "Ricku",
    phone: 100,
  },
];

const columns = [
  {
    header: "Roll No.",
    accessorKey: "rollno",
    enableHiding: false
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    header: "Phone No.",
    accessorKey: "phone",
  },
];

export default function DataTable() {
  const [columnVisibility, setColumnVisibility] = useState({
    columnId1: true,
    columnId2: true, 
    columnId3: true,
  });

  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,

    state :{
      columnVisibility
    }
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow>
                {row.getVisibleCells().map((cell) => (
                  <TableCell>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
