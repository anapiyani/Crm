import React from "react";
import {
  EmployeeAdd,
  EmployeeSearch,
  Home,
  CashDesk,
  EmployeeCard,
  Clients,
  ClientCard,
  Activity,
  WorkSchedule,
  Department,
  ServiceCatalog,
  ServicePriceList,
  Rating,
  ClientAdd,
  StorageSettings,
  EmployeeCabinet,
  EmployeeVisits
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
    name: "Clients",
    path: "/clients",
    component: <Clients />,
  },
  {
    name: "Client card",
    path: "/clients/client-card",
    component: <ClientCard />,
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
    path: "employees/:id/:username",
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
    name: "Employee Visits",
    path: "/employees/visits",
    component: <EmployeeVisits />,
  },
];
