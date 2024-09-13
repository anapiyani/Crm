import ModalWindow from "@/components/modal-window/modal-window";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import classes from "./styles.module.scss";
import { IHierarchyFlattenService } from "@/ts/service.interface";
import { useState } from "react";
import ServiceAccordion from "../home/_components/service-accordion/service-accordion";
import classNames from "classnames";

interface IAddServicesProps {
  onSave: (services: any[]) => void;
  flattenData: {
    departmentName: string;
    childrenServices: IHierarchyFlattenService[];
  }[];
}

const addServices = ({ onSave, flattenData }: IAddServicesProps) => {
  const modal = useModal();

  const [tempSelectedServices, setTempSelectedServices] = useState<any[]>([]);

  const services = flattenData;

  const handleServiceSelect = (
    selectedService: any,
    selectedParameter: any,
    quantity: { [key: string]: number },
  ) => {
    const serviceWithParameter = {
      ...selectedService,
      parameter: selectedParameter,
      quantity: quantity[selectedService.service_id],
    };

    setTempSelectedServices((prevData) => {
      const existingService = prevData.find(
        (item) => item.service_id === serviceWithParameter.service_id,
      );
      if (existingService) {
        return prevData.map((item) =>
          item.service_id === serviceWithParameter.service_id
            ? {
                ...item,
                quantity: quantity[serviceWithParameter.service_id],
                parameter: selectedParameter,
              }
            : item,
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
        modal.hide();
      }}
      handleClose={() => modal.hide()}
      className={classNames(classes["u-p-0"], classes["choose-service-modal"])}
      isFront={true}
    >
      <div className={classes.services}>
        {services.map((service, index) => (
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

export default NiceModal.create(addServices);
