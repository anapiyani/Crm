import React, { useState } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import ModalWindow from "@/components/modal-window/modal-window";
import classes from "./styles.module.scss";
import { TextField } from "@mui/material";
import { useAddCategory } from "@/service/kassa/kassa.hook";
import { IIndirectCategory } from "@/ts/kassa.interface";

interface AddCategoryModalProps {
  parentId: number;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ parentId }) => {
  const parent = parentId;
  const modal = useModal();
  const [categoryName, setCategoryName] = useState("");
  const mutation = useAddCategory();

  const handleCloseModal = () => {
    modal.hide();
  };

  const handleSaveModal = async () => {
    const data: IIndirectCategory = {
      name: categoryName,
      expense: true,
      parent: parent ? parent : undefined,
    };
    await mutation.mutate(data);
    setCategoryName("");
    modal.hide();
  };

  return (
    <ModalWindow
      title={"Добавить категорию"}
      open={modal.visible}
      className={classes["u-p-0"]}
      handleClose={handleCloseModal}
      handleSave={handleSaveModal}
    >
      <TextField
        sx={{
          width: "290px",
          fontSize: "1.4rem",
          "& .MuiFormLabel-root": {
            fontSize: "1.4rem",
          },
          "& .MuiOutlinedInput-root": {
            fontSize: "1.4rem",
          },
        }}
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="Введите называние категории"
      />
    </ModalWindow>
  );
};

export default NiceModal.create(AddCategoryModal);
