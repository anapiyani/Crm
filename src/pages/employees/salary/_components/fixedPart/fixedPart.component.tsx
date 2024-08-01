import HeaderTemplate from "../MultiStepHeader/MultiStepHeader.component";
import StepInput from "../stepInput/stepInput.component";
import classes from "./styles.module.scss";

const FixedPart = () => {
  return (
    <div className={classes.fixed}>
      <HeaderTemplate children={"Фиксированная часть"} />
      <div className={classes.fixed__content}>
        <StepInput
          labelName={"Система начисления"}
          placeholder={"За смену"}
          onChange={() => console.log("change")}
        />
        <StepInput
          labelName={"Объем фикс. части"}
          placeholder={"0"}
          onChange={() => console.log("change")}
          plusMinusBtns={true}
          afterChild={<p>руб.</p>}
        />
      </div>
    </div>
  );
};

export default FixedPart;
