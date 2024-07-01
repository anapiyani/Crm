import React from "react";
import { SxProps, Theme } from "@mui/system";
import TextField from "@mui/material/TextField";
import classNames from "classnames";
import classes from "./styles.module.scss";

interface IProps extends React.HTMLProps<HTMLInputElement> {
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
      sx={
        {
          fontSize: "1.6rem",
          marginBottom: "1.4rem",
          "& .MuiFormLabel-root": {
            fontSize: "1.6rem",
          },
          "& .MuiOutlinedInput-root": {
            fontSize: "1.6rem",
          },
        } as SxProps<Theme>
      }
      className={classNames(classes["input"], addClassName)}
    />
  );
};

export default CustomTextField;
