import dayjs from "dayjs";
import classes from "./styles.module.scss";

type TProps = {
  start_time: string;
  end_time: string;
  user_first_name: string;
  user_last_name: string;
  service: string;
  employee_first_name: string;
  employee_last_name: string;
  status: string;
  appointment_id?: number;
  client_phone_number?: string;
};

const MessageBox = ({
  start_time,
  end_time,
  user_first_name,
  user_last_name,
  service,
  employee_first_name,
  employee_last_name,
  status,
  appointment_id,
  client_phone_number,
}: TProps) => {
  return (
    <div className={classes.box}>
      <div className={classes.box__header}>
        <p>
          {dayjs(`${dayjs().format("YYYY-MM-DD")}T${start_time}`).format(
            "HH:mm"
          )}{" "}
          -{" "}
          {dayjs(`${dayjs().format("YYYY-MM-DD")}T${end_time}`).format("HH:mm")}
        </p>
      </div>
      <div className={classes.box__main}>
        <p>{appointment_id ? `ID: ${appointment_id}` : null}</p>
        <p>
          {user_first_name} {user_last_name}
        </p>
        <p>{service}</p>
        <p>{client_phone_number}</p>
        <p>
          Статус:{" "}
          {status === "scheduled"
            ? "Запланировано"
            : status === "completed"
              ? "Завершено"
              : status}
        </p>
        <p>
          Сотрудник: {employee_first_name} {employee_last_name}
        </p>
      </div>
    </div>
  );
};

export default MessageBox;
