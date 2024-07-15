import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import { Button, Divider } from "@mui/material";
import classes from "./styles.module.scss";

const EmployeeCabinet = () => {
  return (
    <div className={classes["main"]}>
      <BreadcrumbsCustom />
      <div className={classes["main__content"]}>
        <div className={classes["main__content__storages"]}>
          <div className={classes["main__content__storages__header"]}>
            <h1>Склады</h1> <Button>+ Добавить</Button>
          </div>
          <Divider />
          <div className={classes["main__content__storages__items"]}>
            <ul>
              <li>
                <Button>
                  <p>Склад</p> <span>Только хранение</span>
                </Button>
              </li>
            </ul>
          </div>
        </div>
        <div className={classes["main__content__storages"]}>
          <div className={classes["main__content__storages__header"]}>
            <h1>Информация</h1>
          </div>
          <Divider />
          <div className={classes["main__content__storages__items"]}>
            <ul>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
                eligendi ratione consequuntur.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCabinet;
