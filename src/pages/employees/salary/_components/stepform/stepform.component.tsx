import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  StepLabel,
  Box,
  Stepper,
  Step,
} from "@mui/material";
import { Check, Close, Delete, East, West } from "@mui/icons-material";
import { useForm, SubmitHandler } from "react-hook-form";
import TemplateName from "../templateName/templateName.component";
import FixedPart from "../fixed-part/fixedPart.component";
import FloatingPart from "../floating-part/floating-part.component";
import SellingGoods from "../selling-goods/selling-goods.component";
import { ITemplate } from "@/ts/employee.interface";
import {
  useAddTemplate,
  useAssignTemplate,
  useDeleteTemplate,
  useEditTemplate,
} from "@/service/employee/employee.hook";
import AttractingCliens from "../attracting-clients/attracting-clients.component";
import CustomerDevelopment from "../customer-development/customer-development.component";
import classes from "./styles.module.scss";

interface IStepFormProps {
  toEdit?: Partial<ITemplate>;
  isInfoPage?: boolean;
  onHideModal?: () => void;
  templateList?: ITemplate[];
  templateNameAndIds?: { name: string; id: number | undefined }[];
  choosenTemplate?: (value: string) => void;
}

const StepForm: React.FC<IStepFormProps> = ({
  toEdit,
  isInfoPage,
  onHideModal,
  templateNameAndIds,
  choosenTemplate,
}) => {
  const managmentSteps = 3;
  const editMutation = useEditTemplate();
  const addMutation = useAddTemplate(
    toEdit?.template_type === "management" ? "management" : "production"
  );
  const deleteMutation = useDeleteTemplate();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [steps, setSteps] = useState<string[]>([
    "Имя шаблона",
    "Фикс. часть",
    "Плавающая часть",
    "Продажа товаров",
    "Привлечение клиентов",
    "Развитие клиентов",
  ]);
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    getValues,
  } = useForm<ITemplate>();
  const assignTemplate = useAssignTemplate();

  useEffect(() => {
    if (toEdit) {
      const defaultValues = {
        name: toEdit.name || "",
        template_type: toEdit.template_type || "production",
        fixed_part: toEdit.fixed_part || {},
        floating_part: toEdit.floating_part || {},
        client_attraction: toEdit.client_attraction || {},
        client_development: toEdit.client_development || {},
        services_with_different_percentage:
          toEdit.services_with_different_percentage || [],
        item_sales: toEdit.item_sales || {},
        isEdit: toEdit.id ? true : false,
        employee: toEdit.employee || undefined,
      };
      reset(defaultValues);
    }
  }, [toEdit, reset]);

  useEffect(() => {
    setActiveStep(0);
    reset();
  }, [toEdit, reset]);

  useEffect(() => {
    toEdit?.template_type === "management" &&
      setSteps(["Имя шаблона", "Фикс. часть", "Плавающая часть"]);
    toEdit?.template_type !== "management" &&
      setSteps([
        "Имя шаблона",
        "Фикс. часть",
        "Плавающая часть",
        "Продажа товаров",
        "Привлечение клиентов",
        "Развитие клиентов",
      ]);
  }, [toEdit]);

  const onSubmit: SubmitHandler<ITemplate> = (data) => {
    if (data.employee) {
      assignTemplate.mutate({
        template_id: null,
        user_id: data.employee,
      });
    }

    if (data.isEdit) {
      editMutation.mutate({ form: data, id: toEdit!.id! });
    } else {
      addMutation.mutate(data);
    }
  };

  const onSubmitForUser = (data: ITemplate) => {
    if (data.employee) {
      assignTemplate.mutate({
        template_id: null,
        user_id: data.employee,
      });
    }

    if (data.isEdit) {
      addMutation.mutate({
        ...data,
        employee: data.employee,
      });
    } else {
      addMutation.mutate({
        ...data,
        employee: data.employee,
      });
    }
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      return;
    }

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
    if (toEdit?.id) {
      deleteMutation.mutate(toEdit.id);
    }
    reset();
  };

  const handleCloseModal = () => {
    if (isInfoPage && onHideModal) {
      onHideModal();
    }
    reset();
  };

  const componentMapping: Record<number, JSX.Element> = {
    0: (
      <TemplateName
        isEmployeeEdit={isInfoPage}
        templateNameAndIds={templateNameAndIds}
        control={control}
        choosenTemplate={choosenTemplate}
        onSaveName={() => onSubmitForUser(getValues())}
      />
    ),
    1: <FixedPart control={control} />,
    2: (
      <FloatingPart
        control={control}
        setValue={setValue}
        getValues={getValues}
      />
    ),
    3: <SellingGoods control={control} />,
    4: <AttractingCliens control={control} />,
    5: <CustomerDevelopment control={control} />,
  };

  const displayStep = () => {
    return componentMapping[activeStep as keyof typeof componentMapping];
  };

  const buttonStyles = {
    fontSize: "1.4rem",
    display: "flex",
    alignItems: "center",
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
          {toEdit?.template_type !== "management"
            ? steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel onClick={() => setActiveStep(index)}>
                    {label}
                  </StepLabel>
                </Step>
              ))
            : steps.slice(0, managmentSteps).map((label) => (
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
            {isInfoPage ? (
              <Button
                variant="outlined"
                color="error"
                onClick={handleCloseModal}
                startIcon={<Close />}
                sx={{ ...buttonStyles, textTransform: "capitalize", mr: 1 }}
              >
                Закрыть
              </Button>
            ) : activeStep === 0 ? (
              <Button
                variant="outlined"
                color="error"
                onClick={handleDelete}
                startIcon={<Delete />}
                sx={{ ...buttonStyles, textTransform: "capitalize", mr: 1 }}
              >
                Удалить
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="error"
                onClick={handleStop}
                startIcon={<Close />}
                sx={{ ...buttonStyles, textTransform: "capitalize", mr: 1 }}
              >
                Отмена
              </Button>
            )}
            {activeStep !== steps.length - 1 && (
              <Button
                style={{
                  ...buttonStyles,
                  textTransform: "capitalize",
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
                ...buttonStyles,
                textTransform: "capitalize",
              }}
              startIcon={<West />}
            >
              Предыдущий шаг
            </Button>
            {activeStep === steps.length - 1 && (
              <Button
                variant="contained"
                style={{
                  ...buttonStyles,
                  textTransform: "capitalize",
                }}
                color="success"
                endIcon={<Check />}
                type="submit"
              >
                Сохранить
              </Button>
            )}
            {activeStep !== steps.length - 1 && (
              <Button
                onClick={handleNext}
                variant="outlined"
                style={{
                  ...buttonStyles,
                  textTransform: "capitalize",
                }}
                endIcon={<East />}
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
