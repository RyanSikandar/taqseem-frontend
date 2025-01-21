import { SideMenu } from "@/components/home/SideMenu";

const addDonationLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="bg-gray-50 justify-center w-full">

                <SideMenu />
            </div>
            {children}
        </>
    );
};

export default addDonationLayout;
