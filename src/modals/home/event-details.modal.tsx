import ModalWindow from "@/components/modal-window/modal-window";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import classes from "./styles.module.scss";

const EventDetailsModal = () => {
  const modal = useModal();
  return (
    <ModalWindow
      title={"Event Details"}
      open={modal.visible}
      handleClose={() => modal.hide()}
      className={classes["u-p-0"]}
    >
      <div>
        <h1>Event Details</h1>
      </div>
    </ModalWindow>
  );
};

export default NiceModal.create(EventDetailsModal);
