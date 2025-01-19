'use client'

import { useState } from 'react'
import Image from "next/image"
import { Heart, Share2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Post } from '@/types/post'

interface DonationCardProps {
  post: Post;
  onDonate: () => void;
}

export function DonationCard({ post, onDonate }: DonationCardProps) {
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    }
  }

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="p-0 space-y-4">
        {/* User info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={post.author.avatar || "/placeholder.svg"}
                alt={`${post.author.name}'s profile picture`}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold">{post.author.name}</h3>
              <p className="text-sm text-muted-foreground">{post.author.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={handleLike}>
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 stroke-red-500' : ''}`} />
            </button>
            <button onClick={handleShare}>
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Post image */}
        <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
          <Image
            src={post.image || "/placeholder.svg"}
            alt="Campaign image"
            fill
            className="object-cover"
          />
        </div>

        {/* Post content */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">{post.title}</h2>
          <p className="text-sm text-muted-foreground">{post.description}</p>
          
          {/* Donation amounts */}
          <div className="flex items-center gap-4 py-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">₹{post.currentAmount}</span>
              <span className="text-sm text-muted-foreground">₹{post.targetAmount}</span>
            </div>
            <span className="text-sm text-muted-foreground">{post.daysLeft} days</span>
          </div>

          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={onDonate}
          >
            Donate
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

