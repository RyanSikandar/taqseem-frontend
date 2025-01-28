'use server'

import { Suspense } from "react";
import ProfilePage from "./ProfileData";
import { cookies } from "next/headers";

async function getProfile() {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!backendUrl) {
        throw new Error("Backend URL is not defined");
    }

    const tokenCookie = cookies().get('token'); 

    if (!tokenCookie?.value) {
        throw new Error("Authentication token not found in cookies");
    }

    const res = await fetch(`${backendUrl}/api/auth/user`, {
        method: 'GET',
        cache: 'force-cache',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${tokenCookie.value}`, 
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.statusText}`);
    }
    const data = await res.json();
    console.log(data);
    return data;
}

export default async function Page() {
    let profile;

    try {
        profile = await getProfile();
    } catch (error: any) {
        console.error(error.message);
        return <div>Error: {error.message}</div>;
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProfilePage profileData={profile} />
        </Suspense>
    );
}
