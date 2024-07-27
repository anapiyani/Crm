import { useEffect, useState } from "react";
import ModalWindow from "@/components/modal-window/modal-window";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import classes from "./styles.module.scss";
import {
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Link } from "react-router-dom";
import CustomAutoComplete from "@/components/autocomplete/custom-autocomplete.component";
import CustomDatePicker from "@/components/date-picker/date-picker-custom";
import { useQuery } from "@tanstack/react-query";
import { searchEmployee } from "@/service/employee/employee.service";
import { getEmployeeSalaryWallet } from "@/service/kassa/kassa.service";
import { IEmployeeWalletInfo } from "@/ts/kassa.interface";

const SalaryModal = () => {
  const { data: employeeData } = useQuery({
    queryKey: ["employeeData"],
    queryFn: () => searchEmployee({ role: "employee" }),
  });
  const [selectedEmployee, setSelectedEmployee] = useState<{
    label: string;
    value: number;
  } | null>(null);
  const [employeeInfo, setEmployeeInfo] = useState<IEmployeeWalletInfo>();

  const employeeOptions = employeeData?.results.map((item) => ({
    label: item.first_name + " " + item.last_name,
    value: item.user_id,
  }));

  useEffect(() => {
    if (selectedEmployee) {
      const fetchEmployeeInfo = async () => {
        const resultEmployee = await getEmployeeSalaryWallet(
          selectedEmployee.value
        );
        setEmployeeInfo(resultEmployee);
      };
      fetchEmployeeInfo();
    }
  }, [selectedEmployee]);

  console.log(selectedEmployee);

  const modal = useModal();
  return (
    <ModalWindow
      title={"Выплата зарплаты сотруднику"}
      open={modal.visible}
      handleClose={() => modal.hide()}
      className={classes["u-p-0"]}
      titleStyles={{ fontSize: "2.4rem" }}
    >
      <div className={classes.modalContent}>
        <div className={classes.modalContent__content}>
          <div className={classes.modalContent__content__item}>
            <CustomAutoComplete
              name="service"
              selectValue={"label"}
              placeholder="Имя Фамилия, Администратор"
              size="small"
              label="Сотрудник"
              options={employeeOptions || []}
              onChange={(value) => setSelectedEmployee(value)}
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
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="type"
                row
              >
                <FormControlLabel
                  value="salary"
                  control={<Radio size="medium" />}
                  label="Зарплата."
                />
                <FormControlLabel
                  value="avance"
                  control={<Radio />}
                  label="Аванс."
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className={classes.modalContent__content__item}>
            <CustomAutoComplete
              name="service"
              selectValue={"label"}
              placeholder="Все начисления"
              size="small"
              label="Нужно выплатить"
              sx={{ marginRight: "2rem" }}
              options={[
                { label: "Option 1", value: "1" },
                { label: "Option 2", value: "2" },
                { label: "Option 3", value: "3" },
              ]}
            />
            <span>руб.</span>
          </div>
          <div className={classes.modalContent__content__item}>
            <p style={{ marginRight: "2rem" }}>Дата выплаты</p>
            <div style={{ display: "flex" }}>
              <CustomDatePicker />
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
              <CustomDatePicker />
            </div>
          </div>
          <div className={classes.modalContent__content__item}>
            <CustomAutoComplete
              name="service"
              selectValue={"label"}
              placeholder="Наличными"
              size="small"
              label="Метод снятия"
              options={[
                { label: "Оплата наличными", value: "cash" },
                { label: "Оплата по карте", value: "card" },
                { label: "Оплата чеками", value: "check" },
                { label: "С расчетного счета", value: "checking_account" },
              ]}
            />
          </div>
          <div className={classes.modalContent__content__item}>
            <CustomAutoComplete
              name="service"
              selectValue={"label"}
              placeholder="Выберите вариант"
              size="small"
              label="Юр. лицо"
              options={[
                { label: "Option 1", value: "1" },
                { label: "Option 2", value: "2" },
                { label: "Option 3", value: "3" },
              ]}
            />
          </div>
        </div>
      </div>
    </ModalWindow>
  );
};

export default NiceModal.create(SalaryModal);
