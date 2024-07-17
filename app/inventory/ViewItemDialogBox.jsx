import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


function ViewItemDialogBox({ itemData, open, onOpenChange }) {
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-80">
          <DialogHeader>
            <DialogTitle className="text-xl">View Item</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 items-center gap-4">
                <h3 className="text-sm font-semibold ">
                  Item ID :
                </h3>
                <p className="text-sm">{itemData?.item?.itemId}</p>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <h3 className="text-sm font-semibold">
                  Name :
                </h3>
                <p className="text-sm">{itemData?.item?.name}</p>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <h3 className="text-sm font-semibold">
                  Category :
                </h3>
                <p className="text-sm">{itemData?.item?.category?.name}</p>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <h3 className="text-sm font-semibold">
                  Description :
                </h3 >
                <p className="text-sm">{itemData?.item?.description}</p>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <h3 className="text-sm font-semibold">
                  Quantity :
                </h3>
                <p className="text-sm">{itemData?.item?.quantity}</p>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <h3 className="text-sm font-semibold">
                  Price :
                </h3>
                <p className="text-sm">{itemData?.item?.price}</p>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <h3 className="text-sm font-semibold">
                  Created on :
                </h3>
                <p className="text-sm">{itemData?.item?.created.split('T')[0]}</p>
            </div>
            </div>
            
              
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ViewItemDialogBox;
