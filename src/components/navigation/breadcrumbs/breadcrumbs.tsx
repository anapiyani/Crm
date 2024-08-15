import React from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Box, Breadcrumbs as MUIbreadcrumbs } from "@mui/material";
import { ChevronRightRounded, Person } from "@mui/icons-material";
import classes from "./styles.module.scss";
import classNames from "classnames";

interface IRoute {
  path: string;
  breadcrumb: string;
  icon?: React.ReactNode;
}

interface IBreadcrumbsCustomProps {
  name?: string;
  className?: string;
}

const BreadcrumbsCustom: React.FC<IBreadcrumbsCustomProps> = ({
  name,
  className,
}) => {
  const location = useLocation();

  const routes: IRoute[] = [
    {
      path: "/",
      breadcrumb: "Домой",
      icon: <Person sx={{ fontSize: 16, color: "var(--primary-500)" }} />,
    },
    { path: "/cashdesk", breadcrumb: "Виртуальная касса" },
    { path: "/employees", breadcrumb: "Сотрудники" },
    { path: "/employees/add", breadcrumb: "Создание карты сотрудника" },
    { path: "/employees/work-schedule", breadcrumb: "График работы" },
    {
      path: "/employees/employee-card",
      breadcrumb: "user",
    },
    {
      path: "/employees/:id",
      breadcrumb: name || "Сотрудник",
    },
    { path: "/employees/department", breadcrumb: "Редактирование должности" },
    {
      path: "/services",
      breadcrumb: "Услуги",
    },
    {
      path: "/employees/cabinet",
      breadcrumb: "Кабинеты",
    },
    {
      path: "/services/price-list",
      breadcrumb: "Прейскурант",
    },
    {
      path: "/storage/settings",
      breadcrumb: "Настройки",
    },
    {
      path: "/clients",
      breadcrumb: "Клиенты",
    },
    {
      path: "/clients/add",
      breadcrumb: "Создание карты клиента",
    },
    {
      path: "/clients/client-card",
      breadcrumb: "Марина Владимировна",
    },
    {
      path: "/visits",
      breadcrumb: "Поиск посещений",
    },
  ];

  const breadcrumbs = useBreadcrumbs(routes);

  return (
    <MUIbreadcrumbs
      aria-label="breadcrumb"
      separator={<ChevronRightRounded sx={{ color: "var(--primary-200)" }} />}
    >
      {breadcrumbs.map(({ match, breadcrumb }) => {
        const route = routes.find((route) => route.path === match.pathname);
        return (
          <RouterLink
            key={match.pathname}
            to={match.pathname}
            className={classes["breadcrumb"]}
          >
            {route?.icon && (
              <Box
                component="span"
                color={"var(--primary-200)"}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 24,
                  height: 24,
                  mr: 1,
                }}
              >
                {route.icon}
              </Box>
            )}
            <span
              className={classNames(
                match.pathname === location.pathname
                  ? classes["breadcrumb__active"]
                  : classes["breadcrumb__not-active"],
                className,
              )}
            >
              {breadcrumb}
            </span>
          </RouterLink>
        );
      })}
    </MUIbreadcrumbs>
  );
};

export default BreadcrumbsCustom;
