import TextField from "@mui/material/TextField";
import classes from "./styles.module.scss";
import icon from "@/assets/icons/icon_wise.svg";
import { Button } from "@mui/material";
import classNames from "classnames";

const EmailLogin = () => {
  return (
    <div className={classes["email"]}>
      <div className={classes["email__content"]}>
        <div className={classes["email__content__header"]}>
          <img
            src={icon}
            className={classes["email__content__header__icon"]}
            alt="icon"
          />
          <h1 className={classes["email__content__header__text"]}>
            С возвращением!
          </h1>
        </div>
        <form className={classes["email__content__form"]}>
          <div className={classes["email__content__form__form_header"]}>
            <p>Вход по электронной почте</p>
            <hr />
          </div>
          <div className={classes["email__content__form__send"]}>
            <TextField
              id="outlined-basic"
              label="Электронная почта"
              variant="outlined"
              sx={{
                fontSize: "1.6rem",
                marginBottom: "1.4rem",
                "& .MuiFormLabel-root": {
                  fontSize: "1.6rem",
                },
                ".MuiOutlinedInput-root": {
                  fontSize: "1.6rem",
                },
              }}
              className={classes["email__content__form__send__input"]}
            />
            <TextField
              id="outlined-basic"
              label="Пароль"
              variant="outlined"
              sx={{
                fontSize: "1.6rem",
                "& .MuiFormLabel-root": {
                  fontSize: "1.6rem",
                },
                ".MuiOutlinedInput-root": {
                  fontSize: "1.6rem",
                },
              }}
              className={classes["email__content__form__send__input"]}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{ marginTop: "20px" }}
              className={classNames(
                classes["email__content__form__send__button"]
              )}
            >
              Войти
            </Button>
            <p className={classes["email__content__form__send__choice"]}>Или</p>
            <Button
              variant="outlined"
              className={classes["email__content__form__send__button"]}
            >
              Войти по номеру телефона
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailLogin;
