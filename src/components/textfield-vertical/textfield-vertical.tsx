import React, { forwardRef } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import classNames from "classnames";
import classes from "./styles.module.scss";
import CustomDatePicker from "../date-picker/date-picker-custom";
import CustomTimePicker from "../time-picker/time-picker-custom";
import { IconButton } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

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
  labelClassName?: string;
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
      labelClassName,
      ...props
    },
    ref
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
                  addClassName
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
                  addClassName
                )}
                onChange={onChangeTo}
                InputProps={{
                  style: { fontSize: "16px" },
                }}
                inputRef={ref}
              />
            </div>
          );
        case "double-calendar":
          return (
            <div className={classNames(classes["main__double"], addClassName)}>
              <CustomDatePicker
                className={classNames(
                  classes["main__double__inputDouble"],
                  addClassName
                )}
                onChange={onChangeFrom}
              />
              <p>{doubleDivier}</p>
              <CustomDatePicker
                className={classNames(
                  classes["main__double__inputDouble"],
                  addClassName
                )}
                onChange={onChangeTo}
              />
            </div>
          );
        case "double-number":
          return (
            <div className={classNames(classes["main__double"])}>
              <div className={classes.numberTextfield}>
                <TextField
                  {...props}
                  variant="outlined"
                  size="small"
                  placeholder={placeholder}
                  className={classNames(
                    classes["main__double__inputDouble"],
                    addClassName
                  )}
                  onChange={onChangeFrom}
                  InputProps={{
                    style: { fontSize: "16px" },
                  }}
                  inputRef={ref}
                />
                <div className={classes.numberTextfield__iconButton}>
                  <IconButton
                    sx={{ w: "1.8rem", h: "1.8rem", borderRadius: "4px", p: 0 }}
                  >
                    <div className={classes.numberTextfield__iconButton__icon}>
                      <ExpandLess />
                    </div>
                  </IconButton>
                  <IconButton
                    sx={{ w: "1.8rem", h: "1.8rem", borderRadius: "4px", p: 0 }}
                  >
                    <div className={classes.numberTextfield__iconButton__icon}>
                      <ExpandMore />
                    </div>
                  </IconButton>
                </div>
              </div>

              <p>{doubleDivier}</p>
              <div className={classes.numberTextfield}>
                <TextField
                  {...props}
                  variant="outlined"
                  size="small"
                  placeholder={placeholderOptional}
                  className={classNames(
                    classes["main__double__inputDouble"],
                    addClassName
                  )}
                  onChange={onChangeTo}
                  InputProps={{
                    style: { fontSize: "16px" },
                  }}
                  inputRef={ref}
                />
                <div className={classes.numberTextfield__iconButton}>
                  <IconButton
                    sx={{ w: "1.8rem", h: "1.8rem", borderRadius: "4px", p: 0 }}
                  >
                    <div className={classes.numberTextfield__iconButton__icon}>
                      <ExpandLess />
                    </div>
                  </IconButton>
                  <IconButton
                    sx={{ w: "1.8rem", h: "1.8rem", borderRadius: "4px", p: 0 }}
                  >
                    <div className={classes.numberTextfield__iconButton__icon}>
                      <ExpandMore />
                    </div>
                  </IconButton>
                </div>
              </div>
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
                addClassName
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
        <p style={{ fontSize: "16px" }} className={classNames(labelClassName)}>
          {label}
        </p>
        {renderTextField()}
      </div>
    );
  }
);

export default VerticalTextField;
