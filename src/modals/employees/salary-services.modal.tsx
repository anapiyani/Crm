import ModalWindow from "@/components/modal-window/modal-window";
import RecursiveCheckbox from "@/components/recursive-checkbox/recursive-checkbox";
import { getHierarchy } from "@/service/hierarchy/hierarchy.service";
import { IServiceCategory } from "@/ts/service.interface";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Divider, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IService } from "src/ts/service.interface";
//modal should return selected services
interface ITreeItemProps {
  id: number;
  isChecked: number;
  type: "service" | "category";
  serviceName: string;
  parent: number | null;
  parent_name: string;
}
const SalaryServicesModal = (selected: ITreeItemProps[]) => {
  const modal = useModal();

  const [selectedItems, setSelectedItems] = useState<ITreeItemProps[]>([]);
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
    isChecked: number,
    type: "service" | "category",
    serviceName: string,
    parent: number | null,
    parent_name: string
  ) => {
    setSelectedItems((prev) => {
      if (isChecked === 1) {
        // Add the item if it's checked
        return [
          ...prev,
          { id, isChecked, type, serviceName, parent, parent_name },
        ];
      } else if (isChecked === 2) {
        // Remove the item if it's unchecked
        return prev.filter(
          (item) =>
            !(item.id === id && item.type === type,
            item.parent === parent,
            item.parent_name === parent_name)
        );
      } else if (isChecked === 3) {
        if (!prev.some((item) => item.id === id && item.type === type)) {
          return [
            ...prev,
            { id, isChecked, type, serviceName, parent, parent_name },
          ];
        } else {
          return prev;
        }
      }
      return prev;
    });
  };

  const findFinalAncestor = (
    id: number,
    data: {
      id: number;
      isChecked: number;
      type: "service" | "category";
      serviceName: string;
      parent: number | null;
      parent_name: string;
    }[]
  ) => {
    let result: ITreeItemProps = {
      id: 0,
      isChecked: 0,
      type: "service",
      serviceName: "",
      parent: null,
      parent_name: "",
    };
    const item = data.find((i) => i.id === id);
    if (item?.parent === null || !data.some((i) => i.id === item?.parent)) {
      return item;
    }
    if (item?.type === "category") {
      if (data.some((i) => i.id === item.parent)) {
        result = findFinalAncestor(item.parent!, data)!;
      }
    }
    return result;
  };
  const getHierarchyList = (
    data: {
      id: number;
      isChecked: number;
      type: "service" | "category";
      serviceName: string;
      parent: number | null;
      parent_name: string;
    }[]
  ) => {
    data.forEach((item) => {
      if (item.type === "service") {
        if (data.some((i) => i.id === item.parent)) {
          const parent = findFinalAncestor(item.parent!, data);
        }
      }
    });
  };

  const handleSave = () => {
    modal.resolve(selectedItems);
    modal.hide();
  };

  const handleReturn = () => {
    selected = selectedItems;
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
