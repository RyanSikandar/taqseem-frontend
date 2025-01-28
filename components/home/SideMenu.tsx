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
  faHeart,
  faHome,
  faArrowRightFromBracket,
  faDonate
} from "@fortawesome/free-solid-svg-icons";
import { Menu } from 'lucide-react';
import { useRouter } from "next/navigation";
import axios from "axios";

export function SideMenu() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/logout", { withCredentials: true });
      if (response.status === 200) {
        router.push("/login");
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="p-2">
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div>
          <Link href="/dashboard">
            <div className="py-3">
              <img src="/assets/icons/Taqseem.svg" alt="logo" className="w-25 h-20" />
            </div>
          </Link>
          <div className="py-3">
            <Link href="/dashboard">
              <div className="flex text-xl hover:underline decoration-[#F7AB0A]">
                <FontAwesomeIcon icon={faHome} className="w-4 mr-4" />
                <p>Home</p>
              </div>
            </Link>
          </div>
          <div className="py-3">
            <Link href="/yourDonations">
              <div className="flex text-xl hover:underline decoration-[#F7AB0A]">
                <FontAwesomeIcon icon={faDonate} className="w-4 mr-4" />
                <p>Your Donations</p>
              </div>
            </Link>
          </div>
          <div className="py-3">
            <Link href="/profile">
              <div className="flex text-xl hover:underline decoration-[#F7AB0A]">
                <FontAwesomeIcon icon={faUser} className="w-4 mr-4" />
                <p>Profile</p>
              </div>
            </Link>
          </div>
          <div className="py-3">
            <Link href="/add-donation" className="flex text-xl hover:underline decoration-[#F7AB0A]">
              <FontAwesomeIcon icon={faPeopleRoof} className="w-4 mr-4" />
              <p>Add a Donation</p>
            </Link>
          </div>

          <div className="py-3">
            <Link href="/favourite" className="flex text-xl hover:underline decoration-[#F7AB0A]">
              <FontAwesomeIcon icon={faHeart} className="w-4 mr-4" />
              <p>Favourite</p>
            </Link>
          </div>
        </div>
        <SheetFooter>
          <Button className="mt-5 bg-black text-white hover:bg-[#F7AB0A] hover:text-white" onClick={handleLogout}>
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

