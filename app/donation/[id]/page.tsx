'use client'
import { DonationCard } from '@/components/home/donation-card';
import DonationPage from '@/components/home/individual-donation-card';
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
    const { id } = useParams();
    const samplePost = {
        id: '1',
        author: {
            name: 'Rayan Sikandar',
            location: 'Islamabad, Pakistan',
            avatar: '/assets/images/avatar.png',
        },
        image: ['/assets/images/needy.webp', '/assets/images/needy.webp', '/assets/images/needy.webp'],
        title: 'Need donation for school renovation',
        description: 'With your help, we aim to create a modern and comfortable learning environment that fosters creativity, innovation, and excellence in education. The impact of your contribution will extend beyond the walls of our school.',
        currentAmount: 1000,
        targetAmount: 7000,
        daysLeft: 1,
        IBAN: 'PK36SCBL0000001123456702',
        BankName: 'Standard Chartered Bank',
        AccountTitle: 'Rayan Sikandar'
    };

    return (
        <DonationPage post={samplePost} />
    )
}

export default page