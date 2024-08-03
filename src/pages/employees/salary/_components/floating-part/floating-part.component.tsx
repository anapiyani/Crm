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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
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
              <div
                className={classes.services__employeePersentage__info}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "25rem",
                  marginBottom: "1rem",
                }}
              >
                <p style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>
                  Свои клиенты / 1-й чек
                </p>
                <Autocomplete
                  size="small"
                  options={[
                    { label: "По умолчанию", value: "service_percent" },
                    {
                      label: "Свои клиенты",
                      value: "service_materials_no_discount_percent",
                    },
                    {
                      label: "С первого чека",
                      value: "service_materials_discount_percent",
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
              <div
                className={classes.services__employeePersentage__info}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "25rem",
                  marginBottom: "1rem",
                }}
              >
                <p style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>
                  Прайс / чек
                </p>
                <Autocomplete
                  size="small"
                  options={[
                    { label: "По умолчанию", value: "service_percent" },
                    {
                      label: "По чеку (после всех скидок)",
                      value: "service_materials_no_discount_percent",
                    },
                    {
                      label: "По прайсу (без учета скидок)",
                      value: "service_materials_discount_percent",
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
              <div
                className={classes.services__employeePersentage__info}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "25rem",
                  marginBottom: "1rem",
                }}
              >
                <p style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>
                  Материалы какие
                </p>
                <Autocomplete
                  size="small"
                  options={[
                    { label: "По умолчанию", value: "service_percent" },
                    {
                      label: "Вычитать все материалы",
                      value: "service_percent",
                    },
                    {
                      label: "Вычитать только 'не в чек'",
                      value: "service_materials_no_discount_percent",
                    },
                    {
                      label: "Вычитать только 'в чек'",
                      value: "service_materials_discount_percent",
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
              <div
                className={classes.services__employeePersentage__info}
                style={{
                  display: "flex",
                  flexDirection: "column",

                  marginBottom: "1rem",
                }}
              >
                <p style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>
                  Материалы откуда
                </p>
                <Autocomplete
                  size="small"
                  options={[
                    { label: "По умолчанию", value: "service_percent" },
                    { label: "Вычитать из выручки", value: "service_percent" },
                    {
                      label: "Вычитается из доли мастера",
                      value: "service_materials_no_discount_percent",
                    },
                  ]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Выберите опцию"
                      variant="outlined"
                      sx={{
                        fontSize: "1rem",
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
