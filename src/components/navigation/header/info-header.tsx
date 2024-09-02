import React from "react";
import { Box, Grid } from "@mui/material";
import classes from "./styles.module.scss";
import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import CounterCard from "@/components/counter-card/counter-card";
import ResponsiveTabs from "@/components/tabs/tabs.component";
import RevenueChart from "@/pages/employees/employee-card/components/chart";
import { HomeOutlined } from "@mui/icons-material";
import { ICardInfoEmployee } from "@/ts/employee.interface";

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
  counterCardData?: ICardInfoEmployee;
  startedWork?: string;
}

const InfoHeader: React.FC<InfoHeaderProps> = ({
  tabsData,
  nameData,
  counterCardData,
  startedWork,
}) => {
  return (
    <div className={classes["main__header"]}>
      <Box sx={{ ml: { xs: "2rem", xl: "7.6rem" } }}>
        <div className={classes["main__header__upper"]}>
          <div>
            <BreadcrumbsCustom name={nameData.name} />
            <h1 className={classes["main__header__upper__title"]}>
              {nameData.name}
            </h1>
          </div>
          <ResponsiveTabs tabsData={tabsData} />
          <div className={classes["main__header__upper__row"]}>
            <Grid container xl={12} sx={{ gap: "0.8rem" }}>
              <div className={classes["main__header__upper__row__cards"]}>
                <CounterCard
                  backgroundColor="rgba(76, 175, 80, 0.3)"
                  icon={<HomeOutlined />}
                  iconColor="var(--success-main)"
                  textTitle="Выручка за все время"
                  valueText={
                    counterCardData?.revenue ? counterCardData.revenue : "0"
                  }
                />
                <CounterCard
                  backgroundColor="rgba(33, 150, 243, 0.3)"
                  icon={<HomeOutlined />}
                  iconColor="var(--primary-main)"
                  textTitle="Обслуженные посещения"
                  valueText={
                    counterCardData?.services_count
                      ? counterCardData?.services_count.toString()
                      : "0"
                  }
                />

                <CounterCard
                  backgroundColor="rgba(156,39,176, 0.3)"
                  icon={<HomeOutlined />}
                  iconColor="var(--secondary-main)"
                  textTitle="Является сотрудником"
                  valueText={startedWork ? startedWork : "Дата не указана"}
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
