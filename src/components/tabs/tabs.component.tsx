import { NavLink } from "react-router-dom";
import { SvgIconComponent } from "@mui/icons-material";
import classes from "./styles.module.scss";
import {
  MenuItem,
  Select,
  useMediaQuery,
  useTheme,
  Grid,
  Box,
} from "@mui/material";

interface TabData {
  to: string;
  icon: SvgIconComponent;
  label: string;
}

interface ResponsiveTabsProps {
  tabsData: TabData[];
  activeTab: number;
  onTabChange: (index: number) => void;
}

const ResponsiveTabs = ({
  tabsData,
  activeTab,
  onTabChange,
}: ResponsiveTabsProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return isSmallScreen ? (
    <Grid container xs={9}>
      <Select
        value=""
        onChange={(event) =>
          (window.location.href = event.target.value as string)
        }
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
        {tabsData.map(({ to, icon: Icon, label }, index) => (
          <MenuItem key={to} value={to} sx={{ fontSize: "1.4rem" }}>
            <Icon style={{ marginRight: 8 }} />
            {label}
          </MenuItem>
        ))}
      </Select>
    </Grid>
  ) : (
    <div className={classes["tabs"]}>
      <Box
        sx={{ display: { xs: "none", md: "block" } }}
        className={classes["tabs__content"]}
      >
        <div className={classes["tabs__content__tab"]}>
          {tabsData.map(({ to, icon: Icon, label }, index) => (
            <NavLink
              key={to}
              className={`${classes["tabs__content__tab__link"]} ${
                activeTab === index ? classes["active"] : ""
              }`}
              to={to}
              onClick={() => onTabChange(index)}
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
      </Box>
    </div>
  );
};

export default ResponsiveTabs;
