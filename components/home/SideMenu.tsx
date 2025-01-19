import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPeopleRoof,
  faHouse,
  faLocationDot,
  faTrophy,
  faHeart,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Menu } from 'lucide-react';

export function SideMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="p-2">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div>
          <div className="py-3">
            <Link href="#">
              <div className="flex text-xl">
                <FontAwesomeIcon icon={faUser} className="w-4 mr-4" />
                <p>Profile</p>
              </div>
            </Link>
          </div>
          <div className="py-3">
            <Link href="#">
              <div className="flex text-xl">
                <FontAwesomeIcon icon={faPeopleRoof} className="w-4 mr-4" />
                <p>Community</p>
              </div>
            </Link>
          </div>
          <div className="py-3">
            <Link href="#" className="flex text-xl">
              <FontAwesomeIcon icon={faHouse} className="w-4 mr-4" />
              <p>Near Shelter</p>
            </Link>
          </div>
          <div className="py-3">
            <Link href="#" className="flex text-xl">
              <FontAwesomeIcon icon={faLocationDot} className="w-4 mr-4" />
              <p>Location</p>
            </Link>
          </div>
          <div className="py-3">
            <Link href="#">
              <div className="flex text-xl">
                <FontAwesomeIcon icon={faTrophy} className="w-4 mr-4" />
                <p>Reward</p>
              </div>
            </Link>
          </div>
          <div className="py-3">
            <Link href="#" className="flex text-xl">
              <FontAwesomeIcon icon={faHeart} className="w-4 mr-4" />
              <p>Favourite</p>
            </Link>
          </div>
        </div>
        <SheetFooter>
          <Button className="mt-24">
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="w-4 mr-4"
            />
            Log Out
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

