import React from "react";
import {
  EmployeeAdd,
  Home,
  CashDesk,
  EmployeeCard,
  Clients,
  Activity,
  WorkSchedule,
  Department,
  ServiceCatalog,
  ServicePriceList,
  Rating,
} from "@/pages";
import EmployeeSearch from "@/pages/employees/search/customer-search.page";
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
    name: "Customer add",
    path: "/employees/add",
    component: <EmployeeAdd />,
  },
  {
    name: "Clients",
    path: "/clients",
    component: <Clients />,
  },
  {
    name: "Activity",
    path: "/activity",
    component: <Activity />,
  },
  {
    name: "Work schedule",
    path: "/employees/work-schedule",
    component: <WorkSchedule />,
  },
  {
    name: "Employee card",
    path: "employees/employee-card",
    component: <EmployeeCard />,
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
    name: "Service Price List",
    path: "/services/price-list",
    component: <ServicePriceList />,
  },
  {
    name: "Rating",
    path: "/employees/rating",
    component: <Rating />,
  },
];
