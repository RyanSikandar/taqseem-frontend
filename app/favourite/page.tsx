"use client"

import React from "react"
import { Heart, Calendar, DollarSign } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useFavourites } from "@/context/favourites-context"
import { useRouter } from "next/navigation"

export default function FavoriteDonations() {
    const { favourites } = useFavourites();
    const router = useRouter();
    return (
        <div className="min-h-screen bg-gray-50 py-8 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Your Favorites all here !</h1>
                    <p className="mt-2 text-sm text-gray-600">Projects you've shown interest in supporting</p>
                </header>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {favourites.length == 0 ?

                        (
                            <div className="flex flex-col items-center justify-center h-[50vh] ">
                                <Heart className="h-12 w-12 text-[#F7AB0A]" />
                                <h2 className="text-lg font-semibold mt-4">No favourites yet</h2>
                                <p className="text-sm text-gray-600 text-center mt-2">You haven't added any projects to your favourites yet. Click on the heart icon to add a project to your favourites.</p>
                            </div>
                        )
                        : (favourites.map((donation) => (
                            <Card key={donation._id} className="overflow-hidden">
                                <CardHeader className="p-0">
                                    <div className="relative h-48 w-full">
                                        <img
                                            src={donation.image[0] || "/placeholder.svg"}
                                            alt={donation.title}
                                            className="w-full h-full object-contain"
                                        />
                                        <div className="absolute top-2 right-2">
                                            <Button size="icon" variant="secondary" className="rounded-full bg-white">
                                                <Heart className="h-4 w-4 text-[#F7AB0A]" fill="#F7AB0A" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <CardTitle className="text-xl font-semibold mb-2">{donation.title}</CardTitle>
                                    <p className="text-sm text-gray-600 mb-4">{donation.description}</p>
                                    <Progress value={(donation.currentAmount / donation.targetAmount) * 100} className="mb-2 [&>*]:bg-[#F7AB0A]/80" />
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Rs. {donation.currentAmount}</span>
                                        <span>Rs. {donation.targetAmount}</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        <span>{donation.daysLeft} days left</span>
                                    </div>
                                    <Button className="bg-black hover:bg-[#F7AB0A] text-white" onClick={() => router.push(`/donation/${donation._id}`)}>Donate Now</Button>
                                </CardFooter>
                            </Card>
                        )))}
                </div>
            </div>
        </div>
    )
}

