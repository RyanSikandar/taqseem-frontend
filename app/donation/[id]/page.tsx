'use server'

import { Suspense } from "react"
import DonationPage from "@/components/home/individual-donation-card"

// Fetch donation data
async function getDonation(id: string) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!backendUrl) {
        throw new Error("Backend URL is not defined");
    }

    const res = await fetch(`${backendUrl}/api/donation/${id}`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch data for ID: ${id}`);
    }

    const data = await res.json();
    console.log(data);
    return data.singleDonation;
}

export default async function Page({ params }: { params: { id: string } }) {
    if (!params?.id) {
        return <div>Invalid ID</div>;
    }

    let donation;

    try {
        donation = await getDonation(params.id);
    } catch (error: any) {
        return <div>{error.message}</div>;
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DonationPage post={donation} />
        </Suspense>
    );
}
