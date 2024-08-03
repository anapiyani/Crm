import HeaderTemplate from "../MultiStepHeader/MultiStepHeader.component";
import StepInput from "../step-input/step-input.component";
import classes from "./styles.module.scss";

const SellingGoods = () => {
  return (
    <div className={classes.selling}>
      <div className={classes.selling__item}>
        <HeaderTemplate children={"Продажи"} />
        <div className={classes.selling__item__content}>
          <StepInput
            labelName="Сумма к начислению"
            isAutoComplete={true}
            placeholder="По прайсу (без учета скидок)"
            options={[]}
            onChange={(value) => console.log(value)}
          />
        </div>
      </div>
      <div className={classes.selling__item}>
        <HeaderTemplate children={"Продажа сертификатов"} />
        <div className={classes.selling__item__content}>
          <StepInput
            labelName="Система начислений"
            isAutoComplete={true}
            placeholder="Постоянный процент"
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
      <div className={classes.selling__item}>
        <HeaderTemplate children={"Сертификаты с другим процентом"} />
        <div className={classes.selling__item__content}>
          <p className={classes.lonlyP}>
            Все сертификаты, продаваемые сотрудником, используют общие
            настройки.
          </p>
        </div>
      </div>
      <div className={classes.selling__item}>
        <HeaderTemplate children={"Продажа абонементов"} />
        <div className={classes.selling__item__content}>
          <StepInput
            labelName="Система начислений"
            isAutoComplete={true}
            placeholder="Постоянный процент"
            options={[]}
            onChange={(value) => console.log(value)}
          />
          <StepInput
            isNumber={true}
            labelName="С абонементов:"
            plusMinusBtns={true}
            placeholder="0"
            onChange={(value) => console.log(value)}
            afterChild={<p>%</p>}
          />
        </div>
      </div>
      <div className={classes.selling__item}>
        <HeaderTemplate children={"Абонементы с другим процентом"} />
        <div className={classes.selling__item__content}>
          <p className={classes.lonlyP}>
            Все абонементы, продаваемые сотрудником, используют общие настройки.
          </p>
        </div>
      </div>
      <div className={classes.selling__item}>
        <HeaderTemplate children={"Продажа товаров"} />
        <div className={classes.selling__item__content}>
          <StepInput
            labelName="Система начислений"
            isAutoComplete={true}
            placeholder="Постоянный процент"
            options={[]}
            onChange={(value) => console.log(value)}
          />
          <StepInput
            isNumber={true}
            labelName="С товаров:"
            plusMinusBtns={true}
            placeholder="0"
            onChange={(value) => console.log(value)}
            afterChild={<p>%</p>}
          />
        </div>
      </div>
      <div className={classes.selling__item}>
        <HeaderTemplate children={"Товары с другим процентом"} />
        <div className={classes.selling__item__content}>
          <p className={classes.lonlyP}>
            Все товары, продаваемые сотрудником, используют общие настройки.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellingGoods;
