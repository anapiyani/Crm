import React, { useState } from "react";
import classes from "./styles.module.scss";
import { Button } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import classNames from "classnames";

export interface IHierarchyFlattenService {
  id: number;
  service_id: number;
  quantity: number;
  serviceName: string;
  parameter: {
    id: number;
    name: string;
    price: number;
  }[];
}

interface ChildService extends IHierarchyFlattenService {}

interface ServiceAccordionProps {
  departmentName: string;
  childrenServices: ChildService[];
  onServiceSelect: (
    selectedService: ChildService,
    selectedParameter: any,
    quantity: { [key: string]: number }
  ) => void;
}

const ServiceAccordion: React.FC<ServiceAccordionProps> = ({
  departmentName,
  childrenServices,
  onServiceSelect,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [quantities, setQuantities] = useState<Record<string, number>>(
    childrenServices.reduce((acc, service) => {
      acc[service.service_id] = service.quantity;
      return acc;
    }, {} as Record<string, number>)
  );
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
    childrenServices.reduce((acc, service) => {
      acc[service.service_id] = false;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const [selectedParameter, setSelectedParameter] = useState<
    Record<string, number | null>
  >(
    childrenServices.reduce((acc, service) => {
      acc[service.service_id] = null;
      return acc;
    }, {} as Record<string, number | null>)
  );

  const handleQuantityChange = (service: ChildService, amount: number) => {
    console.log(service, amount);
    setQuantities((prevQuantities) => {
      console.log(prevQuantities);
      console.log(prevQuantities[service.service_id]);
      const newQuantity = Math.max(
        prevQuantities[service.service_id] + amount,
        1
      );

      return { ...prevQuantities, [service.service_id]: newQuantity };
    });

    const selectedParamId = selectedParameter[service.service_id];
    const selectedParam = service.parameter.find(
      (param) => param.id === selectedParamId
    );
    onServiceSelect(service, selectedParam, quantities);
  };

  const handleItemClick = (service: ChildService) => {
    setSelectedItems((prevSelectedItems) => {
      const isSelected = !prevSelectedItems[service.service_id];

      if (!isSelected) {
        setSelectedParameter((prevSelectedParameter) => ({
          ...prevSelectedParameter,
          [service.service_id]: null,
        }));
      } else {
        if (service.parameter.length > 0) {
          const firstParameter = service.parameter[0];
          setSelectedParameter((prevSelectedParameter) => ({
            ...prevSelectedParameter,
            [service.service_id]: firstParameter.id,
          }));
          onServiceSelect(service, firstParameter, quantities);
        } else {
          onServiceSelect(service, null, quantities);
        }
      }

      return { ...prevSelectedItems, [service.service_id]: isSelected };
    });
  };

  const handleParameterSelect = (
    service: ChildService,
    parameterId: number
  ) => {
    setSelectedParameter((prevSelectedParameter) => ({
      ...prevSelectedParameter,
      [service.service_id]: parameterId,
    }));

    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [service.service_id]: true,
    }));

    const selectedParam = service.parameter.find(
      (param) => param.id === parameterId
    );

    if (selectedParam) {
      onServiceSelect(service, selectedParam, quantities);
    }
  };

  const calculateTotalPrice = (basePrice: number, quantity: number) =>
    basePrice * quantity;

  return (
    <div className={classes["accordion"]}>
      <div
        className={classes["accordion__header"]}
        onClick={() => setIsOpen(!isOpen)}
      >
        <p>{departmentName}</p>
        <p className={classes["accordion__header--right-text"]}>
          Нажмите, чтобы развернуть
        </p>
      </div>
      {isOpen && (
        <div className={classNames(classes["accordion__content"])}>
          <h3>{departmentName}</h3>

          <ul className={classes["accordion__content__list"]}>
            {childrenServices.map((childService, index) => (
              <li
                key={index}
                className={`${classes["accordion__content__item"]} ${
                  selectedItems[childService.service_id]
                    ? classes["accordion__content__itemselected"]
                    : ""
                }`}
                onClick={() => handleItemClick(childService)}
              >
                <div className={classes.accordion__content__item__col}>
                  <div className={classes["accordion__content__item__name"]}>
                    {childService.serviceName}
                    {selectedItems[childService.service_id] && (
                      <div
                        className={classes["accordion__content__item__details"]}
                      >
                        <div className={classes["quantity-controls"]}>
                          <Button
                            variant="outlined"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuantityChange(childService, -1);
                            }}
                            sx={{
                              minWidth: "3rem",
                              padding: 0,
                            }}
                            className={classes["quantity-controls__button"]}
                          >
                            <Remove />
                          </Button>
                          <input
                            type="number"
                            value={quantities[childService.service_id]}
                            readOnly
                            className={
                              classes["accordion__content__item__input"]
                            }
                            onClick={(e) => e.stopPropagation()}
                          />
                          <Button
                            variant="outlined"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuantityChange(childService, 1);
                            }}
                            sx={{
                              minWidth: "3rem",
                              padding: 0,
                            }}
                            className={classes["quantity-controls__button"]}
                          >
                            <Add />
                          </Button>
                        </div>

                        {selectedParameter[childService.service_id] && (
                          <div
                            className={
                              classes["accordion__content__item__price"]
                            }
                          >
                            {calculateTotalPrice(
                              childService.parameter.find(
                                (param) =>
                                  param.id ===
                                  selectedParameter[childService.service_id]
                              )?.price || 0,
                              quantities[childService.service_id]
                            )}{" "}
                            тенге
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className={classes.accordion__content__item__params}>
                    {childService.parameter.map((param) => (
                      <div
                        key={param.id}
                        className={classNames(
                          classes.accordion__content__item__params__el,
                          {
                            [classes[
                              "accordion__content__item__params__el--selected"
                            ]]:
                              selectedParameter[childService.service_id] ===
                              param.id,
                          }
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleParameterSelect(childService, param.id);
                        }}
                      >
                        <label
                          className={
                            classes.accordion__content__item__params__el__label
                          }
                        >
                          {param.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ServiceAccordion;
