'use server'
import { Suspense } from "react"
import DashboardContent from "./DashboardContent"

async function getPosts() {
  const res = await fetch(`http://localhost:5000/api/donation`, {
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

export default async function Page() {
  const donation = await getPosts()
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent initialPosts={donation} />
    </Suspense>
  )
}

