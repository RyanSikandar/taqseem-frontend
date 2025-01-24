import { redirect } from "next/navigation";
import Hero from "@/components/home/Hero";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";

export default async function Home() {

  const session = await getServerSession(options);

  // If authenticated, redirect to the dashboard
  if (session) {
    redirect("/dashboard");
    return null;
  }

  // If not authenticated, render the Hero component
  return (
    <main className="flex flex-col items-center space-y-24 bg-gray-50 h-screen dotted">
      <Hero />
    </main>
  );
}
