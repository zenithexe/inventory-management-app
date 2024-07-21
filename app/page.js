
import { Package, ShieldCheck, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <span className="grid size-20 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
          <Package strokeWidth={1.3} className=" size-16" />
        </span>
        <h1 className="text-[30px] text-center font-mono font-semibold">
          Inventory Management Project
        </h1>
        <div className="font-mono text-center">
          This is a full-stack inventory management project,
          <br/> made using <Badge variant="secondary">Nextjs</Badge> and <Badge variant="secondary">MongoDB</Badge>
        </div>
        <Link href="/login">
          <Button className="my-10 " variant="outline">
            Get Started
          </Button>
        </Link>
        <p className="font-mono text-center justify-self-end">
          Made by Jalish Buktawar
        </p>
      </div>
    </>
  );
}
