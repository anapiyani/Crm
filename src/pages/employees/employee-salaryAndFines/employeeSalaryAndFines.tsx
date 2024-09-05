import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import classes from "./styles.module.scss";
import { employeeTabsData } from "@/pages/employees/employee-card/data";
import FinesHeader from "./_components/finesHeader/finesHeader";
import SalaryTable from "./_components/bonusesTable/tableBonuses";
import { salaryData } from "./_components/bonusesTable/data";

const EmployeeFines = () => {
  return (
    <div className={classes["main"]}>
      <FinesHeader
        tabsData={employeeTabsData}
        nameData={{
          name: "Yesset Yedres",
        }}
      />
      <Grid
        container
        sx={{
          mb: "5rem",
          ml: { xs: "2rem", xl: "7.6rem" },
        }}
        xs={9}
        md={10.5}
      >
        <SalaryTable
          onDeleteWalletHostry={(id: number) => console.log(id)}
          data={salaryData}
        />
      </Grid>
    </div>
  );
};

export default EmployeeFines;
