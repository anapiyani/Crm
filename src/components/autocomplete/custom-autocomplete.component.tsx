import React from "react";
import { Autocomplete, Paper, TextField } from "@mui/material";
import classes from "./styles.module.scss";
import classNames from "classnames";

interface IOption {
  label: string;
  value: number | string;
}

interface ICustomAutoCompleteProps<T extends IOption> {
  name: string;
  selectValue: keyof T;
  options: T[];
  onChange?: (value: T) => void;
  value?: T;
  label?: string;
  placeholder?: string;
  className?: string;
  size?: "small" | "medium";
}

const isString = (item: unknown): item is string => {
  return typeof item === "string";
};

const CustomAutoComplete = <T extends IOption>({
  name,
  selectValue,
  options,
  label,
  onChange,
  value,
  placeholder,
  className,
  size = "medium",
}: ICustomAutoCompleteProps<T>): React.ReactElement => {
  return (
    <div className={classNames(classes["autocomplete"], className)}>
      {label && (
        <label htmlFor={name} className={classes["autocomplete__label"]}>
          {label}
        </label>
      )}
      <Autocomplete<T>
        id={name}
        options={options}
        value={value}
        fullWidth
        size={size}
        getOptionLabel={(option) => option[selectValue] as string}
        getOptionKey={(option) => option.value as string}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        PaperComponent={({ children }) => (
          <Paper sx={{ fontSize: "1.4rem" }}>{children}</Paper>
        )}
        sx={{
          "& .MuiAutocomplete-inputRoot": {
            fontSize: "1.4rem",
          },
        }}
        onChange={(_, newValue) => {
          if (onChange) {
            onChange(newValue as T);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            className={classes["autocomplete__textfield"]}
          />
        )}
      />
    </div>
  );
};

export default CustomAutoComplete;