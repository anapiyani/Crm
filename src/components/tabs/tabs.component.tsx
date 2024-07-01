import { NavLink } from "react-router-dom";
import { SvgIconComponent } from "@mui/icons-material";
import classes from "./styles.module.scss";

interface TabData {
  to: string;
  icon: SvgIconComponent;
  label: string;
}

interface TabsProps {
  tabsData: TabData[];
}

const Tabs = ({ tabsData }: TabsProps) => {
  return (
    <div className={classes["tabs"]}>
      <div className={classes["tabs__content"]}>
        <div className={classes["tabs__content__tab"]}>
          {tabsData.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
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
