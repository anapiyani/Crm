import Tabs from "@/components/tabs/tabs.component";
import { HomeOutlined, ExitToAppOutlined, AccountBalanceWalletOutlined, WarningAmberOutlined, CalendarMonthOutlined } from "@mui/icons-material";
import React from 'react';

interface TabData {
  to: string;
  icon: typeof HomeOutlined;
  label: string;
}

const EmployeeSearch: React.FC = () => {
  const tabsData: TabData[] = [
    { to: "/employees", icon: HomeOutlined, label: "Обзор" },
    { to: "/employees/visit", icon: ExitToAppOutlined, label: "Посещения" },
    { to: "/employees/balance", icon: AccountBalanceWalletOutlined, label: "Зарплата, штрафы, премии, авансы" },
    { to: "/employees/reviews", icon: WarningAmberOutlined, label: "Отзывы / жалобы" },
    { to: "/employees/work-schedule", icon: CalendarMonthOutlined, label: "график работы" }
  ];

  return (
    <div>
      <Tabs tabsData={tabsData} />
    </div>
  );
};

export default EmployeeSearch;
