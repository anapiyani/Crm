import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import classNames from "classnames";
import classes from "./styles.module.scss";

interface IProps extends Omit<TextFieldProps, "ref" | "variant"> {
  label: string;
  addClassName?: string;
  size?: "small" | "medium";
}

const CustomTextField = React.forwardRef<HTMLInputElement, IProps>(
  ({ label, addClassName, size, ...props }, ref) => {
    return (
      <TextField
        ref={ref}
        size={size}
        {...props}
        label={label}
        variant="outlined"
        sx={{
          backgroundColor: "#FFFFFF",
          fontSize: "1.6rem",
          height: size === "small" ? "4rem" : "auto",
          "& .MuiFormLabel-root": {
            fontSize: "1.6rem",
          },
          "& .MuiOutlinedInput-root": {
            fontSize: "1.6rem",
          },
        }}
        className={classNames(classes["input"], addClassName)}
      />
    );
  }
);

CustomTextField.displayName = "CustomTextField";

export default CustomTextField;
