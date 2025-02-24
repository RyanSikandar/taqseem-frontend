'use server'
import DonationDetails from "@/components/home/DonationDetails";

async function getDonation(id: string) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!backendUrl) {
    throw new Error("Backend URL is not defined");
  }

  const res = await fetch(`${backendUrl}/api/donation/${id}`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include"
  });

  if (!res.ok) {
    return "There was an error"
  }

  const data = await res.json();
  console.log(data);
  return data.singleDonation;
}

export default async function DonationDetailsPage({ params }: { params: { id: string } }) {
  const donation = await getDonation(params.id)
  return (<DonationDetails id={params.id} donation={donation} />)
}
