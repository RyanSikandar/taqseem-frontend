'use client'

import React, { useState, useEffect } from "react";
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { SideMenu } from "./SideMenu";
import useNavbarStore from '@/store/useNavbarStore';

export default function Navbar() {
  const { button, toggle } = useNavbarStore();
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b z-50 opacity-100 ">
      <div className="flex items-center justify-between px-4 h-14">
        <SideMenu />
        <div className="flex items-center gap-2">
          <img src="/assets/icons/Taqseem.svg" alt="logo" className="w-25 h-20" />
        </div>
        <Button variant="ghost" size="icon" className="p-2">
          <Search className="w-5 h-5" />
        </Button>
      </div>
      {/* Action buttons */}
      <div className="flex px-4 pb-3 gap-4 overflow-x-auto justify-around">
        <Button
          className={`rounded-full px-6 ${button === 'donate' ? 'bg-[#F7AB0A] hover:bg-[#F7AB0A]/80' : 'bg-black hover:bg-[#F7AB0A]/80'
            }`}
          onClick={() => toggle('donate')}
        >
          Donate
        </Button>
        <Button
          className={`rounded-full px-6 ${button === 'volunteer' ? 'bg-[#F7AB0A] hover:bg-[#F7AB0A]/80' : 'bg-black hover:bg-[#F7AB0A]/80'
            }`}
          onClick={() => toggle('volunteer')}
        >
          Volunteer
        </Button>
      </div>
    </header>
  );
}

