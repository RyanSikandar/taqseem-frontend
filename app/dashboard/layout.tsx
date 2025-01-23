import Navbar from "@/components/home/Navbar";
import { NavigationProvider } from "@/context/navigation-context";

type LayoutProps = {
    children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <NavigationProvider>
            <div className="min-h-screen bg-white">
                <Navbar />
                <main className="pt-24 md:pt-20">
                    {children}
                </main>
            </div>
        </NavigationProvider>
    );
}