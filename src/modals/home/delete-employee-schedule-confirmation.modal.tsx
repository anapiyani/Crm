import ModalWindow from "@/components/modal-window/modal-window";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import classes from "./styles.module.scss";
import { deleteSchedule } from "@/service/schedule/schedule.service";
import {
  useDeleteBreakFromSchedule,
  useDeleteEmployeeSchedule,
} from "@/service/schedule/schedule.hook";

interface IDeleteEmployeeScheduleConfirmationProps {
  employee_id: string;
  selectedDate: string;
}

const DeleteEmployeeScheduleConfirmation: React.FC<
  IDeleteEmployeeScheduleConfirmationProps
> = ({ employee_id, selectedDate }) => {
  const modal = useModal();

  const { mutate: deleteEmployeeSchedule } =
    useDeleteEmployeeSchedule(selectedDate);
  console.log(employee_id);

  return (
    <ModalWindow
      title={"Подтверждение"}
      open={modal.visible}
      handleClose={() => modal.hide()}
      handleSave={() => {
        deleteEmployeeSchedule(employee_id as unknown as number);
        modal.hide();
      }}
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
