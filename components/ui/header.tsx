'use client'

import { Search, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b z-50">
      <div className="flex items-center justify-between px-4 h-14">
        <button className="p-2" onClick={onMenuClick}>
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-600" />
          <span className="font-semibold">Taqseem</span>
        </div>
        <button className="p-2">
          <Search className="w-5 h-5" />
        </button>
      </div>
      
      {/* Action buttons */}
      <div className="flex justify-between px-4 pb-3 gap-4 overflow-x-hidden">
        <Button className="bg-blue-600 hover:bg-blue-700 rounded-full px-6">Donate</Button>
        <Button variant="ghost" className="rounded-full px-6">Support</Button>
        <Button variant="ghost" className="rounded-full px-6">Volunteer</Button>
        <Button variant="ghost" className="rounded-full px-6">Accommodate</Button>
      </div>
    </header>
  )
}

