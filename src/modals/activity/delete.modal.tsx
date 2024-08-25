import ModalWindow from "@/components/modal-window/modal-window";
import HeaderTemplate from "@/pages/employees/salary/_components/MultiStepHeader/MultiStepHeader.component";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import classes from "./styles.module.scss";
import { Button } from "@mui/material";
import { Clear, Done } from "@mui/icons-material";
import { useDeleteVisit } from "@/service/activity/activity.hook";

const DeleteVisitsModal = ({ id }: { id: string }) => {
  const mutation = useDeleteVisit();
  const modal = useModal();

  const handleCloseModal = () => {
    modal.hide();
  };

  const deleteVisit = () => {
    mutation.mutate(id);
  };

  return (
    <ModalWindow
      title={"Удаление визита"}
      titleStyles={{ fontSize: "2.4rem", color: "red" }}
      open={modal.visible}
      className={classes["u-p-0"]}
      handleClose={() => {
        modal.hide();
      }}
      withButtons={false}
    >
      <HeaderTemplate
        children={"Вы действительно хотите удалить этот визит?"}
      />
      <div className={classes["buttons"]}>
        <Button
          variant="outlined"
          onClick={handleCloseModal}
          startIcon={<Clear />}
        >
          Отменить
        </Button>
        <Button
          variant="outlined"
          disableElevation
          color="error"
          startIcon={<Done />}
          onClick={deleteVisit}
        >
          Удалить
        </Button>
      </div>
    </ModalWindow>
  );
};

export default NiceModal.create(DeleteVisitsModal);
