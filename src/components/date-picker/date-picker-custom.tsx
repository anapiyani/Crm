import React, { forwardRef } from "react";
import classes from "./styles.module.scss";

interface ICustomDatePickerProps
  extends React.HTMLAttributes<HTMLInputElement> {}

const CustomDatePicker = forwardRef<HTMLInputElement, ICustomDatePickerProps>(
  (props, ref) => {
    return (
      <input
        type="date"
        {...props}
        ref={ref}
        className={classes["date-picker"]}
        placeholder={"DD.MM.YYYY"}
        lang="ru"
      />
    );
  },
);

export default CustomDatePicker;
