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
            <p>Сотрудник</p>
            <Autocomplete
              sx={{ width: "280px" }}
              options={[
                { label: "Option 1", value: "1" },
                { label: "Option 2", value: "2" },
                { label: "Option 3", value: "3" },
              ]}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  label="Имя Фамилия, Администратор"
                />
              )}
            />
          </div>
          <div className={classes.modalContent__content__item}>
            <p>Дата последней выплаты</p>
            <p style={{ color: "#636B74" }}>Отсутствует</p>
          </div>
          <div className={classes.modalContent__content__item}>
            <p>Детали, штрафы, премии</p>
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
            <p>Нужно выплатить</p>
            <Autocomplete
              sx={{ width: "230px", marginRight: "2rem" }}
              options={[
                { label: "Option 1", value: "1" },
                { label: "Option 2", value: "2" },
                { label: "Option 3", value: "3" },
              ]}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Все начисления"
                  variant="outlined"
                />
              )}
            />
            <span>руб.</span>
          </div>
          <div className={classes.modalContent__content__item}>
            <p>Дата выплаты</p>
            <div style={{ display: "flex" }}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="11.07.2024"
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
              <TextField
                variant="outlined"
                size="small"
                placeholder="11.07.2024"
              />
            </div>
          </div>
          <div className={classes.modalContent__content__item}>
            <p>Метод снятия</p>
            <Autocomplete
              sx={{ width: "280px" }}
              options={[
                { label: "Option 1", value: "1" },
                { label: "Option 2", value: "2" },
                { label: "Option 3", value: "3" },
              ]}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField variant="outlined" {...params} label="Наличными" />
              )}
            />
          </div>
          <div className={classes.modalContent__content__item}>
            <p>Юр. лицо</p>
            <Autocomplete
              sx={{ width: "280px" }}
              options={[
                { label: "Option 1", value: "1" },
                { label: "Option 2", value: "2" },
                { label: "Option 3", value: "3" },
              ]}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  label="Выберите вариант"
                />
              )}
            />
          </div>
        </div>
      </div>
    </ModalWindow>
  );
};

export default NiceModal.create(SalaryModal);
