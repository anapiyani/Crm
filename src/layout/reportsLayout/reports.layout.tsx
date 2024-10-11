import ReportsDrawer from "@/components/navigation/drawer_reports/reportsDrawer.component";
import { Outlet } from "react-router-dom";
import classes from "./styles.module.scss";
import { useState } from "react";

const ReportsLayout = () => {
  const [isReportsDrawerOpen, setReportsDrawerOpen] = useState(false);

  const toggleReportsDrawer = () => {
    setReportsDrawerOpen(!isReportsDrawerOpen);
  };

  return (
    <div className={classes["layout"]}>
      <div className={classes["layout__sidebar"]}>
        <ReportsDrawer
          isOpen={isReportsDrawerOpen}
          handleClose={toggleReportsDrawer}
        />
      </div>
      <div className={classes["layout__main"]}>
        <Outlet />
      </div>
    </div>
  );
};

export default ReportsLayout;
