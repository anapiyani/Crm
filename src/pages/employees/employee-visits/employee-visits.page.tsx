import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import classes from "./styles.module.scss";
import InfoHeader from "@/components/navigation/header/info-header";
import {
  employeeTabsData,
  employeeNameData,
} from "@/pages/employees/employee-card/data";
import { data } from "@/pages/employees/employee-visits/data";
import EmployeeVisitsTable from "./visits-table/employee-visits-table";

const EmployeeVisits = () => {
  return (
    <div className={classes["main"]}>
      <InfoHeader tabsData={employeeTabsData} nameData={{
        name: "123"
      }} />
      <Grid
        container
        sx={{
          mb: "5rem",
          ml: { xs: "2rem", xl: "7.6rem" },
        }}
        xs={9}
        md={10.5}
      >
        <EmployeeVisitsTable data={data} />
      </Grid>
    </div>
  );
};

export default EmployeeVisits;
