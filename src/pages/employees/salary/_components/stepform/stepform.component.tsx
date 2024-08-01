import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import classes from "./styles.module.scss";
import { Check, Close, Delete, East, West } from "@mui/icons-material";

const steps = [
  "Имя шаблона",
  "Фикс. часть",
  "Плавающая часть",
  "Продажа товаров",
  "Привлечение клиентов",
  "Развитие клиентов",
];

const StepForm = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStop = () => {
    setActiveStep(0);
  };

  const handleDelete = () => {
    console.log("delete");
  };

  const handleSave = () => {
    console.log("save");
  };

  return (
    <div className={classes.step}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          "& .MuiStepLabel-label": {
            fontSize: "1.4rem",
            marginTop: "8px",
            textAlign: "center",
            display: "block",
            fontWeight: 500,
          },
          "& .MuiStepConnector-line": {
            borderTopWidth: "3px",
          },
          "& .MuiStepLabel-root": {
            display: "flex",
            alignItems: "center",
          },
          "& .MuiStepIcon-root": {
            fontSize: "2.5rem",
          },
          "& .MuiStepIcon-text": {
            fontSize: "1.4rem",
          },
          "& .MuiStepConnector-root": {
            top: "11px",
          },
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <React.Fragment>
        <Typography sx={{ mt: 2, mb: 1 }} variant="h6">
          {steps[activeStep]} - Page {activeStep + 1}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          {activeStep === 0 ? (
            <Button
              variant="outlined"
              color="error"
              onClick={handleDelete}
              sx={{ mr: 1 }}
              startIcon={<Delete />}
              style={{
                fontSize: "1.4rem",
                display: "flex",
                alignItems: "center",
                textTransform: "capitalize",
              }}
            >
              Удалить
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="error"
              onClick={handleStop}
              startIcon={<Close />}
              style={{
                fontSize: "1.4rem",
                display: "flex",
                alignItems: "center",
                textTransform: "capitalize",
              }}
              sx={{ mr: 1 }}
            >
              Отмена
            </Button>
          )}

          <Box sx={{ flex: "1 1 auto" }} />
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
            variant="outlined"
            style={{
              fontSize: "1.4rem",
              display: "flex",
              alignItems: "center",
              textTransform: "capitalize",
            }}
            startIcon={<West />}
          >
            Предыдущий шаг
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              style={{
                fontSize: "1.4rem",
                display: "flex",
                alignItems: "center",
                textTransform: "capitalize",
              }}
              endIcon={<Check />}
              onClick={handleSave}
            >
              Сохранить
            </Button>
          ) : (
            <Button
              variant="outlined"
              style={{
                fontSize: "1.4rem",
                display: "flex",
                alignItems: "center",
                textTransform: "capitalize",
              }}
              endIcon={<East />}
              onClick={handleNext}
            >
              Следующий шаг
            </Button>
          )}
        </Box>
      </React.Fragment>
    </div>
  );
};

export default StepForm;
