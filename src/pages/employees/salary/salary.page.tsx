import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import classes from "./salary.module.scss";
import { Button, Divider } from "@mui/material";
import { Add } from "@mui/icons-material";
import StepForm from "./_components/stepform/stepform.component";

const SalaryPage = () => {
  return (
    <div className={classes.salary}>
      <BreadcrumbsCustom />
      <div className={classes.salary__header}>
        <h1>Редактирование шаблонов зарплаты</h1>
      </div>
      <div className={classes.salary__content}>
        <div className={classes.salary__content__list}>
          <div className={classes.salary__content__list__header}>
            <h3>Список шаблонов</h3>
            <Divider />
          </div>
          <div className={classes.salary__content__list__items}>
            {/* list items */}
            <div className={classes.salary__content__list__items__item}>
              <div
                className={classes.salary__content__list__items__item__header}
              >
                <h2>Производственный персонал</h2>
                <Button startIcon={<Add />}>Добавить</Button>
              </div>
              <Divider />
              <div
                className={classes.salary__content__list__items__item__content}
              >
                <Button className={classes["selected"]}>Мастера</Button>
              </div>
            </div>
            <div className={classes.salary__content__list__items__item}>
              <div
                className={classes.salary__content__list__items__item__header}
              >
                <h2>Менеджмент</h2>
                <Button startIcon={<Add />}>Добавить</Button>
              </div>
              <Divider />
              <div
                className={classes.salary__content__list__items__item__content}
              >
                <Button>Директор</Button>
              </div>
            </div>
            <div className={classes.salary__content__list__items__item}>
              <div
                className={classes.salary__content__list__items__item__header}
              >
                <h2>Администратор</h2>
                <Button startIcon={<Add />}>Добавить</Button>
              </div>
              <Divider />

              <div
                className={classes.salary__content__list__items__item__content}
              >
                <Button>Администратор</Button>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.salary__content__settings}>
          <div className={classes.salary__content__list__header}>
            <h3>Настройки шаблона</h3>
            <Divider />
          </div>
          <StepForm />
        </div>
      </div>
    </div>
  );
};

export default SalaryPage;
