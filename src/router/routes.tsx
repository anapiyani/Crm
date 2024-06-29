import React from "react";
import { CustomerSearch, CustomerAdd, Home, CashDesk } from "@/pages";
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
    path: "/customer",
    component: <CustomerSearch />,
  },
  {
    name: "Customer add",
    path: "/customer/add",
    component: <CustomerAdd />,
  },
];
