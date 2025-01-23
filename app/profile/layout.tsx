import Navbar from "@/components/home/Navbar";
import { NavigationProvider } from "@/context/navigation-context";

type LayoutProps = {
    children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <NavigationProvider>
        <div className="min-h-screen bg-white">
            <Navbar showActionButtons={false} showSearchBar={false}/>
            <main>
                {children}
            </main>
        </div>
        </NavigationProvider>
    );
}