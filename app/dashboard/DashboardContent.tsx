'use client'

import { useState, useEffect } from 'react'
import { DonationCard } from '@/components/home/donation-card'
import { samplePosts } from '@/data/samplePosts'
import { sampleVolunteerPosts } from '@/data/sampleVolunteers'
import { VolunteerCard } from '@/components/home/volunteer-card'
import useNavbarStore from '@/store/useNavbarStore'
import { Donation, Volunteer } from '@/types'

interface DashboardContentProps {
    donations: Donation[]
    volunteers: Volunteer[]
}

export default function DashboardContent({ donations, volunteers }: DashboardContentProps) {
  const { button, isHydrated } = useNavbarStore();

  // check consistency when actual data returned by api calls is used from here
  const [hydrationComplete, setHydrationComplete] = useState(false);

  useEffect(() => {
    setHydrationComplete(isHydrated());
  }, [isHydrated]);

  if (!hydrationComplete) {
    return null;
  }
  // till here because in that case a loading icon would be used during loading time

  const handleDonate = (id: string) => {
    // Handle donation
    console.log(id)
  }
  const handleVolunteer = (id: string) => {
    console.log(id)
    // Handle volunteer
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8 sm:py-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {
              button === 'donate' ?

                (donations.map(donation => (
                  <div key={donation._id} className="flex">
                    <DonationCard post={donation} onDonate={() => handleDonate(donation._id)} />
                  </div>
                ))) :
                (
                  volunteers.map(volunteer => (
                    <div key={volunteer._id} className="flex">
                      <VolunteerCard post={volunteer} onVolunteer={() => handleVolunteer(volunteer._id)} />
                    </div>
                  ))
                )}

          </div>
        </div>
      </div>
    </div>
  )
}