import DonationDetails from "@/components/home/DonationDetails";

export default function DonationDetailsPage({ params }: { params: { id: string } }) {
  return <DonationDetails id={params.id} />
}
