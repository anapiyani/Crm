import React from "react";
import HeaderTemplate from "../MultiStepHeader/MultiStepHeader.component";
import StepInput from "../step-input/step-input.component";
import classes from "./styles.module.scss";
import { Controller, Control } from "react-hook-form";
import { ITemplate } from "@/ts/employee.interface";
import { Button } from "@mui/material";
import { Done, Save } from "@mui/icons-material";

interface TemplateNameProps {
  control: Control<ITemplate>;
  isEmployeeEdit?: boolean;
  templateNameAndIds?: { name: string; id: number | undefined }[];
  choosenTemplate?: (value: string) => void;
}

const TemplateName: React.FC<TemplateNameProps> = ({
  control,
  isEmployeeEdit,
  templateNameAndIds,
  choosenTemplate,
}) => {
  const mappedOptionNameAndId = () => {
    return templateNameAndIds?.map((template) => {
      return {
        value: template.id?.toString() || "",
        label: template.name,
      };
    });
  };

  return (
    <div className={classes.naming}>
      {isEmployeeEdit ? (
        <div>
          <HeaderTemplate children={"Выбрать шаблон"} />
          <StepInput
            labelName={"Выберите шаблон"}
            placeholder={"Мастера"}
            isAutoComplete={true}
            dataValue={""}
            options={mappedOptionNameAndId()}
            onChange={(value) =>
              choosenTemplate && choosenTemplate(value.value)
            }
            afterChild={
              <Button
                sx={{
                  fontSize: "1.1rem",
                  padding: "1rem 1.5rem",
                  width: "150px",
                }}
                variant="outlined"
              >
                <Done sx={{ marginRight: "0.5rem" }} />
                Применить
              </Button>
            }
          />
          <HeaderTemplate children={"Сохранить текущие настройки"} />
          <StepInput
            labelName={"Название шаблона"}
            placeholder={"Дайте имя новому шаблону"}
            dataValue={""}
            onChange={(e) => console.log(e.target.value)}
            afterChild={
              <Button
                sx={{
                  fontSize: "1.1rem",
                  padding: "1rem 1.5rem",
                  width: "150px",
                }}
                variant="outlined"
              >
                <Save sx={{ marginRight: "0.5rem" }} />
                Сохранить
              </Button>
            }
          />
        </div>
      ) : (
        <div>
          <HeaderTemplate children={"Переименовать шаблон"} />
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <StepInput
                {...field}
                labelName={"Название шаблона"}
                placeholder={"Мастера"}
                dataValue={field.value || ""}
                onChange={(e) => field.onChange(e)}
              />
            )}
          />
        </div>
      )}
    </div>
  );
};

export default TemplateName;
