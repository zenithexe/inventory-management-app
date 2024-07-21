"use client";
import React from "react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";

function Filter({ table, columnFilters, setColumnFilters }) {
  const [quantity, setQuantity] = useState({ min: null, max: null });
  const [price, setPrice] = useState({ min: null, max: null });

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const qMin = formData.get("quantityMin");
    const qMax = formData.get("quantityMax");
    const pMin = formData.get("priceMin");
    const pMax = formData.get("priceMax");

    setQuantity({ min: qMin, max: qMax });
    setPrice({ min: pMin, max: pMax });

    table.getColumn("quantity").setFilterValue([qMin, qMax]);
    table.getColumn("price").setFilterValue([pMin, pMax]);
  }

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            Filter <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Quantity</h4>
              </div>
              <div className="grid gap-2">
                <div className="flex gap-2">
                  <div className="">
                    <p className="text-sm text-muted-foreground">Min</p>
                    <Input
                      name="quantityMin"
                      id="quantityMin"
                      type="number"
                      className="col-span-2 h-8"
                      defaultValue={quantity.min ? quantity.min : null}
                    />
                  </div>
                  <div className="">
                    <p className="text-sm text-muted-foreground">Max</p>
                    <Input
                      name="quantityMax"
                      id="quantityMax"
                      className="col-span-2 h-8"
                      defaultValue={quantity.max ? quantity.max : null}
                    />
                  </div>
                </div>
                <DropdownMenuSeparator />
                <h4 className="font-medium leading-none">Price</h4>
                <div className="flex gap-2">
                  <div className="">
                    <p className="text-sm text-muted-foreground">Min</p>
                    <Input
                      name="priceMin"
                      id="priceMin"
                      type="number"
                      className="col-span-2 h-8"
                      defaultValue={price.min ? price.min : null}
                    />
                  </div>
                  <div className="">
                    <p className="text-sm text-muted-foreground">Max</p>
                    <Input
                      name="priceMax"
                      id="priceMax"
                      className="col-span-2 h-8"
                      defaultValue={price.max ? price.max : null}
                    />
                  </div>
                </div>
              </div>
              <Button type="submit">Apply Filter</Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default Filter;
