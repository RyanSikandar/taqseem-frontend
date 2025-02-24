"use client";

import VolunteerPage from "@/components/home/individual-volunteer-card";
import { Volunteer } from "@/types";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const { id } = useParams();
  const samplePost:Volunteer = {
    author: {
      name: "Ali Raza",
      location: "Lahore, Pakistan",
      image: "/assets/images/needy.webp",
      _id: "1",
    },
    image: ["/assets/images/needy.webp"],
    title: "Teach English to underprivileged children",
    description:
      "Share your knowledge and skills by volunteering to teach English to children in need. Your time can change their lives forever!",
    daysLeft: 10,
    cause: "Education",
    help: "Teaching",
    currentVolunteers: 5,
    targetVolunteers: 10,
    location: "Lahore, Pakistan",
    isCompleted: false,
    _id: "2",
  };

  return <VolunteerPage post={samplePost} />;
};

export default page;
