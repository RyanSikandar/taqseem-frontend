'use client'

import { useState } from 'react'
import { Header } from '@/components/ui/header'
import { DonationCard } from '@/components/home/donation-card'
import type { Post } from '@/types/post'
import { samplePosts } from '@/data/samplePosts'
import { useNavigation } from '@/context/navigation-context'
import { sampleVolunteerPosts } from '@/data/sampleVolunteers'
import { VolunteerCard } from '@/components/home/volunteer-card'

export default function Page() {
  const { activeTab } = useNavigation();

  const handleDonate = (id: string) => {
    // Handle donation
    console.log(id)
  }
  const handleVolunteer = (id: string) => {
    console.log(id)
    // Handle
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8 sm:py-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {
              activeTab === 'donate' ?

                (samplePosts.map(post => (
                  <div key={post.id} className="flex">
                    <DonationCard post={post} onDonate={() => handleDonate(post.id)} />
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