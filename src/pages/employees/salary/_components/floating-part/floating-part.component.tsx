import React, { useState } from "react";
import HeaderTemplate from "../MultiStepHeader/MultiStepHeader.component";
import StepInput from "../stepInput/stepInput.component";
import classes from "./styles.module.scss";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import NiceModal from "@ebay/nice-modal-react";
import salaryServicesModal from "@/modals/employees/salary-services.modal";

interface DevServiceItem {
  id: string;
  element: React.ReactNode;
}

const FloatingPart: React.FC = () => {
  const [devServices, setDevServices] = useState<DevServiceItem[]>([]);

  const handleShowNewService = () => {
    const newId = `devService-${Date.now()}`;
    const newService: DevServiceItem = {
      id: newId,
      element: (
        <div className={classes.services}>
          <div className={classes.services__employeePersentage}>
            <div className={classes.services__employeePersentage__info}>
              <p>% сотрудника</p>
              <input type="number" /> <span>%</span>
            </div>
            <div className={classes.services__employeePersentage__info}>
              <StepInput
                labelName="Свои клиенты / 1-й чек"
                placeholder="По умолчанию"
                isAutoComplete={true}
                onChange={(value) => console.log(value)}
              />
            </div>
          </div>
        </div>
      ),
    };
    setDevServices((prevDevServices) => [...prevDevServices, newService]);
  };

  const handleDeleteService = (id: string) => {
    setDevServices((prevDevServices) =>
      prevDevServices.filter((service) => service.id !== id)
    );
  };

  return (
    <div className={classes.floating}>
      <HeaderTemplate children={"Общие настройки"} />
      <div className={classes.floating__content}>
        <StepInput
          placeholder="% от чека за услуги"
          labelName="Система начисления"
          onChange={() => console.log("float")}
          isAutoComplete={true}
        />
        <StepInput
          placeholder="По чеку (после всех скидок)"
          labelName="Сумма к начислению"
          onChange={() => console.log("float")}
          isAutoComplete={true}
        />
        <StepInput
          placeholder="Как в общих настройках салона"
          labelName="Стоимость материалов"
          onChange={() => console.log("float")}
          isAutoComplete={true}
        />
        <StepInput
          labelName="Процент сотрудника"
          placeholder="0"
          onChange={(value) => console.log(value)}
          isNumber={true}
          plusMinusBtns={true}
          afterChild={<p>% (от суммы к начислению)</p>}
        />
        <StepInput
          labelName="Отнимать"
          placeholder="0"
          onChange={(value) => console.log(value)}
          isNumber={true}
          plusMinusBtns={true}
          afterChild={
            <p style={{ fontSize: "1.3rem" }}>
              % (от зарплаты после рачета плав. части)
            </p>
          }
        />
        <StepInput
          labelName="Со своих клиентов"
          placeholder="0"
          onChange={(value) => console.log(value)}
          isNumber={true}
          plusMinusBtns={true}
          afterChild={<p>% (от суммы к начислению)</p>}
        />
        <StepInput
          labelName="С первого чека"
          placeholder="0"
          onChange={(value) => console.log(value)}
          isNumber={true}
          plusMinusBtns={true}
          afterChild={<p>% (от суммы к начислению)</p>}
        />
        <StepInput
          labelName="Но не менее"
          placeholder="0"
          onChange={(value) => console.log(value)}
          isNumber={true}
          plusMinusBtns={true}
          afterChild={<p>руб.</p>}
        />
        <div className={classes.floating__content__checkboxes}>
          <FormControlLabel
            control={<Checkbox />}
            label="Вычитать стоимость израсходованных материалов из зарплаты"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Прибавлять стоимость израсходованных материалов к зарплате"
          />
        </div>
      </div>
      <HeaderTemplate
        hasPlus={true}
        onPlusClick={() => handleShowNewService()}
        children={"Услуги с другим процентом"}
      />
      <div className={classes.floating__text_top}>
        {devServices.length > 0 ? (
          devServices.map((service) => (
            <div key={service.id} id={service.id}>
              {service.element}
              {
                /* hier scheße Button für löschen */
                <Button onClick={() => NiceModal.show(salaryServicesModal)}>
                  OPEN MODAL
                </Button>
              }
            </div>
          ))
        ) : (
          <p>Все услуги, оказываемые сотрудником, испльзуют общие настройки.</p>
        )}
      </div>
    </div>
  );
};

export default FloatingPart;
