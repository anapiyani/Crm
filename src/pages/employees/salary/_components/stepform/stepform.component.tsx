import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { Check, Close, Delete, East, West } from "@mui/icons-material";
import { useForm, SubmitHandler } from "react-hook-form";
import TemplateName from "../templateName/templateName.component";
import FixedPart from "../fixed-part/fixedPart.component";
import FloatingPart from "../floating-part/floating-part.component";
import SellingGoods from "../selling-goods/selling-goods.component";
import { ITemplate } from "@/ts/employee.interface";
import classes from "./styles.module.scss";

const steps = [
  "Имя шаблона",
  "Фикс. часть",
  "Плавающая часть",
  "Продажа товаров",
  "Привлечение клиентов",
  "Развитие клиентов",
];

interface IStepFormProps {
  toEdit?: Partial<ITemplate>;
}

const StepForm: React.FC<IStepFormProps> = ({ toEdit }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const { register, handleSubmit, reset, control } = useForm<ITemplate>();

  useEffect(() => {
    if (toEdit) {
      const defaultValues = {
        name: toEdit.name || "",
        template_type: toEdit.template_type || "production",
        fixed_part: toEdit.fixed_part || {},
        floating_part: toEdit.floating_part || {},
        product_sales: toEdit.product_sales || {},
        client_attraction: toEdit.client_attraction || {},
        client_development: toEdit.client_development || {},
        services_with_different_percentage:
          toEdit.services_with_different_percentage || [],
        certificate_sales: toEdit.certificate_sales || {},
        subscription_sales: toEdit.subscription_sales || {},
      };
      reset(defaultValues);
    }
  }, [toEdit, reset]);

  useEffect(() => {
    setActiveStep(0);
    reset();
  }, [toEdit, reset]);

  const onSubmit: SubmitHandler<ITemplate> = (data) => {
    console.log("Form Data: ", data);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStop = () => {
    setActiveStep(0);
    reset();
  };

  const handleDelete = () => {
    console.log("delete");
    reset();
  };

  const displayStep = () => {
    if (activeStep === 0) {
      return <TemplateName control={control} />;
    } else if (activeStep === 1) {
      return <FixedPart control={control} />;
    } else if (activeStep === 2) {
      return <FloatingPart control={control} />;
    } else if (activeStep === 3) {
      return <SellingGoods control={control} />;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            <div className={classes.child}>{displayStep()}</div>
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
            {activeStep === steps.length - 1 ? null : (
              <Button
                style={{
                  fontSize: "1.4rem",
                  alignItems: "center",
                  textTransform: "capitalize",
                  display: "flex",
                }}
                startIcon={<Check />}
                variant="outlined"
                color="success"
                type="submit"
              >
                Сохранить
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
                color="success"
                endIcon={<Check />}
                type="submit"
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
    </form>
  );
};

export default StepForm;
