"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ProfileData } from "@/types/profileData";

export default function ProfilePage() {
  const [formData, setFormData] = useState<ProfileData>({
    name: "John Doe",
    email: "",
    image: "",
    description: "",
    cnic: 0,
    location: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/user`, {
        method: 'GET',
        cache: 'no-store',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      if (!res.ok) {
        throw new Error("Failed to fetch data")
      }
      const data = await res.json()
      setFormData(data)
    }
    fetchData()
  },[])
  return (
    <div className="h-screen p-4 flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-auto ">
        <CardHeader className="flex flex-col items-center gap-4 pt-8 pb-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={`${formData.image}`} alt="@shadcn" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="grid gap-1 text-center">
            <div className="text-2xl font-bold">{formData.name}</div>
            <div className="text-sm text-muted-foreground">
              {formData.email}
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="grid gap-4 p-6">
          <div className="grid gap-2">
            <div className="text-sm font-medium text-black">About</div>
            <div className="text-sm text-muted-foreground">
              {formData.description}
            </div>
          </div>
          <div className="grid gap-2">
            <div className="text-sm font-medium text-black">Location</div>
            <div className="text-sm text-muted-foreground">
              {formData.location}
            </div>
          </div>
          <div className="grid gap-2">
            <div className="text-sm font-medium text-black">CNIC</div>
            <div className="text-sm text-muted-foreground">{formData.cnic}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
