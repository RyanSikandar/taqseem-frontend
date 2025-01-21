import { SideMenu } from "@/components/home/SideMenu";

const donationPageLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="bg-gray-50 justify-center w-full">
                <SideMenu />
            </div>
            {children}
        </>
    );
};

export default donationPageLayout;
