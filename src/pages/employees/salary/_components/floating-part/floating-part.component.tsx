import React, { useState } from "react";
import HeaderTemplate from "../MultiStepHeader/MultiStepHeader.component";
import StepInput from "../step-input/step-input.component";
import classes from "./styles.module.scss";
import { Button, Checkbox, Divider, FormControlLabel } from "@mui/material";
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
        <div>
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                className={classes.services__employeePersentage__info}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "15rem",
                  marginBottom: "1rem",
                }}
              >
                <p style={{ fontSize: "1.6rem" }}>% сотрудника</p>
                <div style={{ display: "flex", marginBottom: "1rem" }}>
                  <input
                    type="text"
                    placeholder="0"
                    style={{ width: "12rem", marginRight: "1rem" }}
                    onChange={(e) => console.log(e.target.value)}
                  />
                  <p>руб.</p>
                </div>
                <select name="pets" id="pet-select">
                  <option value="fixed_percent">Фикс. сумма</option>
                  <option value="service_percent">% от чека</option>
                  <option value="service_materials_no_discount_percent">
                    % - МТ без скидк
                  </option>
                  <option value="service_materials_discount_percent">
                    % - МТ со скид
                  </option>
                  <option value="service_minus_client_bonuses_materials_percent">
                    % от (чека за услуги - бонусы клиента - материалы)
                  </option>
                </select>
              </div>
              <div
                className={classes.services__employeePersentage__info}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "15rem",
                  marginBottom: "1rem",
                }}
              >
                <p style={{ fontSize: "1.3rem" }}>Свои клиенты / 1-й чек</p>
                <select name="pets" id="pet-select">
                  <option value="service_percent">По умолчанию</option>
                  <option value="service_materials_no_discount_percent">
                    Свои клиенты
                  </option>
                  <option value="service_materials_discount_percent">
                    С первого чека
                  </option>
                </select>
              </div>
              <div
                className={classes.services__employeePersentage__info}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "15rem",
                  marginBottom: "1rem",
                }}
              >
                <p style={{ fontSize: "1.3rem" }}>Прайс / чек</p>
                <select name="pets" id="pet-select">
                  <option value="service_percent">По умолчанию</option>
                  <option value="service_materials_no_discount_percent">
                    По чеку (после всех скидок)
                  </option>
                  <option value="service_materials_discount_percent">
                    По прайсу (без учета скидок)
                  </option>
                </select>
              </div>
              <div
                className={classes.services__employeePersentage__info}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "15rem",
                  marginBottom: "1rem",
                }}
              >
                <p style={{ fontSize: "1.3rem" }}>Материалы какие</p>
                <select name="pets" id="pet-select">
                  <option value="service_percent">По умолчанию</option>
                  <option value="service_percent">
                    Вычитать все материалы
                  </option>
                  <option value="service_materials_no_discount_percent">
                    Вычитать только "не в чек"
                  </option>
                  <option value="service_materials_discount_percent">
                    Вычитать только "в чек"
                  </option>
                </select>
              </div>
              <div
                className={classes.services__employeePersentage__info}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "15rem",
                  marginBottom: "1rem",
                }}
              >
                <p style={{ fontSize: "1.3rem" }}>Материалы откуда</p>
                <select name="pets" id="pet-select">
                  <option value="service_percent">По умолчанию</option>
                  <option value="service_percent">Вычитать из выручки</option>
                  <option value="service_materials_no_discount_percent">
                    Вычитается из доли мастера
                  </option>
                </select>
              </div>
            </div>
            {/* hier scheße Button für löschen modal */}
          </div>
          <Divider />
        </div>
      ),
    };
    setDevServices((prevDevServices) => [...prevDevServices, newService]);
  };

  const handleDeleteService = (id: string) => {
    setDevServices((prevDevServices) =>
      prevDevServices.filter((service) => service.id !== id),
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
