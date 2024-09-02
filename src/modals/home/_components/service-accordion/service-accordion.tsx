import React, { useState } from "react";
import classes from "./styles.module.scss";
import { Button, Divider } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Add, Remove } from "@mui/icons-material";
import classNames from "classnames";
import { IHierarchyFlattenService } from "@/ts/service.interface";

interface ChildService extends IHierarchyFlattenService {}

interface ServiceAccordionProps {
  departmentName: string;
  childrenServices: ChildService[];
  onServiceSelect: (selectedService: ChildService) => void;
}

const ServiceAccordion: React.FC<ServiceAccordionProps> = ({
  departmentName,
  childrenServices,
  onServiceSelect,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [quantities, setQuantities] = useState<Record<string, number>>(
    childrenServices.reduce(
      (acc, service) => {
        acc[service.service] = service.quantity;
        return acc;
      },
      {} as Record<string, number>,
    ),
  );
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
    childrenServices.reduce(
      (acc, service) => {
        acc[service.service] = false;
        return acc;
      },
      {} as Record<string, boolean>,
    ),
  );

  const handleQuantityChange = (service: ChildService, amount: number) => {
    setQuantities((prevQuantities) => {
      const newQuantity = Math.max(prevQuantities[service.service] + amount, 1);
      return { ...prevQuantities, [service.service]: newQuantity };
    });
    onServiceSelect({
      ...service,
      quantity: quantities[service.service] + amount,
    });
  };

  const handleItemClick = (service: ChildService) => {
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [service.service]: !prevSelectedItems[service.service],
    }));
    if (!selectedItems[service.service]) {
      onServiceSelect(service);
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
          <Divider />
          <ul className={classes["accordion__content__list"]}>
            {childrenServices.map((childService, index) => (
              <li
                key={index}
                className={classes["accordion__content__item"]}
                onClick={() => handleItemClick(childService)}
              >
                <div className={classes["accordion__content__item__name"]}>
                  {selectedItems[childService.service] && (
                    <CheckCircleIcon
                      className={classes["accordion__content__item__icon"]}
                    />
                  )}
                  {childService.serviceName}
                </div>
                {selectedItems[childService.service] && (
                  <div className={classes["accordion__content__item__details"]}>
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
                        value={quantities[childService.service]}
                        readOnly
                        className={classes["accordion__content__item__input"]}
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
                    <div className={classes["accordion__content__item__price"]}>
                      {calculateTotalPrice(
                        childService.price,
                        quantities[childService.service],
                      )}{" "}
                      тенге
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ServiceAccordion;
