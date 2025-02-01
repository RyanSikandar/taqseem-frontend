'use client'

import { useState } from 'react'
import Image from "next/image"
import { Heart, Share2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Volunteer } from '@/types/post'
import { useRouter } from 'next/navigation'

interface VolunteerCardProps {
  post: Volunteer;
  onVolunteer: () => void;
}

export function VolunteerCard({ post, onVolunteer }: VolunteerCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const router = useRouter();

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
  const progressPercentage = (post.currentVolunteers / post.targetVolunteers) * 100

  return (
    <Card className="border shadow-md max-w-sm mx-auto w-full">
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
            <Progress value={progressPercentage} className="h-2 [&>*]:bg-[#F7AB0A]/80" />
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <span className="font-semibold">{post.currentVolunteers}</span>
                <span className="text-muted-foreground">/ {post.targetVolunteers} People</span>
              </div>
              <span className="text-muted-foreground">{post.daysLeft} days left</span>
            </div>
          </div>
        </div>
        <Button
          className="w-full bg-black hover:bg-[#F7AB0A] text-sm py-1"
          onClick={() => {
            router.push(`/volunteer/${post._id}`)
          }}
        >
          Volunteer
        </Button>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={post.author.image || "/placeholder.svg"}
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
            <button onClick={handleShare}>
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

