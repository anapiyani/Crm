import React, { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControl,
  styled,
} from "@mui/material";

const StyledFormGroup = styled(FormGroup)({
  maxHeight: "36rem",
  maxWidth: "36rem",
  overflowY: "auto",
  overflowX: "hidden",
  display: "block",
});

const StyledCheckbox = styled(Checkbox)({
  "& svg": {
    fontSize: "2.4rem",
  },
});

const StyledFormControlLabel = styled(FormControlLabel)({
  "& .MuiTypography-root": {
    fontSize: "1.6rem",
  },
});

const paymentOptions = [
  { value: "cash", label: "Только с оплатой наличными" },
  { value: "card", label: "Только с оплатой картой" },
  { value: "checks", label: "Только с оплатой чеками" },
  { value: "certificate", label: "Только с оплатой сертификатом" },
  { value: "bonuses", label: "Только с оплатой бонусами" },
  { value: "deposit", label: "Только с оплатой депозитом" },
  { value: "subscription", label: "Только по абонементам" },
  { value: "depositSubscription", label: "Только по депозитным абонементам" },
  { value: "combinedSubscription", label: "Только по составным абонементам" },
];

const PaymentFilter = () => {
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedPayments([...selectedPayments, value]);
    } else {
      setSelectedPayments(selectedPayments.filter((item) => item !== value));
    }
  };

  return (
    <FormControl component="fieldset">
      <StyledFormGroup>
        {paymentOptions.map((option) => (
          <StyledFormControlLabel
            key={option.value}
            control={
              <StyledCheckbox
                checked={selectedPayments.includes(option.value)}
                onChange={handleChange}
                value={option.value}
              />
            }
            label={option.label}
          />
        ))}
      </StyledFormGroup>
    </FormControl>
  );
};

export default PaymentFilter;
