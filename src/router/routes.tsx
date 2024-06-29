import React from "react";
import { EmployeeAdd, EmployeeSearch, Home, CashDesk } from "@/pages";
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
    name: "Customer Search",
    path: "/employees",
    component: <EmployeeSearch />,
  },
  {
    name: "Customer add",
    path: "/employees/add",
    component: <EmployeeAdd />,
  },
];
