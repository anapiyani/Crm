import React, { useEffect, useState } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import ModalWindow from "@/components/modal-window/modal-window";
import classes from "./styles.module.scss";
import ServiceAccordion from "./_components/service-accordion/service-accordion";
import classNames from "classnames";
import { IHierarchyFlattenService } from "@/ts/service.interface";

interface ChooseServiceModalProps {
  onSave: (services: any[]) => void;
  flattenData: {
    departmentName: string;
    childrenServices: IHierarchyFlattenService[];
  }[];
  employeeId: number;
  servicesData: any[];
}

const ChooseService: React.FC<ChooseServiceModalProps> = ({
  onSave,
  flattenData,
}) => {
  const modal = useModal();
  const [tempSelectedServices, setTempSelectedServices] = useState<any[]>([]);

  useEffect(() => {
    if (modal.visible) {
      setTempSelectedServices([]);
    }
  }, [modal.visible]);

  const handleServiceSelect = (
    selectedService: any,
    selectedParameter: any,
    quantity: { [key: string]: number }
  ) => {
    const serviceWithParameter = {
      ...selectedService,
      parameter: selectedParameter,
      quantity: quantity[selectedService.service_id],
    };

    setTempSelectedServices((prevData) => {
      const existingService = prevData.find(
        (item) => item.service_id === serviceWithParameter.service_id
      );
      if (existingService) {
        return prevData.map((item) =>
          item.service_id === serviceWithParameter.service_id
            ? {
                ...item,
                quantity: quantity[serviceWithParameter.service_id],
                parameter: selectedParameter,
              }
            : item
        );
      } else {
        return [...prevData, serviceWithParameter];
      }
    });
  };

  return (
    <ModalWindow
      title={"Выберите услугу"}
      open={modal.visible}
      handleSave={() => {
        onSave(tempSelectedServices);
        setTempSelectedServices([]);
        modal.hide();
        modal.remove();
      }}
      handleClose={() => {
        modal.hide();
        modal.remove();
      }}
      className={classNames(classes["u-p-0"], classes["choose-service-modal"])}
      isFront={true}
    >
      <div className={classes["choose-service-modal__accordions"]}>
        {flattenData.map((service, index) => (
          <ServiceAccordion
            key={index}
            departmentName={service.departmentName}
            childrenServices={service.childrenServices}
            onServiceSelect={(service, parameter, quantity) =>
              handleServiceSelect(service, parameter, quantity)
            }
          />
        ))}
      </div>
    </ModalWindow>
  );
};

const ChooseServiceModal = NiceModal.create(ChooseService);
export default ChooseServiceModal;
