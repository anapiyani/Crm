import { Button, TextField, InputAdornment } from "@mui/material";
import classes from "./styles.module.scss";
import InputMask from "react-input-mask";
import icon from "@/assets/icons/icon_wise.svg";
import flagIcon from "../../../../assets/icons/Flags.svg"; // Adjust the path as necessary
import { useState } from "react";

type TProps = {
  loginWEmail: () => void;
};

const PhoneLogin = (props: TProps) => {
  const [phone, onPhoneChange] = useState<string>("7 7");

  return (
    <div className={classes["phone"]}>
      <div className={classes["phone__content"]}>
        <div className={classes["phone__content__header"]}>
          <img
            src={icon}
            className={classes["phone__content__header__icon"]}
            alt="icon"
          />
          <h1 className={classes["phone__content__header__text"]}>
            С возвращением!
          </h1>
        </div>
        <form className={classes["phone__content__form"]}>
          <div className={classes["phone__content__form__form_header"]}>
            <p>Вход по номеру телефона</p>
            <hr />
          </div>
          <div className={classes["phone__content__form__send"]}>
            <InputMask
              mask="+9 (999) 999 9999"
              value={phone}
              disabled={false}
              maskChar=" "
              onChange={(e: any) => onPhoneChange(e.target.value)}
            >
              {() => (
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  sx={{
                    fontSize: "1.6rem",
                    "& .MuiFormLabel-root": {
                      fontSize: "1.6rem",
                    },
                    "& .MuiOutlinedInput-root": {
                      fontSize: "1.6rem",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img
                          src={flagIcon}
                          alt="Flag"
                          style={{ width: 24, height: 24 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            </InputMask>
            <Button
              sx={{ marginTop: "20px" }}
              className={classes["phone__content__form__send__button"]}
              variant="contained"
            >
              Подтвердить номер
            </Button>
            <p className={classes["phone__content__form__send__choice"]}>Или</p>
            <Button
              variant="outlined"
              className={classes["phone__content__form__send__button"]}
              onClick={props.loginWEmail}
            >
              Войти по электронной почте
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PhoneLogin;
