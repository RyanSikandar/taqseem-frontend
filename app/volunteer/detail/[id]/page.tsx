import VolunteerDetails from "@/components/home/VolunteerDetails"

export default function VolunteerDetailsPage({ params }: { params: { id: string } }) {
  return <VolunteerDetails id={params.id} />
}
