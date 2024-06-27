import { TopBar } from "@/components/";
import ResponsiveDrawer from "@/components/navigation/drawer/drawer.component";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <TopBar />
      <ResponsiveDrawer />
      <Outlet />
    </div>
  );
};

export default MainLayout;
