import ModalWindow from "@/components/modal-window/modal-window";
import HeaderTemplate from "@/pages/employees/salary/_components/MultiStepHeader/MultiStepHeader.component";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import classes from "./styles.module.scss";
import CustomDatePicker from "@/components/date-picker/date-picker-custom";
import StepInput from "@/pages/employees/salary/_components/step-input/step-input.component";
import { Button, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";

const FeedBackModal = () => {
  const modal = useModal();

  return (
    <ModalWindow
      title={"Создание отзыва"}
      titleStyles={{ fontSize: "2.4rem" }}
      open={modal.visible}
      className={classes["u-p-0"]}
      handleClose={() => {
        modal.hide();
      }}
    >
      <div className={classes.info}>
        <HeaderTemplate children={"Общая информация"} />
        <div className={classes.info__content}>
          <div className={classes.info__content__date}>
            <p>Дата подачи</p> <CustomDatePicker />
          </div>
          <div className={classes.info__content__status}>
            <p>Статус</p> <p className={classes.link}>Рассматривается</p>
          </div>
        </div>
      </div>
      <div className={classes.info}>
        <HeaderTemplate children={"Отзывы"} />
        <div className={classes.info__content}>
          <div className={classes.info__content__date}>
            <StepInput
              labelName={"Отозвались об"}
              placeholder={"Имя Фамилия, Должность"}
              isAutoComplete={true}
              options={[]}
              onChange={(value) => console.log(value)}
            />
          </div>
          <div className={classes.info__content__status}>
            <p>Скан отзыва</p>{" "}
            <Button variant="outlined" startIcon={<Add />}>
              Добавить файлы
            </Button>
          </div>
        </div>
      </div>
      <div className={classes.info}>
        <HeaderTemplate children={"Текст отзыва"} />
        <textarea
          placeholder="Введите текст отзыва"
          className={classes.info__textarea}
        />
      </div>
    </ModalWindow>
  );
};

export default NiceModal.create(FeedBackModal);
