import Image from "next/image";
import { ArrowLeft, MessageCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Volunteer as Post } from "@/types";
import { useState } from "react";

export interface VolunteerPageProps {
  post: Post;
}

const images = [
  "/assets/images/needy.webp",
  "/assets/images/needy.webp",
  "/assets/images/needy.webp",
];

const donorsData = [
  {
    name: "Ali Raza",
    location: "Islamabad, Pakistan",
    message: "I just love what your doing for the kids..good luck sir",
    time: "2 days ago",
  },
  {
    name: "Ali Raza",
    location: "Islamabad, Pakistan",
    message: "I just love what your doing for the kids..good luck sir",
    time: "2 days ago",
  },
  {
    name: "Ali Raza",
    location: "Islamabad, Pakistan",
    message: "I just love what your doing for the kids..good luck sir",
    time: "2 days ago",
  },
  {
    name: "Ali Raza",
    location: "Islamabad, Pakistan",
    message: "I just love what your doing for the kids..good luck sir",
    time: "2 days ago",
  },
  {
    name: "Qasim Ahmed",
    location: "Rawalpindi, Pakistan",
    time: "2 days ago",
  },
];

export default function VolunteerPage({ post }: VolunteerPageProps) {
  const [donorsDat, setDonorsDat] = useState(donorsData);
  const [showAllDonors, setShowAllDonors] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-4 justify-center">
          <h1 className="text-2xl font-semibold">Volunteer</h1>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardHeader className="space-y-4">
                <div className="relative rounded-lg overflow-hidden">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {post.image.map((image, index) => (
                        <CarouselItem key={index}>
                          <div className="relative aspect-video">
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`Donation image ${index + 1}`}
                              fill
                              className="object-cover"
                              priority={index === 0}
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </Carousel>
                </div>
                <h2 className="text-2xl font-bold">{post.title}</h2>
                <p className="text-gray-500">{post.description}</p>
              </CardHeader>
              <CardFooter>
                <Button
                  className="w-full bg-black hover:bg-[#F7AB0A]"
                  size="lg"
                >
                  Volunteer Now
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="flex flex-col gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Raised by</h3>
                  <a href="#" className="text-primary">
                    <MessageSquare />
                  </a>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-lg border">
                  <Avatar>
                    <AvatarImage src={`${post.author.image}`} />
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold">{post.author.name}</h4>
                        <p className="text-sm text-gray-500">
                          {post.author.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Donation Cause</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{post.cause}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
