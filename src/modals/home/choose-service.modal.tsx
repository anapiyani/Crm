import React from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import ModalWindow from "@/components/modal-window/modal-window";
import classes from "./styles.module.scss";

const ChooseServiceModal = () => {
  const modal = useModal();
  return (
    <ModalWindow
      title={"Выберите услугу"}
      open={modal.visible}
      handleClose={() => modal.hide()}
      className={classes["u-p-0"]}
    >
      hello
    </ModalWindow>
  );
};

export default NiceModal.create(ChooseServiceModal);
