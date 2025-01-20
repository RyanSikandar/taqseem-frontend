'use client'

import { DonationCard } from '@/components/ui/donation-card'
import { samplePosts } from '@/data/samplePosts'

export default function Page() {

  const handleDonate = () => {
    console.log('Donate clicked')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8 sm:py-12">
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