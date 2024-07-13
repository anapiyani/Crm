import React from "react";

import TableVertical from "@/components/tables/tableVertical/vertical-info-card";
import TableHorizontal from "@/components/tables/table-horizontal/horizontal-info-card";
import Grid from "@mui/material/Unstable_Grid2";
import classes from "./styles.module.scss";
import InfoHeader from "@/components/navigation/header/info-header";
import {
  mainTableData,
  additionalTableData,
  contactsData,
  addressData,
  employeeTabsData,
  employeeNameData,
} from "./data";

const EmployeeCard = () => {
  return (
    <div className={classes["main"]}>
      <InfoHeader tabsData={employeeTabsData} nameData={employeeNameData} />
      <Grid
        container
        sx={{
          mb: "5rem",
          ml: { xs: "2rem", xl: "7.6rem" },
          flexDirection: { xs: "column", md: "row" },
        }}
        columnSpacing={{ md: 6 }}
        rowGap={{ xs: 3, md: 0 }}
        xs={9}
        md={12}
      >
        <Grid
          container
          lg={5}
          md={5}
          xl={3.5}
          sx={{ alignItems: "flex-start" }}
        >
          <TableVertical data={mainTableData} title="Главное" showLockIcon />
        </Grid>

        <Grid
          container
          xl={7}
          lg={5}
          md={6}
          sx={{ flexDirection: { xs: "column", xl: "row" } }}
          columnSpacing={{ md: 0, xl: 6 }}
          rowGap={{ xs: 3, xl: 0 }}
        >
          <Grid xl={6}>
            <TableVertical data={additionalTableData} title="Доп. информация" />
          </Grid>

          <Grid container xl={6} sx={{ flexDirection: "column" }} rowGap={3}>
            <TableHorizontal data={contactsData} title="Контакты" />
            <TableVertical data={addressData} title="Адрес проживания" />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default EmployeeCard;
