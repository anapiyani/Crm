import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import React from "react";
import classes from "./style.module.scss";

interface CustomToolbarProps {
  date: Date;
  onNavigate: (
    action: "PREV" | "NEXT" | "TODAY" | "DATE",
    newDate?: Date,
  ) => void;
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({ date, onNavigate }) => {
  const handleNavigate = (action: "PREV" | "NEXT" | "TODAY" | "DATE") => {
    onNavigate(action);
  };

  dayjs.locale("ru");

  return (
    <div className={classes["toolbar"]}>
      <span className={classes["toolbar__text"]}>{dayjs().format("MMMM")}</span>
      <div className={classes["toolbar__btns"]}>
        <Button onClick={() => handleNavigate("PREV")} variant="outlined">
          <ArrowBackIcon className="icon" />
        </Button>
        <Button onClick={() => handleNavigate("NEXT")} variant="outlined">
          <ArrowForwardIcon className="icon" />
        </Button>
      </div>
    </div>
  );
};

export default CustomToolbar;
