import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import { Button, Divider } from "@mui/material";
import classes from "./styles.module.scss";

const StorageSettings = () => {
  return (
    <div className={classes["settings"]}>
      <BreadcrumbsCustom />
      <div className={classes["settings__content"]}>
        <div className={classes["settings__content__storages"]}>
          <div className={classes["settings__content__storages__header"]}>
            <h1>Склады</h1> <Button>+ Добавить</Button>
          </div>
          <Divider />
          <div className={classes["settings__content__storages__items"]}>
            <ul>
              <li>
                <Button>
                  <p>Склад</p> <span>Только хранение</span>
                </Button>
              </li>
            </ul>
          </div>
        </div>
        <div className={classes["settings__content__storages"]}>
          <div className={classes["settings__content__storages__header"]}>
            <h1>Информация</h1>
          </div>
          <Divider />
          <div className={classes["settings__content__storages__items"]}>
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

export default StorageSettings;
