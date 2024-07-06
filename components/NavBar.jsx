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
import { Briefcase, CircleUserRound, Tags, Users } from "lucide-react";
import Link from "next/link";

function NavBar() {
  return (
    <>
      <div className="float-left mr-4">
        <div className="flex h-screen w-16 flex-col justify-between border-e bg-white">
          <div>
            <div className="inline-flex size-16 items-center justify-center">
              <span className="grid size-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
                In
              </span>
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

          <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
            <form action="#">
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5 opacity-75"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>

                <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                  Logout
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
