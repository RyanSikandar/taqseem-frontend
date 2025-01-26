import Navbar from "@/components/home/Navbar";
import { SideMenu } from "@/components/home/SideMenu";
import { NavigationProvider } from "@/context/navigation-context";

const addVolunteerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavigationProvider>
      <div className="min-h-screen bg-white">
        <Navbar showActionButtons={false} showSearchBar={false} />
        <main>{children}</main>
      </div>
    </NavigationProvider>
  );
};

export default addVolunteerLayout;
