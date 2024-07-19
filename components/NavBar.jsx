import React from "react";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Briefcase,
  CircleUserRound,
  LogOut,
  Package,
  Tags,
  Users,
} from "lucide-react";
import Link from "next/link";
import logo from "../public/assets/inventory.png";

function NavBar() {
  return (
    <>
      <div className="float-left fixed">
        <div className="flex h-screen w-16 flex-col justify-between border-e bg-white">
          <div>
            <div className="inline-flex size-16 items-center justify-center">
              <Link href="/">
                <span className="grid size-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
                  <Package />
                </span>
                
              </Link>
            </div>

            <div className="border-t border-gray-100">
              <div className="px-2">
                <div className="py-4">
                  <Link
                    href="/inventory"
                    className="t group relative flex justify-center roundedpx-2 py-1.5 text-slate-700"
                  >
                    <Briefcase className="h-6 w-6" />
                    <span className="z-50 invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                      Inventory
                    </span>
                  </Link>
                </div>

                <ul className="space-y-1 border-t border-gray-100 pt-4">
                  <li className="my-2">
                    <Link
                      href="/category"
                      className="t group relative flex justify-center rounded px-2 py-1.5 text-slate-700"
                    >
                      <Tags className="h-6 w-6" />

                      <span className="z-50 invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                        Category
                      </span>
                    </Link>
                  </li>
                  <li className="my-2">
                    <Link
                      href="/users"
                      className="t group relative flex justify-center rounded px-2 py-1.5 text-slate-700"
                    >
                      <Users className="h-6 w-6" />

                      <span className="z-50 invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                        Users
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default NavBar;
