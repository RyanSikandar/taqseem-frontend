'use server'
import { Suspense } from "react"
import DashboardContent from "./DashboardContent"

async function getDonations() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/donation`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  const data = await res.json()
  console.log(data)
  return data.donations
}

async function getVolunteers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/volunteer`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  const data = await res.json()
  console.log(data)
  return data.volunteers
}

export default async function Page() {
  const donation = await getDonations()
  const volunteer = await getVolunteers()
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent donations={donation} volunteers={volunteer} />
    </Suspense>
  )
}

