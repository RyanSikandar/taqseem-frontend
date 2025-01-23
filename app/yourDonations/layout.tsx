import Navbar from "@/components/home/Navbar";
import { NavigationProvider } from "@/context/navigation-context";

const donationPageLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <NavigationProvider>
                <div className="h-screen bg-white">
                    <Navbar showActionButtons={false} showSearchBar={false} />
                    <main>
                        {children}
                    </main>
                </div>
            </NavigationProvider>
        </>
    );
};

export default donationPageLayout;
