import ModalWindow from "@/components/modal-window/modal-window";
import { useCreateHierarchy } from "@/service/hierarchy/hierarchy.hook";
import { IAddHierarchy } from "@/ts/hierarchy.inteface";
import { Modal } from "@mui/material";
import { useState } from "react";

interface ICreateCategoryModal {
  level: string;
  parent: number;
  handleClose: () => void;
}

const createHierarchiItem = useCreateHierarchy();
const handleAddHierarchy = (levelName: string, parent: number) => {
  const temp: IAddHierarchy = {
    name: "New hierarchy",
    level: levelName,
    parent: parent,
    services: [],
    role: [],
  };
  createHierarchiItem.mutate(temp);
};

const CreateCategoryModal = (onSubmit: () => void) => {
  const [categoryName, setCategoryName] = useState("");

  return (
    <ModalWindow
      title={"Добавить Категорию"}
      open={false}
      handleClose={() => {}}
      handleSave={onSubmit}
      children={undefined}
    ></ModalWindow>
  );
};
