"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, X } from "lucide-react";

// This is a mock function. Replace it with actual data fetching logic.
const useVolunteerDetails = (id: string) => {
  // Mock data
  return {
    id: "1",
    author: {
      name: "Rayan Sikandar",
      location: "Islamabad, Pakistan",
      avatar: "/assets/images/avatar.png",
    },
    image: [
      "/assets/images/needy.webp",
      "/assets/images/needy.webp",
      "/assets/images/needy.webp",
    ],
    title: "Teach maths to underprivileged children",
    description:
      "With your help, we aim to create a modern and comfortable learning environment that fosters creativity, innovation, and excellence in education. The impact of your contribution will extend beyond the walls of our school.",
    currentVolunteers: 4,
    targetVolunteers: 10,
    daysLeft: 1,
    latestVolunteers: [
      {
        id: "1",
        name: "John Doe",
        contact: "+923006567453",
        email: "john@yahoo.com",
      },
      {
        id: "2",
        name: "Jane Smith",
        contact: "+923006561459",
        email: "jane@yahoo.com",
      },
      {
        id: "3",
        name: "Alice Johnson",
        contact: "+923006567433",
        email: "alice@yahoo.com",
      },
    ],
  };
};

export default function VolunteerDetails({ id }: { id: string }) {
  const volunteer = useVolunteerDetails(id);
  const [latestvolunteers, setLatestvolunteers] = useState(
    volunteer.latestVolunteers
  );

  const handleVerify = (volunteerId: string) => {
    setLatestvolunteers((prevvolunteers) =>
      prevvolunteers.map((d) =>
        d.id === volunteerId ? { ...d, verified: true } : d
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage
                  src={volunteer.author.avatar}
                  alt={volunteer.author.name}
                />
                <AvatarFallback>
                  {volunteer.author.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{volunteer.title}</CardTitle>
                <p className="text-sm text-gray-500">
                  {volunteer.author.name} - {volunteer.author.location}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <img
                src={volunteer.image[0] || "/placeholder.svg"}
                alt={volunteer.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <p className="text-gray-700 mb-4">{volunteer.description}</p>
            <Progress
              value={
                (volunteer.currentVolunteers / volunteer.targetVolunteers) * 100
              }
              className="mb-2 [&>*]:bg-[#F7AB0A]/80"
            />
            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <span>{volunteer.currentVolunteers} Volunteers</span>
              <span>{volunteer.targetVolunteers} Volunteers</span>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Latest volunteers</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Email Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {latestvolunteers.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell>{d.name}</TableCell>
                      <TableCell>{d.contact}</TableCell>
                      <TableCell>{d.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
