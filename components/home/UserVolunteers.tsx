"use client";

import React from "react";
import { HelpingHandIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

//mock implementaion, api fix pls
const useUserVolunteers = () => {
  // Mock data
  return {
    volunteers: [
      {
        id: "1",
        title: "Teach maths to underprivileged children",
        description: "Teaching maths to improve learning environment",
        currentVolunteers: 4,
        targetVolunteers: 10,
        daysLeft: 30,
        image: ["/assets/images/needy.webp"],
      },
    ],
  };
};

export default function UserVolunteers() {
  const { volunteers } = useUserVolunteers();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Volunteers</h1>
          <p className="mt-2 text-sm text-gray-600">
            Projects you've created to request volunteer
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {volunteers.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[50vh] col-span-full">
              <HelpingHandIcon className="h-12 w-12 text-[#F7AB0A]" />
              <h2 className="text-lg font-semibold mt-4">No volunteers yet</h2>
              <p className="text-sm text-gray-600 text-center mt-2">
                Add a request to view your volunteers.
              </p>
            </div>
          ) : (
            volunteers.map((volunteer) => (
              <Card key={volunteer.id} className="overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full">
                    <img
                      src={volunteer.image[0] || "/placeholder.svg"}
                      alt={volunteer.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-xl font-semibold mb-2">
                    {volunteer.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mb-4">
                    {volunteer.description}
                  </p>
                  <Progress
                    value={
                      (volunteer.currentVolunteers / volunteer.targetVolunteers) * 100
                    }
                    className="mb-2 [&>*]:bg-[#F7AB0A]/80"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{volunteer.currentVolunteers} Volunteers</span>
                    <span>{volunteer.targetVolunteers} Volunteers</span>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-600">
                    <span>{volunteer.daysLeft} days left</span>
                  </div>
                  <Button
                    className="bg-black hover:bg-[#F7AB0A] text-white"
                    onClick={() =>
                      router.push(`/volunteer/detail/${volunteer.id}`)
                    }
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
