import React, { useCallback, useEffect, useState } from "react";
import HeaderTemplate from "../MultiStepHeader/MultiStepHeader.component";
import StepInput from "../step-input/step-input.component";
import classes from "./styles.module.scss";
import {
  Button,
  Autocomplete,
  Divider,
  FormControlLabel,
  TextField,
  RadioGroup,
  Radio,
} from "@mui/material";
import NiceModal from "@ebay/nice-modal-react";
import salaryServicesModal from "@/modals/employees/salary-services.modal";
import { Delete } from "@mui/icons-material";
import { Controller, Control } from "react-hook-form";
import { IOptions, ITemplate } from "@/ts/employee.interface";
import { co } from "node_modules/@fullcalendar/core/internal-common";

interface DevServiceItem {
  id: string;
  element: React.ReactNode;
}

interface IServiceTextProps {
  id: number;
  isChecked: number;
  type: "service" | "category";
  serviceName: string;
  parent: number | null;
  parent_name: string | null;
}

interface FloatingPartProps {
  control: Control<ITemplate>;
}

const FloatingPart: React.FC<FloatingPartProps> = ({ control }) => {
  const [devServices, setDevServices] = useState<DevServiceItem[]>([]);
  const [serviceNames, setServiceNames] = useState<string[] | undefined>([]);
  const [serviceIds, setServiceIds] = useState<number[] | undefined>([]);

  const handleGetIds = () => {
    control._defaultValues.services_with_different_percentage?.map((item) => {
      item?.service?.map((id) => {
        setServiceIds((prev) => [...prev!, id!]);
      });
    });
    control._defaultValues.services_with_different_percentage?.map((item) => {
      item?.root?.map((name) => {
        setServiceNames((prev) => [...prev!, name!]);
      });
    });
  };

  useEffect(() => {
    handleGetIds();
  }, []);

  //Zhango's function to traverse from service to parent
<<<<<<< HEAD
=======
  const treeTraverse = (data: IServiceTextProps[], item: IServiceTextProps) => {
    let result: string[] = [];
    console.log(item);
    if (item.parent === null) {
      result.push(item.serviceName);
      return result!;
    }
>>>>>>> 04e6036 (Feat: Modals for Activity view page)

  // Zhango's function to create List of services
  const handleListCreate = (data: IServiceTextProps[]) => {
    const services = data.filter((item) => item.type === "service");
    console.log(services);

    let textResult: string[][] = [];
    services.map((service) => {
      console.log(service);
      const result = treeTraverse(data, service);
      textResult.push(result);
    });
    const uniqueResult = [...new Set(textResult.map((item) => item.join(">")))];

    return uniqueResult;
  };
  const treeTraverse = (
    data: IServiceTextProps[],
    service: IServiceTextProps
  ) => {
    let result: string[] = [];
    console.log(service);
    if (service.parent === null) {
      result.push(service.serviceName);
      return result!;
    }

    const parent = data.find((el) => el.id === service.parent);
    result = [...treeTraverse(data, parent!), ...result];
    if (parent?.isChecked !== 1) {
      result.push(service.serviceName);
    }
    return result;
  };
  const getServicesFromList = (data: IServiceTextProps[]) => {
    const services = data.filter((item) => item.type === "service");
    return services.map((item) => item.id);
  };

  const handleShowNewService = (
    selected: string[] = [], //default values made by Zhango
    cost: string[] = control._defaultValues.services_with_different_percentage!.map(
      (item) => item?.employee_percentage || ""
    ),
    option: { label: string; value: string } = {
      label: "Фикс. сумма",
      value: "fixed_percent",
    }
  ) => {
    const newId = `devService-${Date.now()}`;
    console.log("NewService" + selected);
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
                  <Controller
                    name="services_with_different_percentage.0.employee_percentage"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        type="text"
                        placeholder="0"
                        style={{
                          width: "12rem",
                          marginRight: "1rem",
                          fontSize: "1.4rem",
                        }}
                        onChange={field.onChange}
                        defaultValue={cost[0]}
                      />
                    )}
                  />
                  <p style={{ fontSize: "1.4rem" }}>руб.</p>
                </div>
                <Controller
                  name="services_with_different_percentage.0.calculation_method"
                  control={control}
                  render={({ field }) => {
                    const options = [
                      {
                        label: "По чеку (после всех скидок)",
                        value: "check_total",
                      },
                      {
                        label: "По прайсу (без учета скидок)",
                        value: "price_list",
                      },
                    ];
                    return (
                      <Autocomplete
                        size="small"
                        options={options}
                        defaultValue={option}
                        onChange={(e, value) => {
                          field.onChange(value?.value);
                        }}
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
                    );
                  }}
                />
              </div>
            </div>
            <div>
              <a
                className={classes.linkBtn}
                //Open Modal to chose services
                onClick={() =>
                  NiceModal.show(salaryServicesModal, { serviceIds }).then(
                    (res) => {
                      getServicesFromList(res as IServiceTextProps[]);
                      const newServiceText: IServiceTextProps[] = res as IServiceTextProps[];
                      handleShowNewService(
                        handleListCreate(newServiceText),
                        cost,
                        option
                      );
                      handleDeleteService(newId);
                    }
                  )
                }
                style={{ fontSize: "1.4rem" }}
              >
                Выбрать услуги
              </a>
              {selected.length > 0 && ( //text if you want to change it's design
                <div>
                  <p style={{ fontSize: "1.4rem" }}>Выбранные услуги:</p>
                  {selected.map((item) => (
                    <p key={item} style={{ fontSize: "1.4rem" }}>
                      {item}
                    </p>
                  ))}
                </div>
              )}
              {serviceNames!.length > 0 && (
                <div>
                  {serviceNames?.map((item) => (
                    <p key={item} style={{ fontSize: "1.4rem" }}>
                      {item}
                    </p>
                  ))}
                </div>
              )}
            </div>

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
      prevDevServices.filter((service) => service.id !== id)
    );
  };

  return (
    <div className={classes.floating}>
      <HeaderTemplate children={"Общие настройки"} />
      <div className={classes.floating__content}>
        <Controller
          name="floating_part.revenue_dependent_type"
          control={control}
          render={({ field }) => {
            const options = [
              { label: "От выручки за день", value: "daily_revenue" },
              { label: "От выручки за месяц", value: "monthly_revenue" },
              { label: "От чека за услуги", value: "from_check_on_service" },
              {
                label: "От чека за услуги - материалы без скидки",
                value: "from_check_on_service_minus_materials",
              },
              {
                label: "От чека за услуги - материалы со скидкой",
                value: "from_check_on_service_minus_materials_with_discount",
              },
              {
                label: "От чека за услуги - бонусы клиента",
                value: "from_check_on_service_minus_client_bonuses",
              },
              {
                label: "От чека за услуги - бонусы клиента - материалы",
                value:
                  "from_check_on_service_minus_client_bonuses_minus_materials",
              },
              {
                label: "От (чека за услуги - бонусы клиента - материалы)",
                value:
                  "from_check_on_service_minus_client_bonuses_minus_materials_v2",
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
          name="floating_part.employee_percentage"
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
          name="floating_part.calculation_method"
          control={control}
          render={({ field }) => {
            const options = [
              { label: "По чеку (после всех скидок)", value: "check_total" },
              { label: "По прайсу (без учета скидок)", value: "price_list" },
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

        <Controller
          name="floating_part.material_cost_method"
          control={control}
          render={({ field }) => {
            const options = [
              {
                label: "Как в общих настройках салона",
                value: "salon_settings",
              },
              { label: "Вычитается из выручки", value: "deduct_from_revenue" },
              {
                label: "Вычитается из доли мастера",
                value: "deduct_from_master_share",
              },
            ];

            const selectedOption =
              options.find((option) => option.value === field.value) || null;

            return (
              <StepInput
                placeholder="Вычитать стоимость материалов"
                labelName="Стоимость материалов"
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

        <Controller
          name="floating_part.own_clients_percentage"
          control={control}
          render={({ field }) => (
            <StepInput
              labelName="Со своих клиентов"
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
          name="floating_part.min_amount"
          control={control}
          render={({ field }) => (
            <StepInput
              labelName="Но не менее"
              placeholder="0"
              onChange={field.onChange}
              dataValue={field.value}
              isNumber={true}
              plusMinusBtns={true}
              afterChild={
                <>
                  <Controller
                    name="floating_part.min_amount_period"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        options={[
                          { label: "за смену", value: "shift" },
                          { label: "за месяц", value: "month" },
                        ]}
                        defaultValue={{ label: "за смену", value: "shift" }}
                        onChange={(e, value) => field.onChange(value?.value)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Выберите период"
                            variant="outlined"
                            sx={{
                              fontSize: "1.4rem",
                              marginBottom: "1rem",
                            }}
                          />
                        )}
                        sx={{
                          width: "20rem",
                          "& .MuiAutocomplete-inputRoot": {
                            fontSize: "1rem",
                            padding: "0.5rem",
                            width: "20rem",
                          },
                        }}
                      />
                    )}
                  />
                </>
              }
            />
          )}
        />

        <div className={classes.floating__content__checkboxes}>
          <Controller
            name="floating_part.bonus_type"
            control={control}
            render={({ field }) => (
              <RadioGroup
                aria-label="bonus-type"
                name="bonus-type"
                onChange={field.onChange}
                value={field.value}
              >
                <FormControlLabel
                  value="deduct_material_cost"
                  control={<Radio />}
                  label="Вычитать стоимость израсходованных материалов из зарплаты"
                  sx={{ fontSize: "1.4rem" }}
                />
                <FormControlLabel
                  value="add_material_cost"
                  control={<Radio />}
                  label="Прибавлять стоимость израсходованных материалов к зарплате"
                  sx={{ fontSize: "1.4rem" }}
                />
              </RadioGroup>
            )}
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
