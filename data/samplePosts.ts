import { Post } from "@/types";

export const samplePosts: Post[] = [
  {
    id: "1",
    author: {
      name: "Rayan Sikandar",
      location: "Islamabad, Pakistan",
      avatar: "/assets/images/avatar.png",
    },
    image: ["/assets/images/needy.webp"],
    title: "Need donation for school renovation",
    description:
      "With your help, we aim to create a modern and comfortable learning environment that fosters creativity, innovation, and excellence in education. The impact of your contribution will extend beyond the walls of our school.",
    currentAmount: 1000,
    targetAmount: 7000,
    daysLeft: 1,
  },
  {
    id: "2",
    author: {
      name: "Umer Ali",
      location: "Madurai, Tamilnadu",
      avatar: "/assets/images/avatar2.png",
    },
    image: ["/assets/images/needy.webp"],
    title: "Support our community center expansion",
    description:
      "Help us expand our community center to provide more services and programs for our local residents. Your contribution will make a significant impact on the lives of many in our community.",
    currentAmount: 9000,
    targetAmount: 10000,
    daysLeft: 3,
  },
  {
    id: "3",
    author: {
      name: "Umer Ali",
      location: "Madurai, Tamilnadu",
      avatar: "/assets/images/avatar2.png",
    },
    image: ["/assets/images/needy.webp"],
    title: "Support our community center expansion",
    description:
      "Help us expand our community center to provide more services and programs for our local residents. Your contribution will make a significant impact on the lives of many in our community.",
    currentAmount: 5000,
    targetAmount: 10000,
    daysLeft: 3,
  },
];
