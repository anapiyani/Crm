import ModalWindow from "@/components/modal-window/modal-window";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import classes from "./styles.module.scss";
import HeaderTemplate from "@/pages/employees/salary/_components/MultiStepHeader/MultiStepHeader.component";
import StepInput from "@/pages/employees/salary/_components/step-input/step-input.component";

const BonuseModal = () => {
  const modal = useModal();

  return (
    <ModalWindow
      title={"Премировать сотрудника"}
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
          <StepInput
            labelName={"Сотрудник"}
            placeholder={"Имя Фамилия, Должность"}
            onChange={(value) => console.log(value)}
            isAutoComplete={true}
            options={[]}
          />
          <StepInput
            labelName={"Тип премии"}
            placeholder={"Опоздание"}
            onChange={(value) => console.log(value)}
            isAutoComplete={true}
            options={[]}
          />
          <StepInput
            labelName={"Размер премии"}
            placeholder={"0"}
            dataValue="0"
            isNumber={true}
            plusMinusBtns={true}
            afterChild={"₸"}
            onChange={(value) => console.log(value)}
          />
          <StepInput
            labelName={"Связь с жалобой"}
            placeholder={"Без связи с жалобой"}
            onChange={(value) => console.log(value)}
            isAutoComplete={true}
            options={[]}
          />
        </div>
        <HeaderTemplate children="Комментарий" />
        <textarea
          placeholder="Введите текст отзыва"
          className={classes.info__textarea}
        />
      </div>
    </ModalWindow>
  );
};

export default NiceModal.create(BonuseModal);
