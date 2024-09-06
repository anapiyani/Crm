import React from "react";
import {
  EmployeeAdd,
  EmployeeSearch,
  Home,
  CashDesk,
  Clients,
  ClientCard,
  SearchVisits,
  WorkSchedule,
  Department,
  ServiceCatalog,
  ServicePriceList,
  Rating,
  ClientAdd,
  StorageSettings,
  EmployeeCabinet,
  EmployeeVisits,
  SalaryPage,
  ClientSearch,
  IndirectCostsPage,
  ViewVisits,
  EmployeeFines,
  EmployeePage,
  StoragePage,
  AnalyticsPage,
  Report,
  DiscountPage,
} from "@/pages";

// import { Role } from "@/ts/types";

type IRoute = {
  name: string;
  path: string;
  component: React.ReactElement;
  // roles: Role[];
};

export const ROUTES: IRoute[] = [
  {
    name: "Home",
    path: "/",
    component: <Home />,
  },
  {
    name: "CashDesk",
    path: "/cashdesk",
    component: <CashDesk />,
  },

  {
    name: "Employee search",
    path: "/employees",
    component: <EmployeeSearch />,
  },
  {
    name: "Employee cabinet",
    path: "/employees/cabinet",
    component: <EmployeeCabinet />,
  },
  {
    name: "Customer add",
    path: "/employees/add",
    component: <EmployeeAdd />,
  },
  {
    name: "Inderect costs",
    path: "/cashdesk/indirect-costs",
    component: <IndirectCostsPage />,
  },
  {
    name: "Clients",
    path: "/clients",
    component: <ClientSearch />,
  },
  {
    name: "Client card",
    path: "/clients/client-card",
    component: <ClientCard />,
  },
  {
    name: "Search Visits",
    path: "/visits",
    component: <SearchVisits />,
  },
  {
    name: "Work schedule",
    path: "/employees/work-schedule",
    component: <WorkSchedule />,
  },
  {
    name: "Employee card",
    path: "employees/:id",
    component: <EmployeePage />,
  },
  {
    name: "Department",
    path: "/employees/department",
    component: <Department />,
  },
  {
    name: "Service Catalog",
    path: "/services",
    component: <ServiceCatalog />,
  },
  {
    name: "Storage Catalog",
    path: "/storage",
    component: <StoragePage />,
  },
  {
    name: "Service Price List",
    path: "/services/price-list",
    component: <ServicePriceList />,
  },
  {
    name: "Rating",
    path: "/employees/rating",
    component: <Rating />,
  },
  {
    name: "Storage Settings",
    path: "/storage/settings",
    component: <StorageSettings />,
  },
  {
    name: "Add client",
    path: "/clients/add",
    component: <ClientAdd />,
  },
  {
    name: "Salary",
    path: "/employees/salary",
    component: <SalaryPage />,
  },
  {
    name: "Employee Visits",
    path: "/employees/visits",
    component: <EmployeeVisits />,
  },
  {
    name: "View Visits",
    path: "/visits/:id",
    component: <ViewVisits />,
  },
  {
    name: "Employee Fines",
    path: "/employees/bonuses-fines",
    component: <EmployeeFines />,
  },
  {
    name: "Analytics",
    path: "/analytics",
    component: <AnalyticsPage />,
  },
  {
    name: "Report",
    path: "/analytics/reports",
    component: <Report />,
  },
  {
    name: "Discounts",
    path: "/discounts",
    component: <DiscountPage />,
  },
];
