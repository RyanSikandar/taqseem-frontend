/**
 * v0 by Vercel.
 * @see https://v0.dev/t/A531zHzRIU2
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState } from "react"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export default function Component() {
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
    about:
      "I'm a software engineer with a passion for building great products. I enjoy working on challenging problems and collaborating with talented teams.",
    location: "San Francisco, CA",
    joined: "June 2021",
  })
  const handleEdit = () => {
    setEditMode(true)
  }
  const handleSave = () => {
    setEditMode(false)
  }
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-col items-center gap-4 pt-8 pb-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="grid gap-1 text-center">
          {editMode ? (
            <Textarea
              className="text-2xl font-bold"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          ) : (
            <div className="text-2xl font-bold">{formData.name}</div>
          )}
          {editMode ? (
            <Textarea
              className="text-sm text-muted-foreground"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          ) : (
            <div className="text-sm text-muted-foreground">{formData.email}</div>
          )}
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="grid gap-4 p-6">
        <div className="grid gap-2">
          <div className="text-sm font-medium text-muted-foreground">About</div>
          {editMode ? (
            <Textarea
              className="text-sm text-muted-foreground"
              value={formData.about}
              onChange={(e) => setFormData({ ...formData, about: e.target.value })}
            />
          ) : (
            <div className="text-sm text-muted-foreground">{formData.about}</div>
          )}
        </div>
        <div className="grid gap-2">
          <div className="text-sm font-medium text-muted-foreground">Location</div>
          {editMode ? (
            <Textarea
              className="text-sm text-muted-foreground"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          ) : (
            <div className="text-sm text-muted-foreground">{formData.location}</div>
          )}
        </div>
        <div className="grid gap-2">
          <div className="text-sm font-medium text-muted-foreground">Joined</div>
          {editMode ? (
            <Textarea
              className="text-sm text-muted-foreground"
              value={formData.joined}
              onChange={(e) => setFormData({ ...formData, joined: e.target.value })}
            />
          ) : (
            <div className="text-sm text-muted-foreground">{formData.joined}</div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end p-4">
        {editMode ? (
          <Button variant="outline" onClick={handleSave}>
            Save
          </Button>
        ) : (
          <Button variant="outline" onClick={handleEdit}>
            Edit
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}