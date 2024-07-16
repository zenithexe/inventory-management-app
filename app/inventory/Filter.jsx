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
    e.preventDefault()
    table.getColumn("quantity").setFilterValue([quantity.min, quantity.max]);
    table.getColumn("price").setFilterValue([price.min, price.max]);
  }

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Button variant="outline">
            Filter <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
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
                        id="quantityMin"
                        type="number"
                        className="col-span-2 h-8"
                        value={quantity.min ? quantity.min : null}
                       
                        onChange={(e) => {
                          setQuantity({ ...quantity, min: e.target.value });
                        }}
                      />
                    </div>
                    <div className="">
                      <p className="text-sm text-muted-foreground">Max</p>
                      <Input
                        id="quantityMax"
                        className="col-span-2 h-8"
                        value={quantity.max ? quantity.max : null}
                        
                        onChange={(e) => {
                          setQuantity({ ...quantity, max: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <h4 className="font-medium leading-none">Price</h4>
                  <div className="flex gap-2">
                    <div className="">
                      <p className="text-sm text-muted-foreground">Min</p>
                      <Input
                        id="priceMin"
                        type="number"
                        className="col-span-2 h-8"
                        value={price.min ? price.min : null}
                        onChange={(e) => {
                          setPrice({ ...price, min: e.target.value });
                        }}
                      />
                    </div>
                    <div className="">
                      <p className="text-sm text-muted-foreground">Max</p>
                      <Input
                        id="priceMax"
                        className="col-span-2 h-8"
                        value={price.max ? price.max : null}
                        onChange={(e) => {
                          setPrice({ ...price, max: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <Button type="submit">Apply Filter</Button>
              </div>
            </form>
          </PopoverContent>
        </PopoverTrigger>
      </Popover>
    </>
  );
}

export default Filter;
