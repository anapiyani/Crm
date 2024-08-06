import React, { useState, useEffect } from "react";
import { Button, TextField, Autocomplete } from "@mui/material";
import classes from "./styles.module.scss";
import { IOptions } from "@/ts/employee.interface";

interface StepInputProps {
  labelName: string;
  placeholder: string;
  afterChild?: React.ReactNode;
  onChange: (value: any) => void;
  plusMinusBtns?: boolean;
  isAutoComplete?: boolean;
  options?: IOptions[];
  isNumber?: boolean;
  dataValue?: string; // For text/number fields
  selectedOption?: IOptions | null; // For autocomplete fields
}

const StepInput: React.FC<StepInputProps> = ({
  labelName,
  placeholder,
  afterChild,
  onChange,
  plusMinusBtns,
  isAutoComplete,
  options = [],
  isNumber,
  dataValue,
  selectedOption,
}) => {
  const [inputValue, setInputValue] = useState(dataValue || "");
  const [selectedAutoCompleteOption, setSelectedAutoCompleteOption] =
    useState<IOptions | null>(selectedOption || null);

  useEffect(() => {
    setInputValue(dataValue || "");
  }, [dataValue]);

  useEffect(() => {
    setSelectedAutoCompleteOption(selectedOption || null);
  }, [selectedOption]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onChange(value);
  };

  const handleAutoCompleteChange = (
    event: React.ChangeEvent<{}>,
    newValue: IOptions | null,
  ) => {
    setSelectedAutoCompleteOption(newValue);
    onChange(newValue);
  };

  const handlePlusClick = () => {
    const newValue = (Number(inputValue) || 0) + 1;
    setInputValue(newValue.toString());
    onChange(newValue);
  };

  const handleMinusClick = () => {
    const newValue = (Number(inputValue) || 0) - 1;
    setInputValue(newValue.toString());
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
          value={selectedAutoCompleteOption}
          onChange={handleAutoCompleteChange}
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
          placeholder={placeholder}
          value={inputValue}
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
