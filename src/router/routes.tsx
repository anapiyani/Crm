import React from "react";
import { EmployeeAdd, Home, CashDesk } from "@/pages";
import EmployeeCard from "@/pages/employees/employee-card/employee-card.page";
import Clients from "@/pages/clients/clients.page";
import Activity from "@/pages/activity/activity.page";
import WorkSchedule from "@/pages/work-schedule/work-schedule";
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
  }
];
