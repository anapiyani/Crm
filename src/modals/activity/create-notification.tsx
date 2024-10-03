import ModalWindow from "@/components/modal-window/modal-window";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import classes from "./styles.module.scss";
import classNames from "classnames";
import HeaderTemplate from "@/pages/employees/salary/_components/MultiStepHeader/MultiStepHeader.component";
import StepInput from "@/pages/employees/salary/_components/step-input/step-input.component";
import CustomDatePicker from "@/components/date-picker/date-picker-custom";
import CustomTimePicker from "@/components/time-picker/time-picker-custom";
import { Button, TextField } from "@mui/material";
import { ICreateNotification } from "@/ts/activity.interface";
import { Controller, useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { searchEmployee } from "@/service/employee/employee.service";
import { IOptions } from "@/ts/employee.interface";
import { useCreateNotification } from "@/service/activity/activity.hook";
import toast from "react-hot-toast";

const CreateNotificationModal = () => {
  const modal = useModal();
  const { register, handleSubmit, control, setValue } =
    useForm<ICreateNotification>();
  const mutation = useCreateNotification();

  const { data: employeeData } = useQuery({
    queryKey: ["employeeData"],
    queryFn: () => searchEmployee({ role: "customer" }),
  });

  const employeeOptions: IOptions[] =
    employeeData?.results.map((item) => ({
      label: item.first_name + " " + item.last_name,
      value: item.user_id.toString(),
    })) || [];

  const onSubmit = async (data: ICreateNotification) => {
    const notificationData = {
      ...data,
      employee: Number(mutation),
    };
    mutation.mutate(notificationData);
    mutation.isSuccess && modal.hide();
    mutation.isError &&
      toast.error("Произошла ошибка при создании напоминания");
  };

  return (
    <ModalWindow
      title={"Добавить напоминание"}
      open={modal.visible}
      handleSave={() => {
        modal.hide();
      }}
      handleClose={() => modal.hide()}
      className={classNames(classes["u-p-0"], classes["choose-service-modal"])}
      isFront={true}
      withButtons={false}
    >
      <div className={classes.notification}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classes.notification__content}
        >
          <div className={classes.notification__content__settings}>
            <HeaderTemplate children={"Основные параметры"} />
            <Controller
              name="customer"
              control={control}
              render={({ field }) => (
                <StepInput
                  {...field}
                  placeholder="Имя / ID / Телефон / карта"
                  labelName="Клиент"
                  isAutoComplete={true}
                  options={employeeOptions || []}
                  onChange={(value) => {
                    field.onChange(value?.value);
                  }}
                  selectedOption={
                    employeeOptions?.find(
                      (option) => option.value.toString() === field.value,
                    ) || null
                  }
                />
              )}
            />
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <StepInput
                  labelName="Тип"
                  placeholder="Услуга"
                  isAutoComplete={true}
                  options={[
                    { value: "Услуга", label: "Услуга" },
                    { value: "День рождения", label: "День рождения" },
                  ]}
                  onChange={(value) => field.onChange(value.value)}
                />
              )}
            />
            <div className={classes.notification__content__settings__dateTime}>
              <p>Дата и время</p>
              <CustomDatePicker
                onChange={(value) => setValue("date", value.target.value)}
              />
              <CustomTimePicker onChange={(value) => setValue("time", value)} />
            </div>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <StepInput
                  labelName="Статус"
                  placeholder="Необходимо позвонить клиенту"
                  isAutoComplete={true}
                  options={[
                    {
                      value: "Необходимо позвонить клиенту",
                      label: "Необходимо позвонить клиенту",
                    },
                    { value: "Клиенту позвонили", label: "Клиенту позвонили" },
                    {
                      value: "Клиент не берет трубку",
                      label: "Клиент не берет трубку",
                    },
                  ]}
                  onChange={(value) => field.onChange(value.value)}
                />
              )}
            />
          </div>
          <div className={classes.notification__content__comments}>
            <HeaderTemplate children={"Комментарий"} />
            <div className={classes.notification__content__comments__content}>
              <p>Комментарий</p>

              <Controller
                name="comment"
                control={control}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    sx={{
                      width: "100%",
                      fontSize: "1.4rem",
                      "& .MuiFormLabel-root": {
                        fontSize: "1.4rem",
                      },
                      "& .MuiOutlinedInput-root": {
                        fontSize: "1.4rem",
                      },
                    }}
                    label="Введите комментарий"
                    size="small"
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              onClick={() => modal.hide()}
              type="reset"
              variant="outlined"
              color="error"
            >
              Отмена
            </Button>
            <Button type="submit" variant="contained">
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </ModalWindow>
  );
};

export default NiceModal.create(CreateNotificationModal);
