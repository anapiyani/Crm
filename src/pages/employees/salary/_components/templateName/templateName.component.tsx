import React from "react";
import HeaderTemplate from "../MultiStepHeader/MultiStepHeader.component";
import StepInput from "../step-input/step-input.component";
import classes from "./styles.module.scss";
import { Controller, Control } from "react-hook-form";
import { ITemplate } from "@/ts/employee.interface";

interface TemplateNameProps {
  control: Control<ITemplate>;
}

const TemplateName: React.FC<TemplateNameProps> = ({ control }) => {
  return (
    <div className={classes.naming}>
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
  );
};

export default TemplateName;
