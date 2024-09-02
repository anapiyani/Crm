import CustomAutoComplete from "@/components/autocomplete/custom-autocomplete.component";
import ModalWindow from "@/components/modal-window/modal-window";
import VerticalTextField from "@/components/textfield-vertical/textfield-vertical";
import { useCreateHierarchy } from "@/service/hierarchy/hierarchy.hook";

import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { create } from "domain";

import { useState } from "react";

interface IOption {
  value: string;
  label: string;
}

const CreateDepartmentModal = () => {
  const modal = useModal();

  const [departmentName, setDepartmentName] = useState<string>("");
  const addDepartment = useCreateHierarchy(["departmentData"]);

  const handleSave = () => {
    addDepartment.mutate({
      name: departmentName,
      level: "department",
      parent: undefined,
      services: [],
      role: [],
    });
    setDepartmentName("");
  };

  const options: IOption[] = [
    { value: "1", label: "Сотрудники, услуги, материалы" },
    { value: "2", label: "Только материалы" },
  ];
  return (
    <ModalWindow
      title="Создать отдел"
      open={modal.visible}
      handleClose={() => modal.hide()}
      handleSave={() => {
        handleSave();
        modal.hide();
      }}
    >
      <div>
        <VerticalTextField
          label="Название отдела"
          placeholder="Введите название отдела"
          onChange={(e) => setDepartmentName(e.target.value)}
        />
      </div>
    </ModalWindow>
  );
};

export default NiceModal.create(CreateDepartmentModal);
