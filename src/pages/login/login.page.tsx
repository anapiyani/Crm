import EmailLogin from "./_components/email/email.page";
import PhoneLogin from "./_components/phone/phone.page";
import classes from "./styles.module.scss";
import eyes from "@/assets/images/background-image.svg";

const LoginPage = () => {
  return (
    <div className={classes["login"]}>
      <div className={classes["login__content"]}>
        <div className={classes["login__content__auth"]}>
          {/* <EmailLogin /> */}
          <PhoneLogin />
        </div>
        <div className={classes["login__content__image"]}>
          <img
            src={eyes}
            alt="eyes"
            className={classes["login__content__image__img"]}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
