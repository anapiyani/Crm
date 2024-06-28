import { TopBar } from "@/components/";
import ResponsiveDrawer from "@/components/navigation/drawer/drawer.component";
import { Outlet } from "react-router-dom";
import classes from "./styles.module.scss";

const MainLayout = () => {
  return (
    <div className={classes["layout"]}>
      <div className={classes["layout__sidebar"]}>
        <ResponsiveDrawer />
      </div>
      <div className={classes["layout__main"]}>
        <TopBar />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
