import { Autocomplete, Paper, SxProps, TextField } from "@mui/material";
import classNames from "classnames";
import React, { forwardRef } from "react";
import classes from "./styles.module.scss";

interface IOption {
  label: string;
  value: number | string | boolean;
}

interface ICustomAutoCompleteProps<T extends IOption> {
  name: string;
  selectValue: keyof T;
  options: T[];
  onChange?: (value: T | null) => void;
  value?: T | null;
  label?: string;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  size?: "small" | "medium";
  sx?: SxProps;
  fullWidth?: boolean;
}

const isString = (item: unknown): item is string => {
  return typeof item === "string";
};

const CustomAutoComplete = <T extends IOption>(
  {
    name,
    selectValue,
    options,
    label,
    onChange,
    value,
    placeholder,
    className,
    labelClassName,
    size = "medium",
    sx,
    fullWidth,
  }: ICustomAutoCompleteProps<T>,
  ref: React.Ref<HTMLDivElement>
): React.ReactElement => {
  return (
    <div className={classNames(classes["autocomplete"], className)} ref={ref}>
      {label && (
        <label
          htmlFor={name}
          className={classNames(classes["autocomplete__label"], labelClassName)}
        >
          {label}
        </label>
      )}
      <Autocomplete<T>
        id={name}
        options={options}
        value={value}
        fullWidth={fullWidth}
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
          width: "100%",
          ...sx,
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
            sx={{
              width: "100%",
            }}
          />
        )}
      />
    </div>
  );
};

export default forwardRef(CustomAutoComplete);
