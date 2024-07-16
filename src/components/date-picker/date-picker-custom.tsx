import React from "react";
import classes from "./styles.module.scss";

interface ICustomDatePickerProps
  extends React.HTMLAttributes<HTMLInputElement> {}

const CustomDatePicker: React.FC<ICustomDatePickerProps> = ({ ...props }) => {
  return (
    <input
      type="date"
      {...props}
      className={classes["date-picker"]}
      placeholder={"DD.MM.YYYY"}
      lang="ru"
    />
  );
};

export default CustomDatePicker;
