import { Button, Divider } from "@mui/material";
import classes from "./styles.module.scss";
import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";

const Department = () => {
  const departments = [
    {
      count: 1,
      next: null,
      previous: null,
      results: [
        {
          id: 1,
          name: "Ресепшн",
          warehouse: 1,
        },
      ],
    },
    {
      count: 2,
      next: null,
      previous: null,
      results: [
        {
          id: 2,
          name: "Парикмахерский зал",
          warehouse: 1,
        },
      ],
    },
    {
      count: 2,
      next: null,
      previous: null,
      results: [
        {
          id: 2,
          name: "Косметология",
          warehouse: 1,
        },
      ],
    },
  ];

  return (
    <div className={classes["department"]}>
      <div className={classes["department__header"]}>
        <BreadcrumbsCustom />
        <h1>Отделы - Редактирование должности</h1>
      </div>
      <div className={classes["department__content"]}>
        <div className={classes["department__content__column"]}>
          <div className={classes["department__content__column__header"]}>
            <h2>Отделы</h2>
            <Divider />
          </div>
          <div className={classes["department__content__column__items"]}>
            <ul>
              {departments.map((item) => (
                <li>
                  <Button>{item.results[0].name}</Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Department;
