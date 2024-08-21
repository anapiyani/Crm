import React from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import ModalWindow from "@/components/modal-window/modal-window";

const ShowDeletedAppointments = () => {
  const modal = useModal();
  return (
    <ModalWindow
      title={"Удаленные записи"}
      open={modal.visible}
      handleClose={() => modal.hide()}
    >
      hello
    </ModalWindow>
  );
};

const ShowDeletedAppointmentsModal = NiceModal.create(ShowDeletedAppointments);
export default ShowDeletedAppointmentsModal;
