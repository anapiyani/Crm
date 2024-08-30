import React from "react";
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
  icon: SvgIconComponent;
  label: string;
}

interface ResponsiveTabsProps {
  tabsData: TabData[];
  currentTab?: number;
  onTabChange?: (tab: number) => void;
  isWithLink?: boolean;
  className?: string;
}

const ResponsiveTabs = ({
  tabsData,
  currentTab = 0,
  onTabChange,
  isWithLink = true,
  className,
}: ResponsiveTabsProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleTabChange = (event: SelectChangeEvent<string>) => {
    if (onTabChange) {
      onTabChange(parseInt(event.target.value));
    }
  };

  return isSmallScreen ? (
    <Grid container xs={9}>
      <Select
        value={currentTab.toString()}
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
        {tabsData.map((tab, index) => (
          <MenuItem
            key={index} 
            value={index.toString()}
            sx={{ fontSize: "1.4rem" }}
          >
            <tab.icon style={{ marginRight: 8 }} />
            {tab.label}
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
          {tabsData.map((tab, index) => (
            <div
              key={index}
              className={classNames(classes["tabs__content__tab__link"], {
                [classes["active"]]: currentTab === index,
              })}
              onClick={() => onTabChange && onTabChange(index)}
            >
              <tab.icon
                className={classNames(
                  classes["tabs__content__tab__link__icon"]
                )}
                style={{ width: 22, height: 22 }}
              />
              <p>{tab.label}</p>
            </div>
          ))}
        </div>
        <hr className={classNames(classes["tabs__content__lineArrow"])} />
        <hr className={classNames(classes["tabs__content__lineArrow"])} />
      </Box>
    </div>
  );
};

export default ResponsiveTabs;
