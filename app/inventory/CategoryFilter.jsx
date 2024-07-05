import React from "react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

function CategoryFilter({ table, filterValues, setColumnFilters }) {
  const [showAll, setShowAll] = useState(true);

  return (
    <>
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
          {filterValues.map((option) => (
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
    </>
  );
}

export default CategoryFilter;
