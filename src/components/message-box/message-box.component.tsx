import dayjs from "dayjs";
import classes from "./styles.module.scss";

type TProps = {
  start_time: string;
  end_time: string;
  user_first_name: string;
  user_last_name: string;
  service: string;
  phone?: string;
  employee_first_name: string;
  employee_last_name: string;
  status: string;
};

const MessageBox = (props: TProps) => {
  return (
    <div className={classes.box}>
      <div className={classes.box__header}>
        <p>
          {dayjs(`${dayjs().format("YYYY-MM-DD")}T${props.start_time}`).format(
            "HH:mm"
          )}{" "}
          -{" "}
          {dayjs(`${dayjs().format("YYYY-MM-DD")}T${props.end_time}`).format(
            "HH:mm"
          )}
        </p>
      </div>
      <div className={classes.box__main}>
        <p>
          {props.user_first_name} {props.user_last_name}
        </p>
        <p>{props.service}</p>
        <p>{props.phone}</p>
        <p>
          Статус:{" "}
          {props.status === "scheduled"
            ? "Запланировано"
            : props.status === "completed"
              ? "Завершено"
              : props.status}
        </p>
        <p>
          Сотрудник: {props.employee_first_name} {props.employee_last_name}
        </p>
      </div>
    </div>
  );
};

export default MessageBox;
