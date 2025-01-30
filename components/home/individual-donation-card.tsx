'use client'
import React, { useState } from "react"
import Image from "next/image"
import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Donation } from "@/types"
import { useToast } from "@/hooks/use-toast"
import { Input } from "../ui/input"
import { useMutation } from "@tanstack/react-query"
export interface DonationPageProps {
  post: Donation
}

export interface addContributionProps {
  amountDonated: number;
  donationId: string;
}

const addContribution = async ({ amountDonated, donationId }: addContributionProps) => {
  const data = {
    amount: amountDonated
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/donation/${donationId}/contribute`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Failed to add contribution")
  }

  return response.json()
}

export default function DonationPage({ post }: DonationPageProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [amountDonated, setAmountDonated] = useState<number | "">("");
  const { toast } = useToast()

  const verifyMutation = useMutation({
    mutationFn: addContribution,
    onSuccess: () => {
      toast({
        title: "Donation has been sent!",
        description: `Thank you for your generous donation ${post.author.name}. `,
        variant: "default",
        className: "bg-[#F7AB0A] text-black"

      })
    },
    onError: () => {
      toast({
        title: "Failed to send donation",
        description: "An error occurred, Please try again",
        variant: "destructive",
        className: "bg-red-500 text-white"
      })
    }
  });

  function handleClick() {
    if (!amountDonated || amountDonated < 0) return
    setIsDialogOpen(false)
    verifyMutation.mutate({ amountDonated: Number(amountDonated), donationId: post._id })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-4 justify-center">
          <h1 className="text-3xl font-semibold">Donation</h1>
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
                              className="object-contain"
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
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold">Rs. {post.currentAmount}</div>
                      <div className="text-sm text-gray-500">Raised</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold">Rs. {post.targetAmount}</div>
                      <div className="text-sm text-gray-500">Goal</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold">{post.daysLeft}</div>
                      <div className="text-sm text-gray-500">days</div>
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-4 mt-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">IBAN Number</h4>
                    <p className="mt-1 text-lg font-semibold">{post.IBAN}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Bank Name</h4>
                    <p className="mt-1 text-lg font-semibold">{post.BankName}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Amount to donate (Rs):</h4>
                    <Input type="number" placeholder="Enter amount" required value={amountDonated}
                      onChange={(e) => setAmountDonated(e.target.value ? parseInt(e.target.value, 10) || "" : "")}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-black hover:bg-[#F7AB0A]" size="lg" disabled={!amountDonated || amountDonated <= 0} >
                      Send Donation
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Send Donation</DialogTitle>
                      <DialogDescription>Please send your donation to the following account and click the button once done:</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <span className="text-right font-medium col-span-1">IBAN:</span>
                        <span className="col-span-3">{post.IBAN}</span>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <span className="text-right font-medium col-span-1">Account Title:</span>
                        <span className="col-span-3">{post.AccountTitle}</span>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <span className="text-right font-medium col-span-1">Bank:</span>
                        <span className="col-span-3">{post.BankName}</span>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        className="bg-black hover:bg-[#F7AB0A]"
                        onClick={handleClick}
                      >
                        I have sent the donation
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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
                        <p className="text-sm text-gray-500">{post.author.location}</p>
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
                <p className="text-gray-700">
                  {post.cause}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">How your money will be used</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  {post.donationUsage}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
