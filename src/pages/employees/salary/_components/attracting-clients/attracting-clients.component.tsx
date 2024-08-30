import { ITemplate } from "@/ts/employee.interface";
import HeaderTemplate from "../MultiStepHeader/MultiStepHeader.component";
import StepInput from "../step-input/step-input.component";
import classes from "./styles.module.scss";
import { Control, Controller } from "react-hook-form";

interface IAttractingClientsProps {
  control: Control<ITemplate>;
}

const AttractingClients: React.FC<IAttractingClientsProps> = ({ control }) => {
  return (
    <div>
      <HeaderTemplate children={"За клиента мастера"} />
      <div className={classes.selling__item__content}>
        <Controller
          name="client_attraction.calculation_type_client_of_master"
          control={control}
          render={({ field }) => {
            const options = [
              { label: "Фиксированно, в ₸ях", value: "fixed" },
              {
                label: "Процент от первого чека",
                value: "percent_first_check",
              },
            ];
            return (
              <StepInput
                labelName="Система начислений"
                isAutoComplete={true}
                placeholder="Фиксирвано, в ₸"
                options={options}
                onChange={(selectedOption) =>
                  field.onChange(selectedOption.value)
                }
                selectedOption={
                  options.find((option) => option.value === field.value) || null
                }
              />
            );
          }}
        />
        <Controller
          name="client_attraction.value_client_of_master"
          control={control}
          render={({ field }) => (
            <StepInput
              isNumber={true}
              labelName="Объем з/п"
              plusMinusBtns={true}
              placeholder="0"
              onChange={field.onChange}
              dataValue={field.value || ""}
              afterChild={<p>%</p>}
            />
          )}
        />
      </div>
      <HeaderTemplate children={"За приведенного клиента"} />
      <div className={classes.selling__item__content}>
        <Controller
          name="client_attraction.calculation_type_referred_client"
          control={control}
          render={({ field }) => {
            const options = [
              { label: "Процент от чека", value: "percent_first_check" },
              { label: "Фиксировано, в тенге", value: "fixed" },
            ];
            return (
              <StepInput
                labelName="Система начислений"
                isAutoComplete={true}
                placeholder="Фиксирвано, в ₸"
                options={options}
                onChange={(selectedOption) =>
                  field.onChange(selectedOption.value)
                }
                selectedOption={
                  options.find((option) => option.value === field.value) || null
                }
              />
            );
          }}
        />
        <Controller
          name="client_attraction.value_referred_client"
          control={control}
          render={({ field }) => (
            <StepInput
              isNumber={true}
              labelName="С сертификатов"
              plusMinusBtns={true}
              placeholder="0"
              onChange={field.onChange}
              dataValue={field.value || ""}
              afterChild={<p>%</p>}
            />
          )}
        />
      </div>
    </div>
  );
};

export default AttractingClients;
