import ModalWindow from "@/components/modal-window/modal-window";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import classes from "./styles.module.scss";
import { useTimeOffToSchedule } from "@/service/schedule/schedule.hook";

interface ITakeDayOffConfirmationProps {
  employee_id: string;
  date: string;
}

const TakeDayOffConfirmation: React.FC<ITakeDayOffConfirmationProps> = ({
  employee_id,
  date,
}) => {
  const modal = useModal();
  const TakeDayOffMutation = useTimeOffToSchedule();

  const handleSubmit = () => {
    TakeDayOffMutation.mutate({ employee_id, date });
    TakeDayOffMutation.isSuccess && modal.hide();
  };

  return (
    <ModalWindow
      title={"Подтверждение"}
      open={modal.visible}
      handleClose={() => modal.hide()}
      handleSave={handleSubmit}
    >
      <div className={classes["u-font-size-16"]}>
        Вы действительно хотите поставить сотруднику отгул за этот день?
      </div>
    </ModalWindow>
  );
};

const TakeDayOffConfirmationModal = NiceModal.create(TakeDayOffConfirmation);

export default TakeDayOffConfirmationModal;
