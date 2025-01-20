"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { SideMenu } from "./SideMenu";
import { Command, CommandInput } from "@/components/ui/command";

export default function Navbar() {
  const [activePage, setActivePage] = useState<"donate" | "volunteer" | null>(
    "donate"
  );

  const handleButtonClick = (page: "donate" | "volunteer") => {
    setActivePage(page);
  };

  return (
    <div className="fixed top-0 left-0 right-0 pb-2 bg-white border-b z-50 opacity-100 flex flex-col items-center">
      <div className="flex items-center justify-between px-4 h-14 w-full">
        <SideMenu />
        <div className="flex items-center gap-2">
          <img
            src="/assets/icons/Taqseem.svg"
            alt="logo"
            className="w-25 h-20"
          />
        </div>
        <div></div>
      </div>
      <div className="w-full flex justify-center items-center py-4">
        <div className="w-1/2 rounded-lg border-2 border-gray-100">
          <Command>
            <CommandInput placeholder="search for a cause" />
          </Command>
        </div>
      </div>
    </div>

    // {/* Action buttons */}
    // {/* <div className="flex px-4 pb-3 gap-4 overflow-x-auto justify-around">
    //   <Button
    //     className={`rounded-full px-6 ${
    //       activePage === "donate"
    //         ? "bg-[#F7AB0A] hover:bg-[#F7AB0A]/80"
    //         : "bg-black hover:bg-[#F7AB0A]/80"
    //     }`}
    //     onClick={() => handleButtonClick("donate")}
    //   >
    //     Donate
    //   </Button>
    //   <Button
    //     className={`rounded-full px-6 ${
    //       activePage === "volunteer"
    //         ? "bg-[#F7AB0A] hover:bg-[#F7AB0A]/80"
    //         : "bg-black hover:bg-[#F7AB0A]/80"
    //     }`}
    //     onClick={() => handleButtonClick("volunteer")}
    //   >
    //     Volunteer
    //   </Button>
    // </div> */}
  );
}
