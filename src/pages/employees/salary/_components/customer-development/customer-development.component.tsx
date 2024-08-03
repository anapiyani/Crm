import HeaderTemplate from "../MultiStepHeader/MultiStepHeader.component";
import StepInput from "../step-input/step-input.component";
import classes from "./styles.module.scss";

const CustomerDevelopment = () => {
  return (
    <div className={classes.development}>
      <div className={classes.development__item}>
        <HeaderTemplate children="За клиента мастера" />
        <div className={classes.selling__item__content}>
          <StepInput
            labelName="Система начислений"
            isAutoComplete={true}
            placeholder="Фиксирвано, в руб."
            options={[]}
            onChange={(value) => console.log(value)}
          />
          <StepInput
            isNumber={true}
            labelName="С сертификатов:"
            plusMinusBtns={true}
            placeholder="0"
            onChange={(value) => console.log(value)}
            afterChild={<p>%</p>}
          />
        </div>
      </div>
      <div className={classes.development__item}>
        <HeaderTemplate children="За приведенного клиента" />
        <div className={classes.selling__item__content}></div>
      </div>
    </div>
  );
};

export default CustomerDevelopment;
