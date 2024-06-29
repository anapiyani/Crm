import TextField from "@mui/material/TextField";
import classes from "./styles.module.scss";
import icon from "@/assets/icons/icon_wise.svg";
import { Button, IconButton, InputAdornment } from "@mui/material";
import classNames from "classnames";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useLoginMutation } from "@/service/auth/auth.hook";

type TProps = {
  loginWPhone: () => void;
};

const EmailLogin = ({ loginWPhone }: TProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const mutation = useLoginMutation();

  const onLoginSubmit = () => {
    if (email === "" || password === "") {
      return;
    }
    mutation.mutate({ email, password });
  };

  const handleClickShowPassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      style={{ marginRight: 10 }}
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon style={{ fontSize: "2rem" }} />
                      ) : (
                        <VisibilityIcon style={{ fontSize: "2rem" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {mutation.isError && (
              <p className={classes["email__content__form__send__error"]}>
                Неверный логин или пароль
              </p>
            )}
            <Button
              variant="contained"
              sx={{ marginTop: "20px" }}
              className={classNames(
                classes["email__content__form__send__button"]
              )}
              onClick={onLoginSubmit}
              disabled={mutation.status === "pending"}
            >
              {mutation.status === "pending" ? "Загрузка..." : "Войти"}
            </Button>
            <p className={classes["email__content__form__send__choice"]}>Или</p>
            <Button
              variant="outlined"
              className={classes["email__content__form__send__button"]}
              onClick={loginWPhone}
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
