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
import CustomAutoComplete from "@/components/autocomplete/custom-autocomplete.component";

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
            <CustomAutoComplete
              name="service"
              selectValue={"label"}
              placeholder="Внести средства из прибыли"
              size="small"
              label="Назначение платежа"
              options={[
                { label: "Option 1", value: "1" },
                { label: "Option 2", value: "2" },
                { label: "Option 3", value: "3" },
              ]}
            />
          </div>
          <div className={classes.modalContent__content__item}>
            <p>Комментарий</p>
            <TextField
              variant="outlined"
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
              label="Введите комментарий"
              size="small"
            />
          </div>
        </div>
        <Divider />
        <div className={classes.modalContent__content}>
          <div className={classes.modalContent__content__item}>
            <p>Сумма</p>
            <TextField
              variant="outlined"
              label="Введите сумму"
              size="small"
              sx={{
                fontSize: "1.4rem",
                "& .MuiFormLabel-root": {
                  fontSize: "1.4rem",
                },
                "& .MuiOutlinedInput-root": {
                  fontSize: "1.4rem",
                },
              }}
            />
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
            <CustomAutoComplete
              sx={{ width: "280px" }}
              name="method"
              selectValue={"label"}
              placeholder="Наличными"
              size="small"
              label="Метод внесения"
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

export default NiceModal.create(EndureModal);
