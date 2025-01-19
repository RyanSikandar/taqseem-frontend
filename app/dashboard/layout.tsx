import Navbar from "@/components/home/Navbar";

type LayoutProps = {
    children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="pt-16 md:pt-20">
                {children}
            </main>
        </div>
    );
}