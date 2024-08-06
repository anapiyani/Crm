import React, { useState } from "react";
import HeaderTemplate from "../MultiStepHeader/MultiStepHeader.component";
import StepInput from "../step-input/step-input.component";
import classes from "./styles.module.scss";
import {
  Button,
  Autocomplete,
  Checkbox,
  Divider,
  FormControlLabel,
  TextField,
} from "@mui/material";
import NiceModal from "@ebay/nice-modal-react";
import salaryServicesModal from "@/modals/employees/salary-services.modal";
import { Delete } from "@mui/icons-material";
import { useForm, Controller, Control } from "react-hook-form";
import { IStepFormHook, IOptions } from "@/ts/employee.interface";

interface DevServiceItem {
  id: string;
  element: React.ReactNode;
}

interface FloatingPartProps {
  control: Control<IStepFormHook>;
}

const FloatingPart: React.FC<FloatingPartProps> = ({ control }) => {
  const [devServices, setDevServices] = useState<DevServiceItem[]>([]);

  const handleShowNewService = () => {
    const newId = `devService-${Date.now()}`;
    const newService: DevServiceItem = {
      id: newId,
      element: (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* Fields inside the new service */}
              <div
                className={classes.services__employeePersentage__info}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "25rem",
                  marginBottom: "1rem",
                }}
              >
                <p style={{ fontSize: "1.6rem", marginBottom: "0.5rem" }}>
                  % сотрудника
                </p>
                <div style={{ display: "flex", marginBottom: "1rem" }}>
                  <TextField
                    size="small"
                    type="text"
                    placeholder="0"
                    style={{
                      width: "12rem",
                      marginRight: "1rem",
                      fontSize: "1.4rem",
                    }}
                    onChange={(e) => console.log(e.target.value)}
                  />
                  <p style={{ fontSize: "1.4rem" }}>руб.</p>
                </div>
                <Autocomplete
                  size="small"
                  options={[
                    { label: "Фикс. сумма", value: "fixed_percent" },
                    { label: "% от чека", value: "service_percent" },
                    {
                      label: "% - МТ без скидк",
                      value: "service_materials_no_discount_percent",
                    },
                    {
                      label: "% - МТ со скид",
                      value: "service_materials_discount_percent",
                    },
                    {
                      label:
                        "% от (чека за услуги - бонусы клиента - материалы)",
                      value: "service_minus_client_bonuses_materials_percent",
                    },
                  ]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Выберите опцию"
                      variant="outlined"
                      sx={{
                        fontSize: "1.4rem",
                        marginBottom: "1rem",
                      }}
                    />
                  )}
                  sx={{
                    "& .MuiAutocomplete-inputRoot": {
                      fontSize: "1rem",
                      padding: "0.5rem",
                    },
                  }}
                />
              </div>
            </div>
            <a
              className={classes.linkBtn}
              onClick={() => NiceModal.show(salaryServicesModal)}
              style={{ fontSize: "1.4rem" }}
            >
              Выбрать услуги
            </a>
            <Button
              className={classes.deleteBtn}
              onClick={() => handleDeleteService(newId)}
            >
              <Delete />
            </Button>
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
        <Controller
          name="floating_components.0.accrual_type"
          control={control}
          render={({ field }) => {
            const options = [
              {
                label: "Процент от чека за услуги",
                value: "service_percent",
              },
              {
                label: "Процент от чека за услуги - материалы без скидки",
                value: "service_materials_no_discount_percent",
              },
              {
                label: "Процент от чека за услуги - материалы со скидкой",
                value: "service_materials_discount_percent",
              },
              {
                label: "Процент от чека за услуги - бонусы клиента",
                value: "service_client_bonuses_percent",
              },
              {
                label: "Процент от чека за услуги - бонусы клиента - материалы",
                value: "service_client_bonuses_materials_percent",
              },
              {
                label:
                  "Процент от (чека за услуги - бонусы клиента - материалы)",
                value: "service_minus_client_bonuses_materials_percent",
              },
            ];

            const selectedOption =
              options.find((option) => option.value === field.value) || null;

            return (
              <StepInput
                placeholder="% от чека за услуги"
                labelName="Система начисления"
                onChange={(selectedOption) =>
                  field.onChange((selectedOption as IOptions).value)
                }
                isAutoComplete={true}
                options={options}
                selectedOption={selectedOption}
              />
            );
          }}
        />

        <Controller
          name="floating_components.0.percent_amount"
          control={control}
          render={({ field }) => (
            <StepInput
              labelName="Процент сотрудника"
              placeholder="0"
              onChange={field.onChange}
              isNumber={true}
              plusMinusBtns={true}
              dataValue={field.value}
              afterChild={<p>% (от суммы к начислению)</p>}
            />
          )}
        />

        <Controller
          name="floating_components.0.amount_to_pay"
          control={control}
          render={({ field }) => {
            const options = [
              {
                label: "По чеку (после всех скидок)",
                value: "check_after_discounts",
              },
              {
                label: "По прайсу (без учета скидок)",
                value: "price_before_discounts",
              },
            ];

            const selectedOption =
              options.find((option) => option.value === field.value) || null;

            return (
              <StepInput
                placeholder="По чеку (после всех скидок)"
                labelName="Сумма к начислению"
                onChange={(selectedOption) =>
                  field.onChange(selectedOption.value)
                }
                isAutoComplete={true}
                options={options}
                selectedOption={selectedOption}
              />
            );
          }}
        />

        <StepInput
          placeholder="Как в общих настройках салона"
          labelName="Стоимость материалов"
          onChange={() => console.log("float")}
          isAutoComplete={true}
        />

        <StepInput
          labelName="Отнимать"
          placeholder="0"
          onChange={(value) => console.log(value)}
          isNumber={true}
          plusMinusBtns={true}
          afterChild={
            <p style={{ fontSize: "1.3rem" }}>
              % (от зарплаты после расчета плав. части)
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
            sx={{ fontSize: "1.4rem" }}
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Прибавлять стоимость израсходованных материалов к зарплате"
            sx={{ fontSize: "1.4rem" }}
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
              {/* hier scheße Button für löschen */}
            </div>
          ))
        ) : (
          <p style={{ fontSize: "1.4rem" }}>
            Все услуги, оказываемые сотрудником, испльзуют общие настройки.
          </p>
        )}
      </div>
    </div>
  );
};

export default FloatingPart;
