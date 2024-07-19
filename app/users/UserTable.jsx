"use client";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender,
  getFilteredRowModel,
} from "@tanstack/react-table";
import React, { useMemo } from "react";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SearchBar from "./SearchBar";



import TablePagination from "./TablePagination";
import UserDropdownMenu from "./UserDropdownMenu";

function UserTable({session ,data}) {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const userColumns = [
    {
      header: "Username",
      accessorKey: "username",
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Role",
      accessorKey: "isAdmin",
      cell: ({cell}) => (
        <Badge variant="secondary">{cell.getValue() ? "Admin" : "User"}</Badge>
      ),
    },
    {
      header: "Created At",
      accessorKey: "created",
      cell: ({cell}) => (cell.getValue().split('T')[0])
    },
    {
      id: "options",
      enableHiding: false,
      cell: ({row}) => {
        return (
          <UserDropdownMenu row={row} session={session}/>
        );
      },
    },
  ];
  
  const userTable = useReactTable({
    data,
    columns: userColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,

    state: {
      pagination,
    }

  });



  return (
    <>
      <div className="w-auto flex flex-col gap-2">
        <div className="flex justify-between gap-1">
          <SearchBar table={userTable} />
        </div>
        <div className="flex items-center rounded-md border">
          <Table>
            <TableHeader>
              {userTable.getHeaderGroups().map((headerGroup) => (
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
              {userTable.getRowModel().rows.map((row) => (
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
        <TablePagination table={userTable} setPagination={setPagination} />
      </div>
    </>
  );
}

export default UserTable;
