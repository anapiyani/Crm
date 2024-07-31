import ModalWindow from "@/components/modal-window/modal-window";
import VerticalTextField from "@/components/textfield-vertical/textfield-vertical";
import { useCreateHierarchy } from "@/service/hierarchy/hierarchy.hook";
import { IAddHierarchy } from "@/ts/hierarchy.inteface";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

import { useState } from "react";

interface ICreateCategoryModal {
  level: string;
  parent: number;
}

const CreateCategoryModal: React.FC<ICreateCategoryModal> = ({
  level,
  parent,
}) => {
  const modal = useModal();
  const [categoryName, setCategoryName] = useState("");
  const createHierarchiItem = useCreateHierarchy();
  const handleAddHierarchy = (levelName: string, parent: number) => {
    const temp: IAddHierarchy = {
      name: categoryName,
      level: levelName,
      parent: parent,
      services: [],
      role: [],
    };
    createHierarchiItem.mutate(temp);
  };
  return (
    <ModalWindow
      title={"Добавить Категорию"}
      open={modal.visible}
      handleClose={() => modal.hide()}
      handleSave={() => {
        handleAddHierarchy(level, parent);
        modal.hide();
      }}
      children={
        <div>
          <VerticalTextField
            label="Название"
            placeholder={"Введите название категории"}
            onChange={(e) => setCategoryName(e.target.value)}
            value={categoryName}
          ></VerticalTextField>
        </div>
      }
    ></ModalWindow>
  );
};

export default NiceModal.create(CreateCategoryModal);
