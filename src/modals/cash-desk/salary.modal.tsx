import CustomAutoComplete from "@/components/autocomplete/custom-autocomplete.component";
import CustomDatePicker from "@/components/date-picker/date-picker-custom";
import ModalWindow from "@/components/modal-window/modal-window";
import { searchEmployee } from "@/service/employee/employee.service";
import { useSalary } from "@/service/kassa/kassa.hook";
import { getEmployeeSalaryWallet } from "@/service/kassa/kassa.service";
import { IEmployeeWalletInfo, ISalaryPayment } from "@/ts/kassa.interface";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Clear, Done } from "@mui/icons-material";
import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import classes from "./styles.module.scss";

const SalaryModal: React.FC = () => {
  const mutation = useSalary();
  const { data: employeeData } = useQuery({
    queryKey: ["employeeData"],
    queryFn: () => searchEmployee({ role: "employee" }),
  });
  const [selectedEmployee, setSelectedEmployee] = useState<{
    label: string;
    value: number;
  } | null>(null);
  const [employeeInfo, setEmployeeInfo] = useState<IEmployeeWalletInfo>();
  const { register, handleSubmit, reset, control, watch } =
    useForm<ISalaryPayment>();

  const type = watch("type");

  const onSubmit: SubmitHandler<ISalaryPayment> = async (
    data: ISalaryPayment,
  ) => {
    await mutation.mutate(data);
    reset();
    handleCloseModal();
  };

  const employeeOptions = employeeData?.results.map((item) => ({
    label: item.first_name + " " + item.last_name,
    value: item.user_id,
  }));

  useEffect(() => {
    if (selectedEmployee) {
      const fetchEmployeeInfo = async () => {
        const resultEmployee = await getEmployeeSalaryWallet(
          selectedEmployee.value,
        );
        setEmployeeInfo(resultEmployee);
      };
      fetchEmployeeInfo();
    }
  }, [selectedEmployee]);

  const handleCloseModal = () => {
    modal.hide();
  };

  const autoArray = [
    { label: "Оплата наличными", value: "cash" },
    { label: "Оплата по карте", value: "card" },
    { label: "Оплата чеками", value: "check" },
    { label: "С расчетного счета", value: "salary_advance" },
  ];

  const modal = useModal();
  return (
    <ModalWindow
      title={"Выплата зарплаты сотруднику"}
      open={modal.visible}
      handleClose={() => modal.hide()}
      className={classes["u-p-0"]}
      titleStyles={{ fontSize: "2.4rem" }}
      withButtons={false}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={classes.modalContent}>
        <div className={classes.modalContent__content}>
          <div className={classes.modalContent__content__item}>
            <Controller
              name="employee"
              control={control}
              render={({ field }) => (
                <CustomAutoComplete
                  {...field}
                  selectValue="label"
                  placeholder="Имя Фамилия, Администратор"
                  size="small"
                  label="Сотрудник"
                  options={employeeOptions || []}
                  onChange={(value) => {
                    setSelectedEmployee(value);
                    field.onChange(value?.value);
                  }}
                  value={
                    employeeOptions?.find(
                      (option) => option.value === field.value,
                    ) || null
                  }
                />
              )}
            />
          </div>
          <div className={classes.modalContent__content__item}>
            <p style={{ marginRight: "3rem" }}>Дата последней выплаты</p>
            <p style={{ color: "#636B74" }}>
              {employeeInfo?.last_payment_date
                ? employeeInfo.last_payment_date
                : "Отсуствует"}
            </p>
          </div>
          <div className={classes.modalContent__content__item}>
            <p style={{ marginRight: "3rem" }}>Детали, штрафы, премии</p>
            <p>
              <Link to="/">Посмотреть</Link>
            </p>
          </div>
        </div>
        <Divider />
        <div className={classes.modalContent__content}>
          <div className={classes.modalContent__content__item}>
            <p className={classes.nametext}>Тип выплаты</p>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <FormControl component="fieldset">
                  <RadioGroup
                    {...field}
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="type"
                    row
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    <FormControlLabel
                      value="salary"
                      control={<Radio size="medium" />}
                      label="Зарплата."
                    />
                    <FormControlLabel
                      value="advance"
                      control={<Radio />}
                      label="Аванс."
                    />
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>
          <div className={classes.modalContent__content__item}>
            {type === "advance" ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p style={{ marginRight: "20px" }}>Нужно выплатить</p>
                <TextField
                  label="Сумма аванса"
                  placeholder="Сумма"
                  size="small"
                  sx={{
                    width: "290px",
                    fontSize: "1.4rem",
                    "& .MuiFormLabel-root": {
                      fontSize: "1.4rem",
                    },
                    "& .MuiOutlinedInput-root": {
                      fontSize: "1.4rem",
                    },
                  }}
                  fullWidth
                  {...register("salary")}
                />
              </div>
            ) : (
              <Controller
                name="salary"
                control={control}
                render={({ field }) => (
                  <CustomAutoComplete
                    {...field}
                    selectValue="label"
                    placeholder="Все начисления"
                    size="small"
                    label="Нужно выплатить"
                    options={[
                      { label: "Option 1", value: "1" },
                      { label: "Option 2", value: "2" },
                      { label: "Option 3", value: "3" },
                    ]}
                    onChange={(value) => {
                      field.onChange(value?.value);
                    }}
                    value={
                      [
                        { label: "Option 1", value: "1" },
                        { label: "Option 2", value: "2" },
                        { label: "Option 3", value: "3" },
                      ].find((option) => option.value === field.value) || null
                    }
                  />
                )}
              />
            )}
          </div>
          <div className={classes.modalContent__content__item}>
            <Controller
              name="withdrawal_method"
              control={control}
              render={({ field }) => (
                <CustomAutoComplete
                  {...field}
                  selectValue="label"
                  placeholder="Наличными"
                  size="small"
                  label="Метод снятия"
                  options={autoArray}
                  onChange={(value) => {
                    field.onChange(value?.value);
                  }}
                  value={
                    autoArray.find((option) => option.value === field.value) ||
                    null
                  }
                />
              )}
            />
          </div>
          <div className={classes.modalContent__content__item}>
            <p style={{ marginRight: "2rem" }}>Дата выплаты</p>
            <div style={{ display: "flex" }}>
              <Controller
                name="date_from"
                control={control}
                render={({ field }) => <CustomDatePicker {...field} />}
              />
              <p
                style={{
                  width: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                -
              </p>
              <Controller
                name="date_to"
                control={control}
                render={({ field }) => <CustomDatePicker {...field} />}
              />
            </div>
          </div>
          <div className={classes.modalContent__content__item}>
            <Controller
              name="customer"
              control={control}
              render={({ field }) => (
                <CustomAutoComplete
                  {...field}
                  selectValue="label"
                  placeholder="Юридическое лицо"
                  size="small"
                  label="Сотрудник"
                  options={employeeOptions || []}
                  onChange={(value) => {
                    setSelectedEmployee(value);
                    field.onChange(value?.value);
                  }}
                  value={
                    employeeOptions?.find(
                      (option) => option.value === field.value,
                    ) || null
                  }
                />
              )}
            />
          </div>
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
            Выплатить зарплату
          </Button>
        </div>
      </form>
    </ModalWindow>
  );
};

export default NiceModal.create(SalaryModal);
