'use client'

import { useState } from 'react'
import Image from "next/image"
import { Heart, Share2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Post } from '@/types/post'

interface VolunteerCardProps {
  post: Post;
  onVolunteer: () => void;
}

export function VolunteerCard({ post, onVolunteer }: VolunteerCardProps) {
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

  // Calculate the progress percentage
  const progressPercentage = (post.currentAmount / post.targetAmount) * 100

  return (
    <Card className="border shadow-md max-w-sm mx-auto">
      <div className="relative rounded-lg overflow-hidden h-48">
        <Image
          src={post.image[0] || "/placeholder.svg"}
          alt={post.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <CardContent className="p-4 space-y-3">
        <div className="space-y-2">
          <h2 className="text-base font-semibold">{post.title}</h2>
          <p className="text-xs text-muted-foreground line-clamp-2">{post.description}</p>

          <div className="space-y-2">
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <span className="font-semibold">{post.currentAmount}</span>
                <span className="text-muted-foreground">/ {post.targetAmount} People</span>
              </div>
              <span className="text-muted-foreground">{post.daysLeft} days left</span>
            </div>
          </div>
        </div>
        <Button
          className="w-full bg-black hover:bg-[#F7AB0A] text-sm py-1"
          onClick={onVolunteer}
        >
          Volunteer
        </Button>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={post.author.avatar || "/placeholder.svg"}
                alt={`${post.author.name}'s profile picture`}
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold">{post.author.name}</h3>
              <p className="text-xs text-muted-foreground">{post.author.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleLike}>
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 stroke-red-500' : ''}`} />
            </button>
            <button onClick={handleShare}>
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

