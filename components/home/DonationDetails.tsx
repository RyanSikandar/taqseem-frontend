"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check, X } from "lucide-react"

// This is a mock function. Replace it with actual data fetching logic.
const useDonationDetails = (id: string) => {
  // Mock data
  return {
    id: "1",
    author: {
      name: "Rayan Sikandar",
      location: "Islamabad, Pakistan",
      avatar: "/assets/images/avatar.png",
    },
    image: ["/assets/images/needy.webp", "/assets/images/needy.webp", "/assets/images/needy.webp"],
    title: "Need donation for school renovation",
    description:
      "With your help, we aim to create a modern and comfortable learning environment that fosters creativity, innovation, and excellence in education. The impact of your contribution will extend beyond the walls of our school.",
    currentAmount: 1000,
    targetAmount: 7000,
    daysLeft: 1,
    IBAN: "PK36SCBL0000001123456702",
    BankName: "Standard Chartered Bank",
    AccountTitle: "Rayan Sikandar",
    latestDonations: [
      { id: "1", name: "John Doe", amount: 100, verified: false },
      { id: "2", name: "Jane Smith", amount: 200, verified: true },
      { id: "3", name: "Alice Johnson", amount: 150, verified: false },
    ],
  }
}

export default function DonationDetails({ id }: { id: string }) {
  const donation = useDonationDetails(id)
  const [latestDonations, setLatestDonations] = useState(donation.latestDonations)

  const handleVerify = (donationId: string) => {
    setLatestDonations((prevDonations) =>
      prevDonations.map((d) => (d.id === donationId ? { ...d, verified: true } : d)),
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={donation.author.avatar} alt={donation.author.name} />
                <AvatarFallback>{donation.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{donation.title}</CardTitle>
                <p className="text-sm text-gray-500">
                  {donation.author.name} - {donation.author.location}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <img
                src={donation.image[0] || "/placeholder.svg"}
                alt={donation.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <p className="text-gray-700 mb-4">{donation.description}</p>
            <Progress
              value={(donation.currentAmount / donation.targetAmount) * 100}
              className="mb-2 [&>*]:bg-[#F7AB0A]/80"
            />
            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <span>Rs. {donation.currentAmount}</span>
              <span>Rs. {donation.targetAmount}</span>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <h3 className="font-semibold mb-2">Bank Details</h3>
              <p>IBAN: {donation.IBAN}</p>
              <p>Bank Name: {donation.BankName}</p>
              <p>Account Title: {donation.AccountTitle}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Latest Donations</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {latestDonations.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell>{d.name}</TableCell>
                      <TableCell>Rs. {d.amount}</TableCell>
                      <TableCell>
                        {d.verified ? (
                          <span className="text-green-600">Verified</span>
                        ) : (
                          <span className="text-yellow-600">Pending</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {!d.verified && (
                          <Button size="sm" variant="outline" onClick={() => handleVerify(d.id)}>
                            Verify
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

