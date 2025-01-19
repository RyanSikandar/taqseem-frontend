import Practise from "@/components/home/Practise";
import Page2 from "@/components/home/page2";
import Login from "./(auth)/login/page";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center space-y-24">
      <Login />
    </main>
  );
}
