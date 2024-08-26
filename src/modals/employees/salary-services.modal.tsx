import ModalWindow from "@/components/modal-window/modal-window";
import RecursiveCheckbox from "@/components/recursive-checkbox/recursive-checkbox";
import {
  getHierarchy,
  getHierarchyById,
} from "@/service/hierarchy/hierarchy.service";
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
  parent_name: string | null;
}

interface ISelectedId {
  serviceIds: number[];
}
const SalaryServicesModal = (selected: ISelectedId) => {
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
    console.log(selected);
    handlePreSelectedIds();
  }, [serviceData]);

  const handlePreSelectedIds = () => {
    const preSelectedItems: IServiceCategory[] = [];
    selected.serviceIds.forEach((id) => {
      const item = serviceData?.find((i) => i.id === id);
      if (item) {
        preSelectedItems.push(item);
        setSelectedItems((prev) => [
          ...prev,
          {
            id: item.id,
            isChecked: 1,
            type: "service",
            serviceName: item.name,
            parent: item.parent!,
            parent_name: item.parent_name!,
          },
        ]);
      }
    });
  };

  const handleServiceChange = (
    id: number,
    isChecked: number,
    type: "service" | "category",
    serviceName: string,
    parent: number | null,
    parent_name: string | null
  ) => {
    setSelectedItems((prev) => {
      if (isChecked === 1) {
        // Add the item if it's checked
        return [
          ...prev,
          { id, isChecked, type, serviceName, parent, parent_name },
        ];
      } else if (isChecked === 2) {
        return prev.filter((item) => !(item.id === id && item.type === type));
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

  const onParentChange = async (
    parentCategoryId: number | null,
    childCheckedState: number
  ) => {
    if (parentCategoryId === null) return;

    const parentCategory = await getHierarchyById(parentCategoryId);

    // Determine the new state of the parent based on its children's states
    const childStates = parentCategory.children.map((child) => {
      const isChecked = selectedItems.some(
        (item) => item.id === child.id && item.type === "category"
      );

      const allServicesChecked = child.services.every((service) =>
        selectedItems.some(
          (item) => item.id === service.id && item.type === "service"
        )
      );

      const allChildrenChecked = child.children.every((subChild) =>
        selectedItems.some(
          (item) => item.id === subChild.id && item.type === "category"
        )
      );

      const anyChildrenChecked = child.children.some((subChild) =>
        selectedItems.some(
          (item) => item.id === subChild.id && item.type === "category"
        )
      );

      const anyServicesChecked = child.services.some((service) =>
        selectedItems.some(
          (item) => item.id === service.id && item.type === "service"
        )
      );

      if (allServicesChecked && allChildrenChecked) {
        return 1; // Fully checked
      } else if (
        (anyServicesChecked || anyChildrenChecked) &&
        !(allServicesChecked && allChildrenChecked)
      ) {
        return 3; // Indeterminate
      } else {
        return 2; // Unchecked
      }
    });

    // Determine the overall state of the parent category
    const allChecked = childStates.every((state) => state === 1);
    const anyIndeterminate = childStates.some((state) => state === 3);

    let parentState = 2; // Default to unchecked

    if (allChecked) {
      parentState = 1; // All checked
    } else if (anyIndeterminate || childCheckedState === 3) {
      parentState = 3; // Indeterminate
    }

    // Update the parent category's state
    handleServiceChange(
      parentCategory.id,
      parentState,
      "category",
      parentCategory.name,
      parentCategory.parent!,
      parentCategory.parent_name
    );

    // Recursively propagate the state change to the parent's parent
    onParentChange(parentCategory.parent, parentState);
  };

  const handleSave = () => {
    modal.resolve(selectedItems);
    modal.hide();
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
              onServiceChange={handleServiceChange}
              preCheckedItems={selectedItems}
              onParentChange={onParentChange}
            />
          ))}
        </div>
      </div>
    </ModalWindow>
  );
};

export default NiceModal.create(SalaryServicesModal);
