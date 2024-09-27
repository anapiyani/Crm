import { Divider } from "@mui/material";
import classes from "./styles.module.scss";
import dayjs from "dayjs";

const ClientspredictItem = ({
  full_name,
  start_time,
  end_time,
  toPay,
}: {
  full_name: string;
  start_time: string;
  end_time: string;
  toPay: number;
}) => {
  console.log(full_name, dayjs(start_time).format("HH:mm"), end_time, toPay);
  return (
    <div className={classes.predictItems}>
      <div className={classes.predictItems__content}>
        <div className={classes.predictItems__content__info}>
          <p>{full_name}</p>
          <p style={{ fontSize: "1.2rem" }}>
            {start_time} : {end_time}
          </p>
        </div>
        <div className={classes.predictItems__content__info}>
          <p>{toPay} тенге</p>
        </div>
      </div>
      <Divider sx={{ marginBottom: "1rem" }} />
    </div>
  );
};

export default ClientspredictItem;
