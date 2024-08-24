import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import classes from "./styles.module.scss";
import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import CounterCard from "@/components/counter-card/counter-card";
import ResponsiveTabs from "@/components/tabs/tabs.component";
import RevenueChart from "@/pages/employees/employee-card/components/chart";
import { ContentCut, HomeOutlined, ExitToApp, CalendarMonthOutlined } from "@mui/icons-material";
import { ICardInfoEmployee } from "@/ts/employee.interface";
import { useLocation } from "react-router-dom";

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
}

const InfoHeader: React.FC<InfoHeaderProps> = ({
  tabsData,
  nameData,
  counterCardData,
}) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    const currentPath = location.pathname;
    const tabIndex = tabsData.findIndex(tab => tab.to === currentPath);
    setActiveTab(tabIndex !== -1 ? tabIndex : 0);
  }, [location.pathname, tabsData]);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

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
          <ResponsiveTabs
            tabsData={tabsData}
            currentTab={activeTab}
            onTabChange={handleTabChange}
          />
          <div className={classes["main__header__upper__row"]}>
            <Grid container xl={12} sx={{ gap: "0.8rem" }}>
              <div className={classes["main__header__upper__row__cards"]}>
                <CounterCard
                  backgroundColor={
                    activeTab === 0
                      ? "rgba(76, 175, 80, 0.3)"
                      : "rgba(76, 175, 80, 0.1)"
                  }
                  icon={<ContentCut />}
                  iconColor="var(--success-main)"
                  textTitle="Выручка за все время"
                  valueText={
                    counterCardData?.revenue ? counterCardData.revenue : "0"
                  }
                />
                <CounterCard
                  backgroundColor={
                    activeTab === 1
                      ? "rgba(33, 150, 243, 0.3)"
                      : "rgba(33, 150, 243, 0.1)"
                  }
                  icon={<ExitToApp />}
                  iconColor="var(--primary-main)"
                  textTitle="Обслуженные посещения"
                  valueText={
                    counterCardData?.services_count
                      ? counterCardData?.services_count.toString()
                      : "0"
                  }
                />

                <CounterCard
                  backgroundColor={
                    activeTab === 2
                      ? "rgba(156,39,176, 0.3)"
                      : "rgba(156,39,176, 0.1)"
                  }
                  icon={<CalendarMonthOutlined />}
                  iconColor="var(--secondary-main)"
                  textTitle="Является сотрудником"
                  valueText="8 месяцев 3 дня"
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
