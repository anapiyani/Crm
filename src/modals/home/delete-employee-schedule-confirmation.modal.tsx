import ModalWindow from "@/components/modal-window/modal-window";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import classes from "./styles.module.scss";
import { deleteEmployeeSchedule } from "@/service/schedule/schedule.service";
import toast from "react-hot-toast";

interface IDeleteEmployeeScheduleConfirmationProps {
  schedule_id: string;
  date: string;
}

const DeleteEmployeeScheduleConfirmation: React.FC<
  IDeleteEmployeeScheduleConfirmationProps
> = ({ schedule_id, date }) => {
  const modal = useModal();

  const handleDeleteEmployeeSchedule = (schedule_id: string, date: string) => {
    deleteEmployeeSchedule({ id: Number(schedule_id), date: date }).then(
      async () => {
        await toast.remove("Смена успешно удалена");
        modal.hide();
      },
    );
  };

  return (
    <ModalWindow
      title={"Подтверждение"}
      open={modal.visible}
      handleSave={() => {
        handleDeleteEmployeeSchedule(schedule_id, date);
        modal.hide;
      }}
      handleClose={() => modal.hide()}
    >
      <div className={classes["u-font-size-16"]}>
        Вы действительно хотите удалить смену сотрудника за этот день?
      </div>
    </ModalWindow>
  );
};

const DeleteEmployeeScheduleConfirmationModal = NiceModal.create(
  DeleteEmployeeScheduleConfirmation,
);

export default DeleteEmployeeScheduleConfirmationModal;
