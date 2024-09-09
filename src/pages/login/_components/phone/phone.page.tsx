import { useState } from "react";
import { usePhoneLoginMutation } from "@/service/auth/auth.hook";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Button, TextField, InputAdornment, Alert } from "@mui/material";
import InputMask from "react-input-mask";
import icon from "@/assets/icons/icon_wise.svg";
import flagIcon from "@/assets/icons/Flags.svg";
import classes from "./styles.module.scss";

type TProps = {
  loginWEmail: () => void;
};

const PhoneLogin = (props: TProps) => {
  const [phoneNumber, onPhoneChange] = useState<string>("7");
  const [openVerify, setOpenVerify] = useState<boolean>(false);
  const [otp, setOtp] = useState("");
  const { mutation } = usePhoneLoginMutation();

  const handleChange = (newValue: string) => {
    setOtp(newValue);
  };

  const onSubmitPhone = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const phone = phoneNumber.replace(/[()\s-+]+/g, "");
    if (phoneNumber === "") {
      return;
    }
    mutation.mutate({ phone });
    if (mutation.isSuccess) {
      setOpenVerify(true);
    } else {
      console.log(phone);
    }
  };

  const onSubmitOtp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(otp);
  };

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
        <div className={classes["phone__content__form"]}>
          <div className={classes["phone__content__form__form_header"]}>
            <p>Вход по номеру телефона</p>
            {openVerify ? <p>Введите код из SMS</p> : ""}
            <hr />
          </div>
          {openVerify ? (
            <form
              onSubmit={(e) => onSubmitOtp(e)}
              className={classes["phone__content__form__send"]}
            >
              <MuiOtpInput
                sx={{
                  "& .MuiOtpInput-TextField": {
                    fontSize: "3.2rem",
                    "& .MuiOutlinedInput-root": {
                      fontSize: "1.6rem",
                    },
                  },
                }}
                length={6}
                value={otp}
                onChange={handleChange}
              />
              <Button
                sx={{ marginTop: "20px" }}
                className={classes["phone__content__form__send__button"]}
                variant="contained"
                type="submit"
              >
                Зарегистрироваться
              </Button>
              <p className={classes["phone__content__form__send__choice"]}>
                Или
              </p>
              <Button
                variant="outlined"
                className={classes["phone__content__form__send__button"]}
                onClick={props.loginWEmail}
              >
                Войти по электронной почте
              </Button>
            </form>
          ) : (
            <form
              onSubmit={(e) => onSubmitPhone(e)}
              className={classes["phone__content__form__send"]}
            >
              <InputMask
                mask="+7 (999) 999 9999"
                value={phoneNumber}
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
              {mutation.isError ? (
                <Alert sx={{ marginTop: 1, fontSize: 16 }} severity="error">
                  Неправильный номер, попробуйте еще раз
                </Alert>
              ) : (
                ""
              )}
              <Button
                sx={{ marginTop: "20px" }}
                className={classes["phone__content__form__send__button"]}
                variant="contained"
                type="submit"
                disabled={mutation.status === "pending"}
              >
                {mutation.status === "pending"
                  ? "Загрузка..."
                  : "Подтвердить номер"}
              </Button>
              <p className={classes["phone__content__form__send__choice"]}>
                Или
              </p>
              <Button
                variant="outlined"
                className={classes["phone__content__form__send__button"]}
                onClick={props.loginWEmail}
              >
                Войти по электронной почте
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhoneLogin;
