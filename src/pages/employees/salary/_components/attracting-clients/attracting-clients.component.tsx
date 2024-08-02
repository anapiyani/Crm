import HeaderTemplate from "../MultiStepHeader/MultiStepHeader.component";
import StepInput from "../stepInput/stepInput.component";
import classes from "./styles.module.scss";

const AttractingCliens = () => {
  return (
    <div>
      <HeaderTemplate children={"За клиента мастера"} />
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
          labelName="Объем з/п"
          plusMinusBtns={true}
          placeholder="0"
          onChange={(value) => console.log(value)}
          afterChild={<p>%</p>}
        />
      </div>
      <HeaderTemplate children={"За приведенного клиента"} />
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
  );
};

export default AttractingCliens;
