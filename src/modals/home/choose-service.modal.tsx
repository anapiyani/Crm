import React, { useState } from "react";
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
}

const ChooseService: React.FC<ChooseServiceModalProps> = ({
  onSave,
  flattenData,
}) => {
  const modal = useModal();
  const [tempSelectedServices, setTempSelectedServices] = useState<any[]>([]);

  const services = flattenData;

  const handleServiceSelect = (selectedService: any) => {
    setTempSelectedServices((prevData) => {
      const existingService = prevData.find(
        (item) => item.service_id === selectedService.service_id
      );
      if (existingService) {
        return prevData.map((item) =>
          item.service_id === selectedService.service_id
            ? { ...item, quantity: selectedService.quantity }
            : item
        );
      } else {
        return [...prevData, selectedService];
      }
    });
  };

  return (
    <ModalWindow
      title={"Выберите услугу"}
      open={modal.visible}
      handleSave={() => {
        onSave(tempSelectedServices);
        modal.hide();
      }}
      handleClose={() => modal.hide()}
      className={classNames(classes["u-p-0"], classes["choose-service-modal"])}
    >
      <div className={classes["choose-service-modal__accordions"]}>
        {services.map((service, index) => (
          <ServiceAccordion
            key={index}
            departmentName={service.departmentName}
            childrenServices={service.childrenServices}
            onServiceSelect={handleServiceSelect}
          />
        ))}
      </div>
    </ModalWindow>
  );
};

const ChooseServiceModal = NiceModal.create(ChooseService);
export default ChooseServiceModal;
