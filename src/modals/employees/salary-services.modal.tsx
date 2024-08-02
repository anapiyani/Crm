import ModalWindow from "@/components/modal-window/modal-window";
import RecursiveCheckbox from "@/components/recursive-checkbox/recursive-checkbox";
import { getHierarchy } from "@/service/hierarchy/hierarchy.service";
import { IServiceCategory } from "@/ts/service.interface";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Divider, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const SalaryServicesModal = () => {
  const modal = useModal();
  const [selectedItems, setSelectedItems] = useState<
    { id: number; type: "service" | "category"; serviceName: string }[]
  >([]);
  const [data, setData] = useState<IServiceCategory[]>([]);
  const { data: serviceData } = useQuery({
    queryKey: ["ServiceData"],
    queryFn: () => getHierarchy(),

    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setData(serviceData!);
    console.log(serviceData);
  }, [serviceData]);

  const handleServiceChange = (
    id: number,
    isChecked: boolean,
    type: "service" | "category",
    serviceName: string
  ) => {
    setSelectedItems((prev) =>
      isChecked
        ? [...prev, { id, type, serviceName }]
        : prev.filter((item) => !(item.id === id && item.type === type))
    );
  };
  const handleSave = () => {
    console.log(selectedItems);
  };
  return (
    <ModalWindow
      title={"Выбор услуг"}
      open={modal.visible}
      handleClose={() => modal.hide()}
      handleSave={() => {
        handleSave();
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "25vw",
        }}
      >
        <p
          style={{
            fontSize: "1.5rem",
          }}
        >
          Выберите услуги для задания процента
        </p>
        <Divider />
        <TextField />
        <div
          style={{
            overflowY: "auto",
            maxHeight: "50vh",
          }}
        >
          {data?.map((service) => (
            <RecursiveCheckbox
              key={`category-${service.id}`}
              category={service}
              parentChecked={false}
              onChildChange={() => {}}
              onServiceChange={handleServiceChange}
              preCheckedItems={selectedItems}
            />
          ))}
        </div>
      </div>
    </ModalWindow>
  );
};

export default NiceModal.create(SalaryServicesModal);
