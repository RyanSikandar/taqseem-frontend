"use client"

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Donation } from "@/types";

interface DonationProps {
  id: string;
  donation: Donation;
}

interface DonationRecord {
  _id: string;
  donation: string;
  donor: {
    _id: string;
    name: string;
    image: string;
    location: string;
  };
  amount: number;
  verified: boolean;
}

// Fetch donations for the table
async function fetchDonations(donationId: string): Promise<DonationRecord[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/donation/${donationId}/contributions`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch donations");
  }
  const data = await response.json();
  return data.contributions;
}

// Verify a donation record
async function verifyDonation(contributionId: string): Promise<void> {
  console.log("Verifying donation", contributionId);
  const body = { id: contributionId };
  console.log("Body", body);
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/donation/contribution/verify`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error("Failed to verify donation");
  }
}

export default function DonationDetails({ id, donation }: DonationProps) {
  const queryClient = useQueryClient();

  // Fetch donations for the table
  const { data: latestDonations, isLoading, isError } = useQuery({
    queryKey: ["donations", id], // Unique key for this query
    queryFn: () => fetchDonations(id),
    staleTime: 1000 * 60 * 5, 
  });

  // Mutation for verifying a donation
  const verifyMutation = useMutation({
    mutationFn: verifyDonation,
    onSuccess: () => {
      // Invalidate and refetch the donations query after successful verification
      queryClient.invalidateQueries({ queryKey: ["donations", id] });
    },
  });

  const handleVerify = (donationId: string) => {
    verifyMutation.mutate(donationId);
  };

  if (isLoading) {
    return <div>Loading donations...</div>;
  }

  if (isError) {
    return <div>Failed to load donations.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={donation.author.image} alt={donation.author.name} />
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
                className="w-full h-64 object-contain rounded-lg"
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
                  {latestDonations?.map((d) => (
                    <TableRow key={d._id}>
                      <TableCell>{d.donor.name}</TableCell>
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
                          <Button size="sm" variant="outline" onClick={() => handleVerify(d._id)}>
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
  );
}