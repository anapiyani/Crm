import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { useState } from "react";

type RadioOption = {
  value: string;
  label: string;
};

type RadioButtonsProps = {
  options: RadioOption[];
  defaultValue: string;
};

const RadioButtons: React.FC<RadioButtonsProps> = ({
  options,
  defaultValue,
}) => {
  const [selectedValue, setSelectedValue] = useState("created");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup value={selectedValue} onChange={handleChange}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio sx={{ "& svg": { fontSize: "2.4rem" } }} />}
            label={option.label}
            sx={{ "& .MuiTypography-root": { fontSize: "1.6rem !important" } }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtons;
