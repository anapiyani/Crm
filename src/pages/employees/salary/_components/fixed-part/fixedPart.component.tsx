import React from "react";
import { Controller, Control } from "react-hook-form";
import { IOptions, ITemplate } from "@/ts/employee.interface";
import HeaderTemplate from "../MultiStepHeader/MultiStepHeader.component";
import StepInput from "../step-input/step-input.component";
import classes from "./styles.module.scss";

interface FixedPartProps {
  control: Control<ITemplate>;
}

const FixedPart: React.FC<FixedPartProps> = ({ control }) => {
  const [choosenOption, setChoosenOption] = React.useState<string>(
    control._defaultValues.fixed_part?.payroll_type || "",
  );

  const options: IOptions[] = [
    { value: "per_hour", label: "За час" },
    { value: "per_shift", label: "За смену" },
    {
      value: "per_shift_month_revenue",
      label: "За смену в зависимости от выручки за месяц",
    },
    {
      value: "per_shift_day_revenue",
      label: "За смену в зависимости от выручки за день",
    },
    {
      value: "per_shift_duration",
      label: "За смену в зависимости от продолжительности записей",
    },
    { value: "per_week", label: "За неделю" },
    { value: "per_month", label: "За месяц" },
  ];

  return (
    <div className={classes.fixed}>
      <HeaderTemplate children={"Фиксированная часть"} />
      <div className={classes.fixed__content}>
        <Controller
          name="fixed_part.payroll_type"
          control={control}
          render={({ field }) => (
            <StepInput
              labelName={"Система начисления"}
              placeholder={"Выберите систему начисления"}
              isAutoComplete={true}
              options={options}
              onChange={(selectedOption) => {
                field.onChange(selectedOption.value);
                setChoosenOption(selectedOption.value);
              }}
              selectedOption={
                options.find((option) => option.value === field.value) || null
              }
            />
          )}
        />
        {choosenOption === "per_shift_month_revenue" ||
        choosenOption === "per_shift_day_revenue" ||
        choosenOption === "per_shift_duration" ? (
          <>
            <Controller
              name="fixed_part.from_amount"
              control={control}
              render={({ field }) => (
                <StepInput
                  isNumber={true}
                  labelName={"Сумма от"}
                  placeholder={"0"}
                  onChange={(value) => field.onChange(value)}
                  plusMinusBtns={true}
                  dataValue={field.value || ""}
                />
              )}
            />
            <Controller
              name="fixed_part.to_amount"
              control={control}
              render={({ field }) => (
                <StepInput
                  isNumber={true}
                  labelName={"Сумма до"}
                  placeholder={"0"}
                  onChange={(value) => field.onChange(value)}
                  plusMinusBtns={true}
                  dataValue={field.value || ""}
                />
              )}
            />
            <Controller
              name="fixed_part.salary_only_for_worked_time"
              control={control}
              render={({ field }) => (
                <StepInput
                  labelName={"Зарплата только за отработанное время"}
                  placeholder={""}
                  isCheckbox={true}
                  onChange={(checked) => field.onChange(checked)}
                  checked={field.value || false}
                />
              )}
            />
          </>
        ) : (
          <Controller
            name="fixed_part.fixed_amount"
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
        )}
      </div>
    </div>
  );
};

export default FixedPart;
