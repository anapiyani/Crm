import { TopBar } from "@/components/";
import ResponsiveDrawer from "@/components/navigation/drawer/drawer.component";
import { Outlet } from "react-router-dom";
import classes from "./styles.module.scss";
import { useState } from "react";

const MainLayout = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const openMenuBar = () => {
    if (isOpenMenu) {
      setIsOpenMenu(false);
    } else {
      setIsOpenMenu(true);
    }
  };

  const handleCloseModal = () => {
    setIsOpenMenu(false);
  };
  return (
    <div className={classes["layout"]}>
      <div className={classes["layout__sidebar"]}>
        <ResponsiveDrawer handleClose={handleCloseModal} isOpen={isOpenMenu} />
      </div>
      <div className={classes["layout__main"]}>
        <TopBar mobileOpen={isOpenMenu} openMenuBar={openMenuBar} />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
