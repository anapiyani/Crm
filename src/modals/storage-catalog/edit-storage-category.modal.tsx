import ModalWindow from "@/components/modal-window/modal-window";
import VerticalTextField from "@/components/textfield-vertical/textfield-vertical";
import { useUpdateStorageHierarchy } from "@/service/hierarchy/hierarchy.hook";
import { IStorageCategory } from "@/ts/hierarchy.inteface";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useState } from "react";

interface EditCategoryModalProps {
  category: IStorageCategory;
}

const EditStorageCategoryModal: React.FC<EditCategoryModalProps> = ({
  category,
}) => {
  const modal = useModal();
  const [categoryName, setCategoryName] = useState<string>(category.name);
  const updateHierarchyMutation = useUpdateStorageHierarchy();
  const handleUpdateHierarchy = (category: IStorageCategory) => {
    updateHierarchyMutation.mutate(category);
  };
  return (
    <ModalWindow
      title={"Редактировать Категорию"}
      open={modal.visible}
      handleClose={() => modal.hide()}
      handleSave={() => {
        handleUpdateHierarchy({ ...category, name: categoryName });
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

export default NiceModal.create(EditStorageCategoryModal);
