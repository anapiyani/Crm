import HeaderTemplate from "../MultiStepHeader/MultiStepHeader.component";
import StepInput from "../step-input/step-input.component";
import classes from "./styles.module.scss";

const TemplateName = () => {
  return (
    <div className={classes.naming}>
      <HeaderTemplate children={"Переименовать шаблон"} />
      <StepInput
        labelName={"Название шаблона"}
        placeholder={"Мастера"}
        onChange={() => console.log("change")}
      />
    </div>
  );
};

export default TemplateName;
