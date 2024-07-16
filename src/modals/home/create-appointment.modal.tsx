import React from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import ModalWindow from "@/components/modal-window/modal-window";

interface ICreateAppointmentModalProps {
  start: string;
  end: string;
}

const CreateAppointmentModal: React.FC<ICreateAppointmentModalProps> = ({
  start,
  end,
}) => {
  const modal = useModal();

  return (
    <ModalWindow
      title={"Запись клиента"}
      open={modal.visible}
      handleClose={() => modal.hide()}
    >
      <div>
        <h1>Modal</h1>
        <p>Start: {start}</p>
        <p>End: {end}</p>
      </div>
    </ModalWindow>
  );
};

export default NiceModal.create(CreateAppointmentModal);
