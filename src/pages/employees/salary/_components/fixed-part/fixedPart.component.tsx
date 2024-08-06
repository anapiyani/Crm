import React from "react";
import { Controller, Control } from "react-hook-form";
import { IOptions, IStepFormHook } from "@/ts/employee.interface";
import HeaderTemplate from "../MultiStepHeader/MultiStepHeader.component";
import StepInput from "../step-input/step-input.component";
import classes from "./styles.module.scss";

interface FixedPartProps {
  control: Control<IStepFormHook>;
}

const FixedPart: React.FC<FixedPartProps> = ({ control }) => {
  const options: IOptions[] = [
    { label: "За час", value: "hourly" },
    { label: "За смену", value: "shift" },
    { label: "За неделю", value: "week" },
    { label: "За месяц", value: "month" },
  ];

  return (
    <div className={classes.fixed}>
      <HeaderTemplate children={"Фиксированная часть"} />
      <div className={classes.fixed__content}>
        <Controller
          name="fixed_components.0.accrual_type"
          control={control}
          render={({ field }) => (
            <StepInput
              labelName={"Система начисления"}
              placeholder={"Выберите систему начисления"}
              isAutoComplete={true}
              options={options}
              onChange={(selectedOption) =>
                field.onChange(selectedOption.value)
              }
              selectedOption={
                options.find((option) => option.value === field.value) || null
              }
            />
          )}
        />
        <Controller
          name="fixed_components.0.fixed_amount"
          control={control}
          render={({ field }) => (
            <StepInput
              isNumber={true}
              labelName={"Объем фикс. части"}
              placeholder={"0"}
              onChange={(value) => field.onChange(value)}
              plusMinusBtns={true}
              afterChild={<p>руб.</p>}
              dataValue={field.value || ""}
            />
          )}
        />
      </div>
    </div>
  );
};

export default FixedPart;
