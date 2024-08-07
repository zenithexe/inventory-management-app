'use client';
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import {
    ArrowUpNarrowWide,
    ArrowDownNarrowWide,
    ArrowUpDown,
    ChevronsUpDown,
    ChevronUp,
    ChevronDown,
  } from "lucide-react";

function MainTable({ table }) {
  return (
    <>
      <div className="flex items-center rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
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
                        {header.column.getCanSort() &&
                          !header.column.getIsSorted() && (
                            <ChevronsUpDown
                              className="mt-[2px] ml-1  h-4 w-4"
                              onClick={header.column.getToggleSortingHandler()}
                            />
                          )}
                        {
                          {
                            asc: (
                              <ChevronUp
                                className="mt-[2px] ml-1  h-4 w-4"
                                onClick={header.column.getToggleSortingHandler()}
                              />
                            ),
                            desc: (
                              <ChevronDown
                                className="mt-[2px] ml-1  h-4 w-4"
                                onClick={header.column.getToggleSortingHandler()}
                              />
                            ),
                          }[header.column.getIsSorted()]
                        }
                      </div>
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default MainTable;
