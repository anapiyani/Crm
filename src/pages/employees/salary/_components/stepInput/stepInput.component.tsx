import { Button, TextField, Autocomplete } from "@mui/material";
import classes from "./styles.module.scss";
import { IOptions } from "@/ts/employee.interface";
import { useState } from "react";

const StepInput = ({
  labelName,
  placeholder,
  afterChild,
  onChange,
  plusMinusBtns,
  isAutoComplete,
  options = [],
  isNumber,
}: {
  labelName: string;
  placeholder: string;
  afterChild?: React.ReactNode;
  onChange: (value: any) => void;
  plusMinusBtns?: boolean;
  isAutoComplete?: boolean;
  options?: IOptions[];
  isNumber?: boolean;
}) => {
  const [inputValue, setInputValue] = useState(isNumber ? 0 : placeholder);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isNumber && value !== "0") {
      setInputValue(value);
      onChange(value);
    } else if (!isNumber) {
      setInputValue(value);
      onChange(value);
    }
  };

  const handlePlusClick = () => {
    const newValue = (Number(inputValue) || 0) + 1;
    setInputValue(newValue);
    onChange(newValue);
  };

  const handleMinusClick = () => {
    const newValue = (Number(inputValue) || 0) - 1;
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={classes.stepInput}>
      <p>{labelName}</p>
      {isAutoComplete ? (
        <Autocomplete
          sx={{
            width: "100%",
            marginRight: "1rem",
            padding: 0,
            "& .MuiInputBase-root": {
              height: "4rem",
            },
          }}
          options={options}
          getOptionLabel={(option) => option.label}
          onChange={(event, newValue) => onChange(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                width: "100%",
                marginRight: "1rem",
                fontSize: "1.4rem",
                "& .MuiFormLabel-root": {
                  fontSize: "1.4rem",
                },
                "& .MuiOutlinedInput-root": {
                  fontSize: "1.4rem",
                },
              }}
              placeholder={placeholder}
            />
          )}
        />
      ) : (
        <TextField
          type={isNumber ? "number" : "text"}
          sx={{
            width: isNumber ? "120px" : "100%",
            textAlign: isNumber ? "center" : "left",
            marginRight: "1rem",
            fontSize: "1.4rem",
            "& .MuiFormLabel-root": {
              fontSize: "1.4rem",
            },
            "& .MuiOutlinedInput-root": {
              fontSize: "1.4rem",
            },
          }}
          placeholder={!isNumber ? placeholder : undefined}
          value={isNumber && inputValue}
          onChange={handleInputChange}
        />
      )}
      {plusMinusBtns && (
        <div className={classes.stepInput__btns}>
          <Button
            sx={{
              minWidth: "40px",
              width: "40px",
              marginLeft: "10px",
            }}
            variant="outlined"
            onClick={handlePlusClick}
          >
            +
          </Button>
          <Button
            sx={{
              minWidth: "40px",
              width: "40px",
            }}
            variant="outlined"
            color="error"
            onClick={handleMinusClick}
          >
            -
          </Button>
        </div>
      )}
      {afterChild}
    </div>
  );
};

export default StepInput;
