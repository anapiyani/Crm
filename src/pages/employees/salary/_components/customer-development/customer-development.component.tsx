import { useState } from "react";
import HeaderTemplate from "../MultiStepHeader/MultiStepHeader.component";
import StepInput from "../step-input/step-input.component";
import classes from "./styles.module.scss";
import { Autocomplete, Button, Divider, TextField } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Control, Controller } from "react-hook-form";
import { ITemplate } from "@/ts/employee.interface";

interface ServiceItem {
  id: string;
  element: React.ReactNode;
}

interface ICustomerDevelopmentProps {
  control: Control<ITemplate>;
}

const CustomerDevelopment: React.FC<ICustomerDevelopmentProps> = ({
  control,
}) => {
  const [serviceWithOtherPercent, setServicesWithOtherPercent] = useState<
    ServiceItem[]
  >([]);

  const handleOpenServicesWithOtherPercent = () => {
    const newId = `devGoods-${Date.now()}`;
    const newGoods: ServiceItem = {
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
                  <p style={{ fontSize: "1.4rem" }}>₸</p>
                </div>
                <Autocomplete
                  size="small"
                  options={[
                    { label: "Фикс. сумма", value: "fixed_percent" },
                    { label: "% от чека", value: "service_percent" },
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
            <a className={classes.linkBtn} style={{ fontSize: "1.4rem" }}>
              Выбрать услуги
            </a>
            <Button
              className={classes.deleteBtn}
              onClick={() => handleDeleteServices(newId)}
            >
              <Delete />
            </Button>
          </div>
          <Divider />
        </div>
      ),
    };
    setServicesWithOtherPercent((prevDevServices) => [
      ...prevDevServices,
      newGoods,
    ]);
  };

  const handleDeleteServices = (id: string) => {
    setServicesWithOtherPercent((prevDevServices) =>
      prevDevServices.filter((service) => service.id !== id),
    );
  };

  return (
    <div className={classes.development}>
      <div className={classes.development__item}>
        <HeaderTemplate
          children="Развитие клиентов
"
        />
        <div className={classes.selling__item__content}>
          <Controller
            name="client_development.calcualtion_type"
            control={control}
            render={(field) => {
              const options = [
                { label: "Процент от чека", value: "check_percent" },
                { label: "Фикс. сумма", value: "fixed_value" },
              ];
              return (
                <StepInput
                  labelName="Система начисления"
                  isAutoComplete={true}
                  placeholder="Фиксирвано, в ₸"
                  options={options}
                  onChange={(value) => field.field.onChange(value)}
                  selectedOption={
                    options.find(
                      (option) => option.value === field.field.value,
                    ) || null
                  }
                />
              );
            }}
          />
          <Controller
            name="client_development.value"
            control={control}
            render={(field) => {
              return (
                <StepInput
                  isNumber={true}
                  labelName="Объем з/п:"
                  plusMinusBtns={true}
                  placeholder="0"
                  onChange={field.field.onChange}
                  dataValue={field.field.value || ""}
                  afterChild={<p>%</p>}
                />
              );
            }}
          />
        </div>
      </div>
      <div className={classes.development__item}>
        <HeaderTemplate
          hasPlus={true}
          children="Услуги с другим процентом"
          onPlusClick={handleOpenServicesWithOtherPercent}
        />
        <div className={classes.selling__item__content}>
          {serviceWithOtherPercent.length > 0 ? (
            serviceWithOtherPercent.map((service) => (
              <div key={service.id}>{service.element}</div>
            ))
          ) : (
            <p className={classes.lonlyP}>
              Все услуги, оказываемые сотрудником, используют общие настройки.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDevelopment;
