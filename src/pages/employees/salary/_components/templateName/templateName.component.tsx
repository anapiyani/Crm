import React, { useState } from "react";
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
  onSaveName?: () => void;
}

const TemplateName: React.FC<TemplateNameProps> = ({
  control,
  isEmployeeEdit,
  templateNameAndIds,
  choosenTemplate,
  onSaveName,
}) => {
  const [templateId, setTemplateId] = useState<string | undefined>();
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
            onChange={(value) => setTemplateId(value ? value.value : undefined)}
            afterChild={
              <Button
                onClick={() => choosenTemplate && choosenTemplate(templateId!)}
                sx={{
                  fontSize: "1rem",
                  padding: "0.7rem 4rem",
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

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <StepInput
                labelName={"Название шаблона"}
                placeholder={"Дайте имя новому шаблону"}
                onChange={(e) => field.onChange(e)}
                dataValue={field.value || ""}
                afterChild={
                  <Button
                    sx={{
                      fontSize: "1.1rem",
                      padding: "1rem 4rem",
                      width: "150px",
                    }}
                    onClick={onSaveName}
                    variant="outlined"
                  >
                    <Save sx={{ marginRight: "0.5rem" }} />
                    Сохранить
                  </Button>
                }
              />
            )}
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
