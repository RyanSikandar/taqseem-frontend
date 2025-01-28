import Hero from "@/components/home/Hero";
import axios from "axios";
axios.defaults.fetchOptions = { credentials: "include" };
export default function Home() {
  return (
    <main className="flex flex-col items-center space-y-24 bg-gray-50 h-screen dotted">
      <Hero />
    </main>
  );
}