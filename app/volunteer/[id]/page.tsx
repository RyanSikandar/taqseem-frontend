"use client";

import VolunteerPage from "@/components/home/individual-volunteer-card";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const { id } = useParams();
  const samplePost = {
    id: "2",
    author: {
      name: "Ali Raza",
      location: "Lahore, Pakistan",
      avatar: "/assets/images/avatar4.png",
    },
    image: ["/assets/images/needy.webp"],
    title: "Teach English to underprivileged children",
    description:
      "Share your knowledge and skills by volunteering to teach English to children in need. Your time can change their lives forever!",
    currentAmount: 8,
    targetAmount: 20,
    daysLeft: 10,
  };

  return <VolunteerPage post={samplePost} />;
};

export default page;
