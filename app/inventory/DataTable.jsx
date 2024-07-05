"use client";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
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
];

export default function DataTable({ data, category }) {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data: data,
    columns,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,

    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,

    getSortedRowModel: getSortedRowModel(),

    state: {
      pagination,
      columnFilters,
    },
  });

  useEffect(() => {
    console.log("Column Filters ::", columnFilters);
    console.log(
      "Filter Value ::",
      table.getColumn("category").getFilterValue()
    );
    console.log("Filter Fns \n", table.getColumn("category").getFilterFn());
  }, [columnFilters]);

  return (
    <div className="w-auto m-2 flex flex-col gap-2">
      <div className="flex justify-start gap-1">
        <SearchBar table={table} />
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
      <MainTable table={table} />
      <TablePagination table={table} setPagination={setPagination} />
    </div>
  );
}
