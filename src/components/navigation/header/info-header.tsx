import React from "react";
import { Box, Grid } from "@mui/material";
import classes from "./styles.module.scss";
import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import CounterCard from "@/components/counter-card/counter-card";
import ResponsiveTabs from "@/components/tabs/tabs.component";
import RevenueChart from "@/pages/employees/employee-card/components/chart";
import {
  HomeOutlined,
} from "@mui/icons-material";

interface TabData {
  to: string;
  icon: typeof HomeOutlined;
  label: string;
}

interface NameData {
    name: string;
}

interface InfoHeaderProps {
  tabsData: TabData[];
  nameData: NameData;
}

const InfoHeader: React.FC<InfoHeaderProps> = ({ tabsData, nameData }) => {
  return (
    <div className={classes["main__header"]}>
      <Box sx={{ ml: { xs: "2rem", xl: "7.6rem" } }}>
        <div className={classes["main__header__upper"]}>
          <div>
            <BreadcrumbsCustom />
            <h1 className={classes["main__header__upper__title"]}>
              {nameData.name}
            </h1>
          </div>
          <ResponsiveTabs tabsData={tabsData} />
          <div className={classes["main__header__upper__row"]}>
            <Grid container xl={12} md={12} xs={9} sx={{ gap: "0.8rem" }}>
              <div className={classes["main__header__upper__row__cards"]}>
                <CounterCard
                  backgroundColor="rgba(76, 175, 80, 0.3)"
                  iconColor="var(--success-main)"
                  textTitle="Выручка за все время"
                  valueText="796 540 руб."
                />
                <CounterCard
                  backgroundColor="rgba(33, 150, 243, 0.3)"
                  iconColor="var(--primary-main)"
                  textTitle="Обслуженные посещения"
                  valueText="141"
                />

                <CounterCard
                  backgroundColor="rgba(156,39,176, 0.3)"
                  iconColor="var(--secondary-main)"
                  textTitle="Является сотрудником"
                  valueText="8 месяцев 20 дней"
                />
              </div>
              <RevenueChart />
            </Grid>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default InfoHeader;
