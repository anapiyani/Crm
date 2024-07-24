import ModalWindow from "@/components/modal-window/modal-window";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import classes from "./styles.module.scss";
import {
  Autocomplete,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

const EndureModal = () => {
  const modal = useModal();
  return (
    <ModalWindow
      title={"Внести деньги в кассу"}
      open={modal.visible}
      handleClose={() => modal.hide()}
      className={classes["u-p-0"]}
      titleStyles={{ fontSize: "2.4rem", color: "#2E7D32" }}
    >
      <div className={classes.modalContent}>
        <div className={classes.modalContent__content}>
          <div className={classes.modalContent__content__item}>
            <p>Назначение платежа</p>
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
                  label="Сервис клиента"
                />
              )}
            />
          </div>
          <div className={classes.modalContent__content__item}>
            <p>Комментарий</p>
            <TextField
              variant="outlined"
              sx={{ width: "280px" }}
              label="Введите комментарий"
            />
          </div>
        </div>
        <Divider />
        <div className={classes.modalContent__content}>
          <div className={classes.modalContent__content__item}>
            <p>Сумма</p>
            <TextField variant="outlined" label="Введите сумму" />
            <Button
              sx={{
                minWidth: "40px",
                width: "40px",
                marginLeft: "10px",
              }}
              variant="outlined"
            >
              +
            </Button>
            <Button
              sx={{
                minWidth: "40px",
                width: "40px",
              }}
              variant="outlined"
              color="error"
            >
              -
            </Button>
            <span>руб.</span>
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
        </div>
      </div>
    </ModalWindow>
  );
};

export default NiceModal.create(EndureModal);
