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
  const [salaryType, setSalaryType] = useState<"advance" | "salary">("salary");
  const { data: employeeData } = useQuery({
    queryKey: ["employeeData"],
    queryFn: () => searchEmployee({ role: "employee" }),
  });
  const [selectedEmployee, setSelectedEmployee] = useState<{
    label: string;
    value: number;
  } | null>(null);
  const [employeeInfo, setEmployeeInfo] = useState<IEmployeeWalletInfo>();
  const { register, handleSubmit, reset, control, watch, setValue, getValues } =
    useForm<ISalaryPayment>();
  const [payment, setPayment] = useState<
    { money_type: string; amount: string }[]
  >([]);

  const type = watch("type");

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
    { label: "Смешанная оплата", value: "mixed" },
  ];

  const modal = useModal();

  useEffect(() => {
    if (getValues("nuzhno_vyplatit") === "1") {
      employeeInfo?.amount_to_pay &&
        setValue("salary", employeeInfo.fixed_part_amount);
    } else if (getValues("nuzhno_vyplatit") === "2") {
      employeeInfo?.amount_to_pay &&
        setValue("salary", employeeInfo.floating_part_amount);
    } else if (getValues("nuzhno_vyplatit") === "3") {
      employeeInfo?.amount_to_pay &&
        setValue("salary", employeeInfo.client_development_amount);
    } else if (getValues("nuzhno_vyplatit") === "0") {
      employeeInfo?.amount_to_pay &&
        setValue("salary", employeeInfo.amount_to_pay);
    }
  }, [employeeInfo, getValues("nuzhno_vyplatit")]);

  const onSubmit: SubmitHandler<ISalaryPayment> = async (
    data: ISalaryPayment,
  ) => {
    const updatedData = { ...data, payment };
    if (updatedData.withdrawal_method === "mixed") {
      delete updatedData.withdrawal_method;
    }
    mutation.mutate(updatedData);
    reset();
    setPayment([]);
    handleCloseModal();
  };

  const handlePaymentChange = (moneyType: string, amount: string) => {
    setPayment((prevPayments) => {
      const existingPayment = prevPayments.find(
        (payment) => payment.money_type === moneyType,
      );
      if (existingPayment) {
        return prevPayments.map((payment) =>
          payment.money_type === moneyType ? { ...payment, amount } : payment,
        );
      } else {
        return [...prevPayments, { money_type: moneyType, amount }];
      }
    });
  };

  const withdrawalMethod = watch("withdrawal_method");
  const nuzhno_vyplatit = watch("nuzhno_vyplatit");

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
                  className={classes["u-w-ratio"]}
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
          <div
            className={classes.modalContent__content__item}
            style={{
              display: "flex",

              alignItems: "center",
            }}
          >
            <p
              style={{
                marginRight: "1rem",
                width: "33.33333% !important",

                textWrap: "wrap",
                maxLines: "2",
              }}
            >
              Дата последней выплаты
            </p>
            <p style={{ color: "#636B74" }}>
              {employeeInfo?.last_payment_date
                ? employeeInfo.last_payment_date
                : "Отсуствует"}
            </p>
          </div>
          <div
            className={classes.modalContent__content__item}
            style={{
              display: "flex",

              alignItems: "center",
            }}
          >
            <p style={{ width: "33.33333% !important", marginRight: "1.5rem" }}>
              Детали, штрафы, премии
            </p>
            <p>
              <Link to="/">Посмотреть</Link>
            </p>
          </div>
        </div>
        <Divider />
        <div className={classes.modalContent__content}>
          <div
            className={classes.modalContent__content__item}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p
              className={classes.nametext}
              style={{
                width: "33.33333% !important",
              }}
            >
              Тип выплаты
            </p>
            <div
              style={{
                width: "70%",
              }}
            >
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
                      onChange={(e) => {
                        setSalaryType(e.target.value as "advance" | "salary");
                        field.onChange(e.target.value);
                      }}
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
          </div>
          <div
            className={classes.modalContent__content__item}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {type === "advance" ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <p style={{ width: "33.333333%" }}>Нужно выплатить</p>
                <TextField
                  label="Сумма аванса"
                  placeholder="Сумма"
                  size="small"
                  sx={{
                    width: "79.5%",
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
              <div className={classes.modalContent__content__item}>
                <Controller
                  name="nuzhno_vyplatit"
                  control={control}
                  render={({ field }) => (
                    <CustomAutoComplete
                      className={classes["u-w-ratio"]}
                      {...field}
                      selectValue="label"
                      placeholder="Все начисления"
                      size="small"
                      label="Нужно выплатить"
                      options={[
                        { label: "Все начисления", value: "0" },
                        { label: "Фикс. часть", value: "1" },
                        { label: "Плав. часть", value: "2" },
                        { label: "Развитие кл.", value: "3" },
                      ]}
                      onChange={(value) => {
                        field.onChange(value?.value);
                      }}
                      value={
                        [
                          { label: "Все начисления", value: "0" },
                          { label: "Фикс. часть", value: "1" },
                          { label: "Плав. часть", value: "2" },
                          { label: "Развитие кл.", value: "3" },
                        ].find((option) => option.value === field.value) || null
                      }
                    />
                  )}
                />
                <p style={{ marginLeft: "20px" }}>
                  {nuzhno_vyplatit === "0"
                    ? employeeInfo?.amount_to_pay
                    : nuzhno_vyplatit === "1"
                      ? employeeInfo?.fixed_part_amount
                      : nuzhno_vyplatit === "2"
                        ? employeeInfo?.floating_part_amount
                        : nuzhno_vyplatit === "3"
                          ? employeeInfo?.client_development_amount
                          : ""}
                </p>
              </div>
            )}
          </div>
          <div className={classes.modalContent__content__item}>
            <Controller
              name="withdrawal_method"
              control={control}
              render={({ field }) => (
                <CustomAutoComplete
                  className={classes["u-w-ratio"]}
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
          {withdrawalMethod === "mixed" && (
            <div
              className={classes.modalContent__content__item}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  marginBottom: "1rem",
                }}
              >
                <p style={{ width: "33.333333%" }}>Наличными</p>
                <TextField
                  label="Сумма"
                  placeholder="Сумма"
                  size="small"
                  sx={{
                    width: "79.5%",
                    fontSize: "1.4rem",
                    "& .MuiFormLabel-root": {
                      fontSize: "1.4rem",
                    },
                    "& .MuiOutlinedInput-root": {
                      fontSize: "1.4rem",
                    },
                  }}
                  fullWidth
                  onChange={(e) => handlePaymentChange("cash", e.target.value)}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  marginBottom: "1rem",
                }}
              >
                <p style={{ width: "33.333333%" }}>По карте</p>
                <TextField
                  label="Сумма"
                  placeholder="Сумма"
                  size="small"
                  sx={{
                    width: "79.5%",
                    fontSize: "1.4rem",
                    "& .MuiFormLabel-root": {
                      fontSize: "1.4rem",
                    },
                    "& .MuiOutlinedInput-root": {
                      fontSize: "1.4rem",
                    },
                  }}
                  fullWidth
                  onChange={(e) => handlePaymentChange("card", e.target.value)}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <p style={{ width: "33.333333%" }}>Чеками</p>
                <TextField
                  label="Сумма"
                  placeholder="Сумма"
                  size="small"
                  sx={{
                    width: "79.5%",
                    fontSize: "1.4rem",
                    "& .MuiFormLabel-root": {
                      fontSize: "1.4rem",
                    },
                    "& .MuiOutlinedInput-root": {
                      fontSize: "1.4rem",
                    },
                  }}
                  fullWidth
                  onChange={(e) => handlePaymentChange("check", e.target.value)}
                />
              </div>
            </div>
          )}
          {salaryType === "salary" && (
            <div
              className={classes.modalContent__content__item}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p style={{ marginRight: "2rem", width: "33.33333%" }}>
                Дата выплаты
              </p>
              <div style={{ display: "flex", width: "88%" }}>
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
          )}

          <div className={classes.modalContent__content__item}>
            <Controller
              name="customer"
              control={control}
              render={({ field }) => (
                <CustomAutoComplete
                  className={classes["u-w-ratio"]}
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
