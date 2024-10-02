import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, IconButton, InputAdornment, Alert } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useLoginMutation } from "@/service/auth/auth.hook";
import icon from "@/assets/icons/icon_wise.svg";
import classNames from "classnames";
import CustomTextField from "@/components/textField/textField.component";
import classes from "./styles.module.scss";

type TProps = {
  loginWPhone: () => void;
};

const EmailLogin = ({ loginWPhone }: TProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const mutation = useLoginMutation();

  const onLoginSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
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
            <CustomTextField
              type="email"
              id="email-input"
              name="email"
              label="Электронная почта"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
                if (mutation.isError) {
                  mutation.reset();
                }
              }}
              sx={{
                fontSize: "1.6rem",
                "& .MuiFormLabel-root": {
                  fontSize: "1.6rem",
                },
                ".MuiOutlinedInput-root": {
                  fontSize: "1.6rem",
                },
              }}
            />
            <TextField
              id="outlined-basic"
              label="Пароль"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={password}
              sx={{
                fontSize: "1.6rem",
                "& .MuiFormLabel-root": {
                  fontSize: "1.6rem",
                },
                ".MuiOutlinedInput-root": {
                  fontSize: "1.6rem",
                },
              }}
              onChange={(e) => {
                setPassword(e.target.value);
                if (mutation.isError) {
                  mutation.reset();
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {mutation.isError ? (
              <Alert sx={{ fontSize: 14 }} severity="error">
                Неправильный email или пароль, попробуйте еще раз
              </Alert>
            ) : (
              ""
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
function useEffect(arg0: () => void) {
  throw new Error("Function not implemented.");
}
