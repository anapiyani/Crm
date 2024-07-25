import ModalWindow from "@/components/modal-window/modal-window";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import classes from "./styles.module.scss";
import {
  Autocomplete,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import CustomAutoComplete from "@/components/autocomplete/custom-autocomplete.component";
import CustomDatePicker from "@/components/date-picker/date-picker-custom";

const SalaryModal = () => {
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
              options={[
                { label: "Option 1", value: "1" },
                { label: "Option 2", value: "2" },
                { label: "Option 3", value: "3" },
              ]}
            />
          </div>
          <div className={classes.modalContent__content__item}>
            <p style={{ marginRight: "3rem" }}>Дата последней выплаты</p>
            <p style={{ color: "#636B74" }}>Отсутствует</p>
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
                { label: "Оплата чеками", value: "checking_account" },
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
