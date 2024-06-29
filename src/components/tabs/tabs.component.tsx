import { NavLink } from "react-router-dom";
import classes from "./styles.module.scss";
import {
  HomeOutlined,
  ExitToAppOutlined,
  AccountBalanceWalletOutlined,
  WarningAmberOutlined,
  CalendarMonthOutlined,
} from "@mui/icons-material/";

const Tabs = () => {
  return (
    <div className={classes["tabs"]}>
      <div className={classes["tabs__content"]}>
        <div className={classes["tabs__content__tab"]}>
          {[
            { to: "/employees", icon: HomeOutlined, label: "Обзор" },
            {
              to: "/employees/visit",
              icon: ExitToAppOutlined,
              label: "Посещения",
            },
            {
              to: "/employees/balance",
              icon: AccountBalanceWalletOutlined,
              label: "Зарплата, штрафы, премии, авансы",
            },
            {
              to: "/employees/reviews",
              icon: WarningAmberOutlined,
              label: "Отзывы / жалобы",
            },
            {
              to: "/employees/work-schedule",
              icon: CalendarMonthOutlined,
              label: "график работы",
            },
          ].map(({ to, icon: Icon, label }) => (
            <NavLink
              className={({ isActive }) =>
                `${classes["tabs__content__tab__link"]} ${
                  isActive ? classes["active"] : ""
                }`
              }
              to={to}
            >
              <Icon
                className={classes["tabs__content__tab__link__icon"]}
                style={{ width: 22, height: 22 }}
              />
              <p>{label}</p>
            </NavLink>
          ))}
        </div>
        <hr className={classes["tabs__content__lineArrow"]} />
      </div>
    </div>
  );
};

export default Tabs;
