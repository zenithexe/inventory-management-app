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
import { set } from "zod";

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
  const [showAll, setShowAll] = useState(true);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [columnFilters, setColumnFilters] = useState([]);

  useEffect(() => {
    console.log(columnFilters);
    console.log(table.getColumn("category").getFilterValue());
    console.log(table.getColumn("category").getFilterFn());
  }, [columnFilters]);

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

  // console.log(table.getColumn('category').getFilterFn())
  return (
    <div className="w-auto m-2">
      <Button
        onClick={(event) => {
          setColumnFilters([{ id: "quantity", value: [10, 20] }]);
        }}
      >
        Check
      </Button>

      <div className="flex justify-start gap-1">
        <Input
          placeholder="Search Item"
          value={table.getColumn("name").getFilterValue() ?? ""}
          onChange={(event) => {
            table.getColumn("name").setFilterValue(event.target.value);
          }}
          className="max-w-sm"
        />
        <Popover>
          <PopoverTrigger>
            <Button variant="outline">
              Filter <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Quantity</h4>
                </div>
                <div className="grid gap-2">
                  <div className="flex gap-2">
                    <div className="">
                      <p className="text-sm text-muted-foreground">Min</p>
                      <Input id="priceMin" type="number" className="col-span-2 h-8" />
                    </div>
                    <div className="">
                      <p className="text-sm text-muted-foreground">Max</p>
                      <Input id="priceMax" type="number" className="col-span-2 h-8" />
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <h4 className="font-medium leading-none">Price</h4>
                  <div className="flex gap-2">
                    <div className="">
                      <p className="text-sm text-muted-foreground">Min</p>
                      <Input id="priceMin" type="number" className="col-span-2 h-8" />
                    </div>
                    <div className="">
                      <p className="text-sm text-muted-foreground">Max</p>
                      <Input id="priceMax" type="number" className="col-span-2 h-8" />
                    </div>
                  </div>
                </div>
                <Button>Apply Filter</Button>
              </div>
            </PopoverContent>
          </PopoverTrigger>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" className="ml-auto">
              Category <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem
              key="all"
              checked={showAll}
              onSelect={(e) => {
                setShowAll(true);
                setColumnFilters([]);
              }}
            >
              Show All
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            {category.map((option) => (
              <DropdownMenuCheckboxItem
                key={option}
                checked={option == table.getColumn("category").getFilterValue()}
                onSelect={(event) => {
                  setColumnFilters((prev) => {
                    const categories = prev.find(
                      (item) => item.id === "category"
                    );

                    if (!categories)
                      return prev.concat({
                        id: "category",
                        value: event.srcElement.innerText,
                      });

                    const others = prev.filter((item) => item.id != "category");
                    return others.concat({
                      id: "category",
                      value: event.srcElement.innerText,
                    });
                  });
                  setShowAll(false);
                }}
              >
                {option}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

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
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {/* {flexRender(cell.column.columnDef.cell, cell.getContext())} */}
                    {cell.getValue()}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Button
        onClick={() => table.firstPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {"<<"}
      </Button>
      <Button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {"<"}
      </Button>
      <Button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        {">"}
      </Button>
      <Button
        onClick={() => table.lastPage()}
        disabled={!table.getCanNextPage()}
      >
        {">>"}
      </Button>
    </div>
  );
}
