import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import classes from "./styles.module.scss";

interface IProps extends Omit<TextFieldProps, "size"> {
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
        fontSize: "1.6rem",
        marginBottom: "1.4rem",
        "& .MuiFormLabel-root": {
          fontSize: "1.6rem",
        },
        "& .MuiOutlinedInput-root": {
          fontSize: "1.6rem",
        },
      }}
      className={`${classes["input"]} ${addClassName || ""}`}
    />
  );
};

export default CustomTextField;
