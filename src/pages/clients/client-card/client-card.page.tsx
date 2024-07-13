import React from "react";
import TableVertical from "@/components/tables/tableVertical/vertical-info-card";
import TableHorizontal from "@/components/tables/table-horizontal/horizontal-info-card";
import Grid from "@mui/material/Unstable_Grid2";
import classes from "./styles.module.scss";
import InfoHeader from "@/components/navigation/header/info-header";
import {
  mainTableData,
  additionalInfoTableData,
  discountsTableData,
  financeTableData,
  contactsTableData,
  commentsTableData,
  addressData,
  clientNameData,
  clientTabsData,
} from "./data";

const ClientCard = () => {
  return (
    <div className={classes["main"]}>
      <InfoHeader tabsData={clientTabsData} nameData={clientNameData} />
      <Grid
        container
        sx={{
          mb: "5rem",
          ml: { xs: "2rem", xl: "7.6rem" },
          flexDirection: { xs: "column", md: "row" },
        }}
        columnGap={3}
        rowGap={{ xs: 3 }}
        xs={9}
        md={12}
      >
        <Grid
          container
          lg={5}
          md={5}
          xl={3.2}
          sx={{ alignItems: "flex-start" }}
          rowGap={3}
        >
          <TableVertical data={mainTableData} title="Главное" includeDropdown />
          <TableVertical
            data={additionalInfoTableData}
            title="Доп. информация"
          />
        </Grid>

        <Grid
          container
          xl={3.2}
          rowGap={{ xs: 3 }}
          sx={{ flexDirection: "column" }}
        >
          <TableVertical data={discountsTableData} title="Скидки" />
          <TableVertical data={financeTableData} title="Финансы" />
          <TableHorizontal data={contactsTableData} title="Контакты" />
          <TableHorizontal
            data={commentsTableData}
            title="Комментарии"
            hasTableHead={false}
            showEyeIcon
          />
        </Grid>

        <Grid container xl={3.8} sx={{ flexDirection: "column" }} rowGap={3}>
          <TableVertical data={addressData} title="Адрес проживания" />
        </Grid>
      </Grid>
    </div>
  );
};

export default ClientCard;
