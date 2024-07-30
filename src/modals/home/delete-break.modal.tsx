import ModalWindow from "@/components/modal-window/modal-window";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import classes from "./styles.module.scss";
import { useDeleteBreakFromSchedule } from "@/service/schedule/schedule.hook";

interface IDeleteBreakModalProps {
  breakId: number;
}

const DeleteBreak: React.FC<IDeleteBreakModalProps> = ({ breakId }) => {
  const modal = useModal();
  const DeleteBreakMutation = useDeleteBreakFromSchedule();

  const handleSave = () => {
    DeleteBreakMutation.mutate(breakId);
    modal.hide();
  };

  return (
    <ModalWindow
      title={"Подтверждение"}
      open={modal.visible}
      handleClose={() => modal.hide()}
      handleSave={handleSave}
      className={classes["u-p-0"]}
    >
      <div className={classes["delete-modal"]}>
        <p>Вы действительно хотите удалить перерыв?</p>
      </div>
    </ModalWindow>
  );
};

const DeleteBreakModal = NiceModal.create(DeleteBreak);
export default DeleteBreakModal;
