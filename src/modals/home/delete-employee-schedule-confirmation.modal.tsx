import ModalWindow from "@/components/modal-window/modal-window";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import classes from "./styles.module.scss";

interface IDeleteEmployeeScheduleConfirmationProps {
  employee_id: string;
}

const DeleteEmployeeScheduleConfirmation: React.FC<
  IDeleteEmployeeScheduleConfirmationProps
> = ({ employee_id }) => {
  const modal = useModal();

  return (
    <ModalWindow
      title={"Подтверждение"}
      open={modal.visible}
      handleClose={() => modal.hide()}
    >
      <div className={classes["u-font-size-16"]}>
        Вы действительно хотите удалить смену сотрудника за этот день?
      </div>
    </ModalWindow>
  );
};

const DeleteEmployeeScheduleConfirmationModal = NiceModal.create(
  DeleteEmployeeScheduleConfirmation
);

export default DeleteEmployeeScheduleConfirmationModal;
