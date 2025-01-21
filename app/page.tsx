import Hero from "@/components/home/Hero";
import Login from "./(auth)/login/page";

export default function Home() {
  return (
    <main className="flex flex-col items-center space-y-24 bg-gray-50 h-screen">
      <Hero />
    </main>
  );
}