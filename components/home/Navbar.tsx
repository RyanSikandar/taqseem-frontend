import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBars,
  faUser,
  faPeopleRoof,
  faHouse,
  faLocationDot,
  faTrophy,
  faHeart,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  return (
    <>
      <div className="flex items-center justify-around w-screen h-20 flex-nowrap">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost">
              <FontAwesomeIcon icon={faBars} className="w-8" />
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
        <Image
          className="relative"
          src="/assets/icons/Taqseem.svg"
          alt="icon"
          width={100}
          height={100}
          style={{ objectFit: "contain" }}
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} className="w-8" />
      </div>
    </>
  );
}
