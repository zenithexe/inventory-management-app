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
  Menu,
  Package,
  Tags,
  Users,
} from "lucide-react";
import Link from "next/link";
import logo from "../public/assets/inventory.png";

function NavBar() {
  return (
    <>
      <div className="flex z-10">
        <div
          className="flex w-screen justify-between border-e bg-white
          lg:flex-col lg:justify-start lg:w-auto lg:float-left lg:fixed lg:h-screen
        "
        >
          <div className="inline-flex size-16 items-center justify-center">
            <Link href="/">
              <span className="grid size-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
                <Package />
              </span>
            </Link>
          </div>

          <div className="hidden lg:flex lg:flex-col lg:border-t-2  lg:mt-2 lg:pt-20 lg:gap-4">
            <div className="">
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

            <div className="">
              <Link
                href="/category"
                className="t group relative flex justify-center rounded px-2 py-1.5 text-slate-700"
              >
                <Tags className="h-6 w-6" />
                <span className="z-50 invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                  Category
                </span>
              </Link>
            </div>

            <div className="">
              <Link
                href="/users"
                className="t group relative flex justify-center rounded px-2 py-1.5 text-slate-700"
              >
                <Users className="h-6 w-6" />
                <span className="z-50 invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                  Users
                </span>
              </Link>
            </div>
          </div>

          <div className="py-4 lg:hidden">
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>
                  <Menu />
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    <Link href="/inventory">Inventory</Link>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <Link href="/category">Category</Link>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <Link href="/users">Users</Link>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
