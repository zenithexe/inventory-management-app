"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Label } from "@/components/ui/label";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  createColumnHelper,
  filterFns,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  ArrowUpNarrowWide,
  ArrowDownNarrowWide,
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";

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
import { set } from "zod";
import Filter from "./Filter";
import CategoryFilter from "./CategoryFilter";
import ColumnVisibility from "./ColumnVisibility";
import SearchBar from "./SearchBar";
import TablePagination from "./TablePagination";
import MainTable from "./MainTable";


const columns = [
  {
    header: "Item ID",
    accessorKey: "itemId",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Category",
    accessorKey: "category",
  },
  {
    header: "Quantity",
    accessorKey: "quantity",
  },
  {
    header: "Price",
    accessorKey: "price",
  },
  {
    id: "options",
    enableHiding: false,
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Item</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function DataTable({ data, category }) {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: data,
    columns,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,

    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,

    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,

    state: {
      pagination,
      columnFilters,
      rowSelection,
    },
  });

  return (
    <div className="w-auto flex flex-col gap-2">
      <div className="flex justify-between gap-1">
        <SearchBar table={table} />
        <div className="flex gap-2">
          <Filter
            table={table}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
          <CategoryFilter
            table={table}
            setColumnFilters={setColumnFilters}
            filterValues={category}
          />
          <ColumnVisibility table={table} />
        </div>
      </div>
      <MainTable table={table} />
      <TablePagination table={table} setPagination={setPagination} />
    </div>
  );
}
