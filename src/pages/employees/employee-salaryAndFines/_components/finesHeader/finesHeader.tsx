import React, { useEffect, useState } from "react";
import { Box, Grid, Button } from "@mui/material";
import classes from "./styles.module.scss";
import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import CounterCard from "@/components/counter-card/counter-card";
import ResponsiveTabs from "@/components/tabs/tabs.component";
import {
  PollOutlined,
  GroupsOutlined,
  HomeOutlined,
  PersonOutlined,
  PushPinOutlined,
  ShoppingCartOutlined,
  Edit,
} from "@mui/icons-material";
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

const FinesHeader: React.FC<InfoHeaderProps> = ({
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
      <Box sx={{ ml: { xs: "2rem", xl: "7.6rem" }, position: "relative" }}>
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
              <div className={classes["main__header__upper__row__button"]}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    fontSize: "1.4rem",
                    height: "4rem",
                    textTransform: "none",
                  }}
                  startIcon={<Edit />}
                >
                  Настроить зарплату
                </Button>
              </div>
              <div className={classes["main__header__upper__row__cards"]}>
                <CounterCard
                  backgroundColor="#ECEFF1"
                  icon={<PushPinOutlined />}
                  iconColor="#607D8B"
                  textTitle="Фикс. часть"
                  valueText="За смену"
                  textTitleFocus="0 руб."
                />
                <CounterCard
                  backgroundColor="rgba(33, 150, 243, 0.3)"
                  icon={<PollOutlined />}
                  iconColor="var(--primary-main)"
                  textTitle="Плав. часть"
                  valueText="От выручки"
                  textTitleFocus="0%"
                />

                <CounterCard
                  backgroundColor="rgba(76, 175, 80, 0.3)"
                  icon={<ShoppingCartOutlined />}
                  iconColor="var(--success-main)"
                  textTitle="Прод. товаров"
                  valueText="От продаж"
                  textTitleFocus="0%"
                />
                <CounterCard
                  backgroundColor="rgba(33, 150, 243, 0.3)"
                  icon={<GroupsOutlined />}
                  iconColor="var(--primary-main)"
                  textTitle="Привл. клиентов"
                  valueText="За клиента"
                  textTitleFocus="0 руб."
                />
                <CounterCard
                  backgroundColor="rgba(156, 39, 176, 0.3)"
                  icon={<PersonOutlined />}
                  iconColor="var(--secondary-main)"
                  textTitle="Развитие клиентов"
                  valueText="От продаж"
                  textTitleFocus="0 руб."
                />
              </div>
            </Grid>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default FinesHeader;
