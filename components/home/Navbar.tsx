import React from "react";
import { Search, Menu } from 'lucide-react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b z-50">
      <div className="flex items-center justify-between px-4 h-14">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="p-2">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="flex flex-col gap-4 mt-8">
              <Link href="/donate">
                <Button variant="ghost" className="w-full justify-start text-lg">
                  Donate
                </Button>
              </Link>
              <Link href="/volunteer">
                <Button variant="ghost" className="w-full justify-start text-lg">
                  Volunteer
                </Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-600" />
          <span className="font-semibold">UnityHub</span>
        </div>

        <Button variant="ghost" size="icon" className="p-2">
          <Search className="w-5 h-5" />
        </Button>
      </div>

      {/* Action buttons */}
      <div className="flex px-4 pb-3 gap-4 overflow-x-auto">
        <Button className="bg-blue-600 hover:bg-blue-700 rounded-full px-6">
          Donate
        </Button>
        <Button variant="ghost" className="rounded-full px-6">
          Support
        </Button>
        <Button variant="ghost" className="rounded-full px-6">
          Volunteer
        </Button>
        <Button variant="ghost" className="rounded-full px-6">
          Accommodate
        </Button>
      </div>
    </header>
  );
}

