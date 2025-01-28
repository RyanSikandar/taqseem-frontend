'use client'

import { useState, useEffect } from 'react'
import { DonationCard } from '@/components/home/donation-card'
import { samplePosts } from '@/data/samplePosts'
import { sampleVolunteerPosts } from '@/data/sampleVolunteers'
import { VolunteerCard } from '@/components/home/volunteer-card'
import useNavbarStore from '@/store/useNavbarStore'
import { Donation, Post } from '@/types'

interface DashboardContentProps {
    initialPosts: Donation[]
  }

export default function DashboardContent({ initialPosts }: DashboardContentProps) {
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

                (initialPosts.map(post => (
                  <div key={post._id} className="flex">
                    <DonationCard post={post} onDonate={() => handleDonate(post._id)} />
                  </div>
                ))) :
                (
                  sampleVolunteerPosts.map(post => (
                    <div key={post.id} className="flex">
                      <VolunteerCard post={post} onVolunteer={() => handleVolunteer(post.id)} />
                    </div>
                  ))
                )}

          </div>
        </div>
      </div>
    </div>
  )
}