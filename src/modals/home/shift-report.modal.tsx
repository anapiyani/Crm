import React from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import ModalWindow from "@/components/modal-window/modal-window";
import classes from "@/modals/home/styles.module.scss";

const ShiftReport = () => {
  const modal = useModal();
  return (
    <ModalWindow
      title={"Отчет смены"}
      open={modal.visible}
      handleClose={() => modal.hide()}
      className={classes["u-p-0"]}
    >
      ShiftReport
    </ModalWindow>
  );
};

const ShiftReportModal = NiceModal.create(ShiftReport);
export default ShiftReportModal;
