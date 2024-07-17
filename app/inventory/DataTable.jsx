'use client'
import React, { useState } from "react";

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Filter from "./Filter";
import CategoryFilter from "./CategoryFilter";
import ColumnVisibility from "./ColumnVisibility";
import SearchBar from "./SearchBar";
import TablePagination from "./TablePagination";
import MainTable from "./MainTable";
import AddItemButton from "./AddItemButton";
import ItemDropdownMenu from "./ItemDropdownMenu";


// const data = [
//   {
//     itemId: 1,
//     name: "Jalish",
//     category: "B",
//     quantity: 60,
//     price: 100,
//   },
//   {
//     itemId: 2,
//     name: "Ricku",
//     category: "C",
//     quantity: 50,
//     price: 101,
//   },
//   {
//     itemId: 1,
//     name: "Ricku",
//     category: "A",
//     quantity: 40,
//     price: 120,
//   },
//   {
//     itemId: 2,
//     name: "Ricku",
//     category: "B",
//     quantity: 30,
//     price: 130,
//   },
//   {
//     itemId: 1,
//     name: "Ricku",
//     category: "N",
//     quantity: 20,
//     price: 150,
//   },
//   {
//     itemId: 2,
//     name: "Ricku",
//     category: "A",
//     quantity: 10,
//     price: 100,
//   },
//   {
//     itemId: 1,
//     name: "Ricku",
//     category: "Z",
//     quantity: 10,
//     price: 100,
//   },
// ];

export default function DataTable({ data, category, categoryFilters, session }) {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});

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
      cell: ({row}) => {
        return (
          <ItemDropdownMenu row={row} session={session} category={category}/>
        );
      },
    },
    
  ];


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
    <>
      <div className="mb-10">
        <AddItemButton category={category} />
      </div>
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
              filterValues={categoryFilters}
            />
            <ColumnVisibility table={table} />
          </div>
        </div>
        <MainTable table={table} />
        <TablePagination table={table} setPagination={setPagination} />
      </div>
    </>
  );
}
