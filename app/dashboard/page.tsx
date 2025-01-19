'use client'

import { useState } from 'react'
import { Header } from '@/components/ui/header'
import { DonationCard } from '@/components/ui/donation-card'
import type { Post } from '@/types/post'

export default function Page() {
  const samplePosts: Post[] = [
    {
      id: '1',
      author: {
        name: 'Samantha',
        location: 'Chennai, Tamilnadu',
        avatar: '/assets/images/avatar.png',
      },
      image: '/assets/images/needy.webp',
      title: 'Need donation for school renovation',
      description: 'With your help, we aim to create a modern and comfortable learning environment that fosters creativity, innovation, and excellence in education. The impact of your contribution will extend beyond the walls of our school.',
      currentAmount: 3000,
      targetAmount: 7000,
      daysLeft: 1,
    },
    {
      id: '2',
      author: {
        name: 'Ramkumar',
        location: 'Madurai, Tamilnadu',
        avatar: '/assets/images/avatar2.png',
      },
      image: '/assets/images/community-center.webp',
      title: 'Support our community center expansion',
      description: 'Help us expand our community center to provide more services and programs for our local residents. Your contribution will make a significant impact on the lives of many in our community.',
      currentAmount: 5000,
      targetAmount: 10000,
      daysLeft: 3,
    }
  ]

  const handleDonate = () => {
    console.log('Donate clicked')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8 sm:py-12">
          {/* Grid Container */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {samplePosts.map(post => (
              <div key={post.id} className="flex">
                <DonationCard post={post} onDonate={handleDonate} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}