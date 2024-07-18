import React from "react";
import { SvgIconComponent } from "@mui/icons-material";
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
  currentTab: string;
  onTabChange: (tab: string) => void;
}

const EventTabs = ({
  tabsData,
  currentTab,
  onTabChange,
}: ResponsiveTabsProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleTabChange = (event: SelectChangeEvent<string>) => {
    onTabChange(event.target.value);
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
        {tabsData.map(({ to, icon: Icon, label }) => (
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
          {tabsData.map(({ to, icon: Icon, label }) => (
            <div
              key={to}
              className={`${classes["tabs__content__tab__link"]} ${
                currentTab === to ? classes["active"] : ""
              }`}
              onClick={() => onTabChange(to)}
            >
              <Icon
                className={classes["tabs__content__tab__link__icon"]}
                style={{ width: 22, height: 22 }}
              />
              <p>{label}</p>
            </div>
          ))}
        </div>
        <hr className={classes["tabs__content__lineArrow"]} />
      </Box>
    </div>
  );
};

export default EventTabs;
