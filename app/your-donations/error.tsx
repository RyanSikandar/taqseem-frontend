"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <AlertTriangle className="mx-auto h-24 w-24 text-[#F7AB0A]" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Oops! Something went wrong</h2>
        <p className="mt-2 text-sm text-gray-600">
          We apologize for the inconvenience. An error occurred while processing your request.
        </p>
        <div className="mt-5 space-y-4">
          <Button onClick={() => reset()} className="w-full bg-black hover:bg-gray-800 text-white">
            Try again
          </Button>
          <Link href="/" passHref>
            <Button
              variant="outline"
              className="w-full border-[#F7AB0A] text-[#F7AB0A] hover:bg-[#F7AB0A] hover:text-white mt-2"
            >
              Return to Home
            </Button>
          </Link>
        </div>
        {process.env.NODE_ENV === "development" && (
          <div className="mt-4 text-xs text-gray-500 bg-gray-100 p-4 rounded-md">
            <p className="font-semibold">Error details (visible in development only):</p>
            <p className="mt-1">{error.message}</p>
          </div>
        )}
      </div>
    </div>
  )
}

