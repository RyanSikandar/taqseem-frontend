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
    return "There was an error"
  }
  const data = await res.json()
  console.log(data)
  return data.donations

}

export default async function DonationsPage() {

  const donations = await getUserDonations()
  return (
    <UserDonations donations={donations} />
  )
}
