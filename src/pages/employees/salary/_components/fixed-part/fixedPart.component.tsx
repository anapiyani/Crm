import { IOptions } from "@/ts/employee.interface";
import HeaderTemplate from "../MultiStepHeader/MultiStepHeader.component";
import StepInput from "../stepInput/stepInput.component";
import classes from "./styles.module.scss";

const FixedPart = () => {
  const handleChange = (value: IOptions) => {
    console.log("Selected value:", value.value);
  };

  return (
    <div className={classes.fixed}>
      <HeaderTemplate children={"Фиксированная часть"} />
      <div className={classes.fixed__content}>
        <StepInput
          labelName={"Система начисления"}
          placeholder={"За смену"}
          isAutoComplete={true}
          options={[
            { label: "За час", value: "hourly" },
            { label: "За смену", value: "shift" },
            {
              label: "За смену в зависимости от выручки за месяц",
              value: "monthly_revenue",
            },
            {
              label: "За смену в зависимости от выручки за день",
              value: "daily_revenue",
            },
            {
              label: "За смену в зависимости от продолжительности записей",
              value: "duration",
            },
            { label: "За неделю", value: "week" },
            { label: "За месяц", value: "month" },
          ]}
          onChange={handleChange}
        />
        <StepInput
          isNumber={true}
          labelName={"Объем фикс. части"}
          placeholder={"0"}
          onChange={(value) => console.log("Number input changed:", value)}
          plusMinusBtns={true}
          afterChild={<p>руб.</p>}
        />
      </div>
    </div>
  );
};

export default FixedPart;
