import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import classes from "./styles.module.scss";

const NotFound = () => {
  return (
    <div className={classes["not-found"]}>
      <div className={classes["not-found__content"]}>
        <div className={classes["not-found__content__texts"]}>
          <h1>404 — страница не найдена</h1>
          <p>Нам не удалось найти эту страницу. Попробуйте войти в систему</p>
          <Link to="/">
            <Button variant="contained">Главная</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
