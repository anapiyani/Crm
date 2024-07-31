import React, { forwardRef } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import classNames from "classnames";
import classes from "./styles.module.scss";

interface IProps extends Omit<TextFieldProps, "variant"> {
  label?: string;
  addClassName?: string;
  type?: string;
  placeholder: string;
  placeholderOptional?: string;
  doubleDivier?: string;
  onChangeFrom?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTo?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register?: any;
}

const VerticalTextField = forwardRef<HTMLInputElement, IProps>(
  (
    {
      label,
      placeholder,
      placeholderOptional,
      addClassName,
      doubleDivier,
      onChangeFrom,
      onChangeTo,
      type = "text",
      register,
      ...props
    },
    ref,
  ) => {
    const renderTextField = () => {
      switch (type) {
        case "double":
          return (
            <div className={classNames(classes["main__double"])}>
              <TextField
                {...props}
                {...register}
                variant="outlined"
                size="small"
                placeholder={placeholder}
                className={classNames(
                  classes["main__double__inputDouble"],
                  addClassName,
                )}
                onChange={onChangeFrom}
                InputProps={{
                  style: { fontSize: "16px" },
                }}
                inputRef={ref}
              />
              <p>{doubleDivier}</p>
              <TextField
                {...props}
                {...register}
                variant="outlined"
                size="small"
                placeholder={placeholderOptional}
                className={classNames(
                  classes["main__double__inputDouble"],
                  addClassName,
                )}
                onChange={onChangeTo}
                InputProps={{
                  style: { fontSize: "16px" },
                }}
                inputRef={ref}
              />
            </div>
          );
        default:
          return (
            <TextField
              {...props}
              {...register}
              variant="outlined"
              size="small"
              placeholder={placeholder}
              className={classNames(
                classes["main__single__input"],
                addClassName,
              )}
              InputProps={{
                style: { fontSize: "16px" },
              }}
              inputRef={ref}
            />
          );
      }
    };

    return (
      <div className={classes["main"]}>
        <p style={{ fontSize: "16px" }}>{label}</p>
        {renderTextField()}
      </div>
    );
  },
);

export default VerticalTextField;
