import Login from "./(auth)/login/page";

export default function Home() {
  return (
    <main className="flex flex-col items-center space-y-24">
      <Login />
    </main>
  );
}