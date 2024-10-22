import ModalWindow from "@/components/modal-window/modal-window";
import VerticalTextField from "@/components/textfield-vertical/textfield-vertical";
import { useUpdateStorageHierarchy } from "@/service/hierarchy/hierarchy.hook";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useState } from "react";
import { TKatalogHierarchy } from "@/ts/service.interface.ts";

interface EditCategoryModalProps {
  // TODO: Change to
  category: TKatalogHierarchy | null;
}

const EditStorageCategoryModal: React.FC<EditCategoryModalProps> = ({
  category,
}) => {
  const modal = useModal();
  const [categoryName, setCategoryName] = useState<string>(
    category?.name || ""
  );
  const updateHierarchyMutation = useUpdateStorageHierarchy();
  const handleUpdateHierarchy = (category: TKatalogHierarchy) => {
    updateHierarchyMutation.mutate(category);
  };
  return (
    <ModalWindow
      title={"Редактировать Категорию"}
      open={modal.visible}
      handleClose={() => modal.hide()}
      handleSave={() => {
        category && handleUpdateHierarchy({ ...category, name: categoryName });
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
