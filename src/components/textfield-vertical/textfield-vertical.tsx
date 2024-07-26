import TextField, { TextFieldProps } from "@mui/material/TextField";
import classNames from "classnames";
import classes from "./styles.module.scss";

interface IProps extends Omit<TextFieldProps, "ref" | "variant"> {
  label?: string;
  addClassName?: string;
  type?: string;
  placeholder: string;
  placeholderOptional?: string;
  doubleDivier?: string;
  onChangeFrom?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTo?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const VerticalTextField: React.FC<IProps> = ({
  label,
  placeholder,
  placeholderOptional,
  addClassName,
  doubleDivier,
  onChangeFrom,
  onChangeTo,
  type = "text", // Default type is text
  ...props
}) => {
  // Function to render TextField based on type
  const renderTextField = () => {
    switch (type) {
      case "double":
        // Example for number type
        return (
          <div className={classNames(classes["main__double"])}>
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
            />
            <p>{doubleDivier}</p>
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
            />
          </div>
        );
      default:
        return (
          <TextField
            {...props}
            variant="outlined"
            size="small"
            placeholder={placeholder}
            className={classNames(classes["main__single__input"], addClassName)}
            InputProps={{
              style: { fontSize: "16px" },
            }}
          />
        );
    }
  };

  return (
    <div className={classes["main"]}>
      <p style={{ fontSize: "16px" }}>{label}</p> {renderTextField()}
    </div>
  );
};

export default VerticalTextField;
