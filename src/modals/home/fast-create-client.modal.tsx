import ModalWindow from "@/components/modal-window/modal-window";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

const FastCreateClientModal = () => {
  const modal = useModal();
  return (
    <ModalWindow
      title={"Event Details"}
      open={modal.visible}
      handleClose={() => modal.hide()}
    >
      <div>
        <h1>Event Details</h1>
      </div>
    </ModalWindow>
  );
};

export default NiceModal.create(FastCreateClientModal);
