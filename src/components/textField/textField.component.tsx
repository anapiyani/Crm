import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import classNames from "classnames";
import classes from "./styles.module.scss";

interface IProps extends Omit<TextFieldProps, "ref" | "variant"> {
  label: string;
  addClassName?: string;
}

const CustomTextField: React.FC<IProps> = ({
  label,
  addClassName,
  ...props
}) => {
  return (
    <TextField
      {...props}
      label={label}
      variant="outlined"
      sx={{
        backgroundColor: "#FFFFFF",
        fontSize: "1.6rem",
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
};

export default CustomTextField;
