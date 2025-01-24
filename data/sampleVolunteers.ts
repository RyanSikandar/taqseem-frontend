import { Post } from "@/types";

export const sampleVolunteerPosts: Post[] = [
  {
    id: "1",
    author: {
      name: "Sara Khan",
      location: "Karachi, Pakistan",
      avatar: "/assets/images/avatar3.png",
    },
    image: ["/assets/images/needy.webp"],
    title: "Join us for a beach cleanup",
    description:
      "Help us keep our beaches clean and beautiful! Join us for a day of fun and community service as we collect trash and debris from the shoreline.",
    currentAmount: 15,
    targetAmount: 50,
    daysLeft: 5,
  },
  {
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
  },
  {
    id: "3",
    author: {
      name: "Fatima Noor",
      location: "Islamabad, Pakistan",
      avatar: "/assets/images/avatar5.png",
    },
    image: ["/assets/images/needy.webp"],
    title: "Help at the local animal shelter",
    description:
      "Join us in caring for abandoned animals at our local shelter. Volunteers are needed to help with feeding, grooming, and socializing the animals.",
    currentAmount: 5,
    targetAmount: 15,
    daysLeft: 7,
  },
];
