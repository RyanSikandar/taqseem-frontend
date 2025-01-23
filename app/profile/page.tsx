"use client"

import { useState } from "react"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
    about:
      "I'm a software engineer with a passion for building great products. I enjoy working on challenging problems and collaborating with talented teams.",
    location: "San Francisco, CA",
    gender: "Male",
    CNIC: "12306-9765415-5"
  })
  const handleEdit = () => {
    setEditMode(true)
  }
  const handleSave = () => {
    setEditMode(false)
  }
  return (
    <div className="h-screen p-4 flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-auto ">
        <CardHeader className="flex flex-col items-center gap-4 pt-8 pb-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="grid gap-1 text-center">

            <div className="text-2xl font-bold">{formData.name}</div>

            <div className="text-sm text-muted-foreground">{formData.email}</div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="grid gap-4 p-6">
          <div className="grid gap-2">
            <div className="text-sm font-medium text-black">About</div>

            <div className="text-sm text-muted-foreground">{formData.about}</div>

          </div>
          <div className="grid gap-2">
            <div className="text-sm font-medium text-black">Location</div>

            <div className="text-sm text-muted-foreground">{formData.location}</div>

          </div>
          <div className="grid gap-2">
            <div className="text-sm font-medium text-black">CNIC</div>

            <div className="text-sm text-muted-foreground">{formData.CNIC}</div>

          </div>
        </CardContent>
        <CardFooter className="flex justify-end p-4">
          {editMode ? (
            <Button variant="outline" onClick={handleSave} className="bg-black text-white hover:bg-[#F7AB0A] hover:text-white">
              Save
            </Button>
          ) : (
            <Button variant="outline" onClick={handleEdit} className="bg-black text-white hover:bg-[#F7AB0A] hover:text-white">
              Edit
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}