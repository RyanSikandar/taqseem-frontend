'use server'
import { Suspense } from "react"
import UserDonations from "@/components/home/UserDonations";
import { cookies } from "next/headers";


async function getUserDonations() {
  const tokenCookie = cookies().get('token')
  if (!tokenCookie?.value) {
    throw new Error("Authentication token not found in cookies")
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/donation/user-donations`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `token=${tokenCookie.value}`
    },
  })
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  const data = await res.json()
  return data.donations

}

export default async function DonationsPage() {

  const donations = await getUserDonations()
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserDonations donations={donations} />
    </Suspense>
  )
}
