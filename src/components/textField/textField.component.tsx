import React from "react";
import TextField from "@mui/material/TextField";
import { SxProps, Theme } from "@mui/system";

interface IProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  classes: { [key: string]: string };
  addClassName?: string;
}

const CustomTextField: React.FC<IProps> = ({
  label,
  classes,
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
      className={`${classes["email__content__form__send__input"]} ${addClassName || ""}`.trim()}
    />
  );
};

export default CustomTextField;
