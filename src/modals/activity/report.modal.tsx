import ModalWindow from "@/components/modal-window/modal-window";
import HeaderTemplate from "@/pages/employees/salary/_components/MultiStepHeader/MultiStepHeader.component";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import classes from "./styles.module.scss";
import CustomDatePicker from "@/components/date-picker/date-picker-custom";
import StepInput from "@/pages/employees/salary/_components/step-input/step-input.component";
import { Button, IconButton } from "@mui/material";
import { Add, Clear, Delete, Done } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { IReviewFeedback } from "@/ts/activity.interface";
import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchEmployee } from "@/service/employee/employee.service";
import CustomAutoComplete from "@/components/autocomplete/custom-autocomplete.component";
import { useReport } from "@/service/activity/activity.hook";

const ReportModal = () => {
  const mutation = useReport();
  const { register, handleSubmit, setValue, control } =
    useForm<IReviewFeedback>();
  const modal = useModal();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { data: employeeData } = useQuery({
    queryKey: ["employeeData"],
    queryFn: () => searchEmployee({ role: "employee" }),
  });

  const onSubmit = (data: IReviewFeedback) => {
    const formData = new FormData();
    if (selectedFile) {
      formData.append("scan_complaint", selectedFile);
    }

    formData.append("text_complaint", data.text_complaint!);
    formData.append("user", data.user.toString());
    formData.append("date", data.date);
    formData.append("status", "review");
    formData.append("time", "00:00");

    mutation.mutate(formData);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
    }
  };

  const handleAddFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const employeeOptions = employeeData?.results.map((item) => ({
    label: item.first_name + " " + item.last_name,
    value: item.user_id,
  }));

  const handleCloseModal = () => {
    modal.hide();
  };

  return (
    <ModalWindow
      title={"Создание жалобы"}
      titleStyles={{ fontSize: "2.4rem" }}
      open={modal.visible}
      className={classes["u-p-0"]}
      handleClose={() => {
        modal.hide();
      }}
      withButtons={false}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.info}>
          <HeaderTemplate children={"Общая информация"} />
          <div className={classes.info__content}>
            <div className={classes.info__content__date}>
              <p>Дата подачи</p>{" "}
              <CustomDatePicker
                onChange={(e) => {
                  setValue("date", e.target.value);
                }}
              />
            </div>
            <div className={classes.info__content__status}>
              <p>Статус</p> <p className={classes.link}>Рассматривается</p>
            </div>
          </div>
        </div>
        <div className={classes.info}>
          <HeaderTemplate children={"Жалоба"} />
          <div className={classes.info__content}>
            <div className={classes.info__content}>
              <div className={classes.info__content__date}>
                <Controller
                  name="user"
                  control={control}
                  render={({ field }) => (
                    <CustomAutoComplete
                      sx={{ width: "240px" }}
                      {...field}
                      selectValue="label"
                      placeholder="Имя Фамилия, Администратор"
                      size="small"
                      label="Сотрудник"
                      options={employeeOptions || []}
                      onChange={(value) => {
                        field.onChange(value?.value);
                      }}
                      value={
                        employeeOptions?.find(
                          (option) => option.value === field.value
                        ) || null
                      }
                    />
                  )}
                />
              </div>
              <div className={classes.info__content__status}>
                <p>Скан отзыва</p>
                {selectedFile ? (
                  <div className={classes.selectedFile}>
                    <span>{selectedFile.name}</span>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={handleRemoveFile}
                    >
                      <Delete />
                    </IconButton>
                  </div>
                ) : (
                  <>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileUpload}
                    />
                    <Button
                      variant="outlined"
                      startIcon={<Add />}
                      onClick={handleAddFileClick}
                    >
                      Добавить файлы
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={classes.info}>
          <HeaderTemplate children={"Текст отзыва"} />
          <textarea
            placeholder="Введите текст отзыва"
            className={classes.info__textarea}
            {...register("text_complaint")}
          />
        </div>
        <div className={classes["buttons"]}>
          <Button
            variant="outlined"
            onClick={handleCloseModal}
            startIcon={<Clear />}
          >
            Отменить
          </Button>
          <Button
            variant="contained"
            disableElevation
            startIcon={<Done />}
            type="submit"
          >
            Сохранить
          </Button>
        </div>
      </form>
    </ModalWindow>
  );
};

export default NiceModal.create(ReportModal);
