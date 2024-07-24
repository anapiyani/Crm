import ModalWindow from "@/components/modal-window/modal-window";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import classes from "./styles.module.scss";
import {
  Autocomplete,
<<<<<<< HEAD
<<<<<<< HEAD
  Button,
=======
>>>>>>> 3c7938a (Feat: Added modal for withdraw money from cash reg)
=======
  Button,
>>>>>>> 2328448 (Feat: Added endure money modal from cash desk)
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import CustomAutoComplete from "@/components/autocomplete/custom-autocomplete.component";

const WithdrawModal = () => {
  const modal = useModal();
  return (
    <ModalWindow
      title={"Снять деньги из кассы"}
      open={modal.visible}
      handleClose={() => modal.hide()}
      className={classes["u-p-0"]}
      titleStyles={{ fontSize: "2.4rem", color: "#C41C1C" }}
    >
      <div className={classes.modalContent}>
        <div className={classes.modalContent__content}>
          <div className={classes.modalContent__content__item}>
            <CustomAutoComplete
              name="service"
              selectValue={"label"}
              placeholder="Сервис клиента"
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2328448 (Feat: Added endure money modal from cash desk)
            <TextField variant="outlined" label="Введите сумму" />
=======
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
>>>>>>> 1ebbff2 (Fix: fixed autocpmlete)
            <Button
              sx={{
                minWidth: "40px",
                width: "40px",
                marginLeft: "10px",
              }}
<<<<<<< HEAD
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
=======
            <TextField
              variant="outlined"
              style={{ marginRight: 20 }}
              label="Введите сумму"
            />
>>>>>>> 3c7938a (Feat: Added modal for withdraw money from cash reg)
=======
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
>>>>>>> 2328448 (Feat: Added endure money modal from cash desk)
            <span>руб.</span>
          </div>
          <div className={classes.modalContent__content__item}>
            <CustomAutoComplete
              sx={{ width: "280px" }}
              name="method"
              selectValue={"label"}
              placeholder="Наличными"
              size="small"
              label="Метод снятия"
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

export default NiceModal.create(WithdrawModal);
