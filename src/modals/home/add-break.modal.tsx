import React from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import ModalWindow from "@/components/modal-window/modal-window";

interface IAddBreakModalProps {
  resourceId: string;
}

const AddBreakModal: React.FC<IAddBreakModalProps> = ({ resourceId }) => {
  const modal = useModal();
  return (
    <ModalWindow
      title={"Добавить перерыв"}
      open={modal.visible}
      handleClose={() => modal.hide()}
    >
      {`AddBreakModal ${resourceId}`}
    </ModalWindow>
  );
};

export default NiceModal.create(AddBreakModal);
