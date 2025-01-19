'use client'

import { useState } from 'react'
import { Header } from '@/components/ui/header'
import { DonationCard } from '@/components/ui/donation-card'
import type { Post } from '@/types/post'

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const samplePost: Post = {
    id: '1',
    author: {
      name: 'Samantha',
      location: 'Chennai, Tamilnadu',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    image: '/assets/images/needy.webp',
    title: 'Need donation for school renovation',
    description: 'With your help, we aim to create a modern and comfortable learning environment that fosters creativity, innovation, and excellence in education. The impact of your contribution will extend beyond the walls of our school.',
    currentAmount: 3000,
    targetAmount: 7000,
    daysLeft: 1,
  }

  const handleDonate = () => {
    // Implement donation logic here
    console.log('Donate clicked')
  }

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="min-h-screen bg-white">
    
      {/* Main content */}
      <main className="pt-28 pb-6 px-4">
        <DonationCard 
          post={samplePost}
          onDonate={handleDonate}
        />
      </main>
    </div>
  )
}

