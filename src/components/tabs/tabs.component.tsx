import { NavLink } from "react-router-dom";
import { SvgIconComponent } from "@mui/icons-material";
import classNames from "classnames";
import classes from "./styles.module.scss";
import {
  MenuItem,
  Select,
  useMediaQuery,
  useTheme,
  Grid,
  Box,
  SelectChangeEvent,
} from "@mui/material";

interface TabData {
  to: string;
  icon: SvgIconComponent;
  label: string;
}

interface ResponsiveTabsProps {
  tabsData: TabData[];
  currentTab?: string;
  onTabChange?: (tab: string) => void;
  isWithLink?: boolean;
  className?: string;
}

const ResponsiveTabs = ({
  tabsData,
  currentTab,
  onTabChange,
  isWithLink = true,
  className,
}: ResponsiveTabsProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleTabChange = (event: SelectChangeEvent<string>) => {
    if (onTabChange) {
      onTabChange(event.target.value);
    }
  };

  return isSmallScreen ? (
    <Grid container xs={9}>
      <Select
        value={currentTab}
        onChange={handleTabChange}
        className={classes["dropdown"]}
        displayEmpty
        sx={{
          width: "100%",
          borderColor: "rgba(0, 0, 0, 0.23)",
          fontSize: "1.6rem",
        }}
      >
        <MenuItem value="" disabled sx={{ fontSize: "1.4rem" }}>
          Select Tab
        </MenuItem>
        {tabsData.map(({ to, icon: Icon, label }) => (
          <MenuItem key={to} value={to} sx={{ fontSize: "1.4rem" }}>
            <Icon style={{ marginRight: 8 }} />
            {label}
          </MenuItem>
        ))}
      </Select>
    </Grid>
  ) : (
    <div className={classNames(classes["tabs"], className)}>
      <Box
        sx={{ display: { xs: "none", md: "block" } }}
        className={classNames(classes["tabs__content"])}
      >
        <div className={classNames(classes["tabs__content__tab"])}>
          {tabsData.map(({ to, icon: Icon, label }) =>
            isWithLink ? (
              <NavLink
                key={to}
                className={({ isActive }) =>
                  classNames(classes["tabs__content__tab__link"], {
                    [classes["active"]]: isActive,
                  })
                }
                to={to}
              >
                <Icon
                  className={classNames(
                    classes["tabs__content__tab__link__icon"]
                  )}
                  style={{ width: 22, height: 22 }}
                />
                <p>{label}</p>
              </NavLink>
            ) : (
              <div
                key={to}
                className={classNames(classes["tabs__content__tab__link"], {
                  [classes["active"]]: currentTab === to,
                })}
                onClick={() => onTabChange && onTabChange(to)}
              >
                <Icon
                  className={classNames(
                    classes["tabs__content__tab__link__icon"]
                  )}
                  style={{ width: 22, height: 22 }}
                />
                <p>{label}</p>
              </div>
            )
          )}
        </div>
        <hr className={classNames(classes["tabs__content__lineArrow"])} />
      </Box>
    </div>
  );
};

export default ResponsiveTabs;
