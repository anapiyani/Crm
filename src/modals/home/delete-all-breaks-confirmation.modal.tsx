import ModalWindow from "@/components/modal-window/modal-window";
import { useDeleteAllBreaks } from "@/service/services/services.hook";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import classes from "./styles.module.scss";

interface IDeleteAllBreaksConfirmationProps {
  date: string;
  employee_id: string;
}

const DeleteAllBreaksConfirmation: React.FC<
  IDeleteAllBreaksConfirmationProps
> = ({ date, employee_id }) => {
  const modal = useModal();
  const DeleteAllBreaksMutation = useDeleteAllBreaks();

  const handleSubmit = () => {
    DeleteAllBreaksMutation.mutate({ date, employee_id });
    DeleteAllBreaksMutation.isSuccess && modal.hide();
  };

  return (
    <ModalWindow
      title={"Подтверждение"}
      open={modal.visible}
      handleClose={() => modal.hide()}
      handleSave={handleSubmit}
    >
      <div className={classes["u-font-size-16"]}>
        Вы действительно хотите удалить все перерывы у сотрудника за этот день?
      </div>
    </ModalWindow>
  );
};

const DeleteAllBreaksConfirmationModal = NiceModal.create(
  DeleteAllBreaksConfirmation
);

export default DeleteAllBreaksConfirmationModal;
