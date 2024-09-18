import React from "react";
import { IconButton, Divider, CircularProgress, Grid } from "@mui/material";
import { Edit, Close, PlayArrow } from "@mui/icons-material";
import styles from "./styles.module.scss";

interface PersonalDiscountProps {
  status: "Активна" | "Неактивна";
  visits: number;
  totalAmount: string;
  savedAmount: string;
  issueDate: string;
  percent: number;
}

const PersonalDiscount: React.FC<PersonalDiscountProps> = ({
  status,
  visits,
  totalAmount,
  savedAmount,
  issueDate,
  percent,
}) => {
  const isInactive = status === "Неактивна";

  return (
    <Grid container xs={5.5}>
      <div
        className={`${styles.personalDiscount} ${isInactive ? styles.inactive : ""}`}
      >
        <div className={styles.header}>
          <p className={styles.title}>Персональная скидка</p>
          <div className={styles.icons}>
            <IconButton className={styles.icon}>
              <Edit />
            </IconButton>
            <IconButton className={styles.icon}>
              {isInactive ? <PlayArrow /> : <Close />}
            </IconButton>
          </div>
        </div>

        <Divider />

        <div className={styles.body}>
          <div className={styles.info}>
            <div className={styles.row}>
              <p className={styles.label}>Статус</p>
              <p className={styles.value}>{status}</p>
            </div>
            <Divider />
            <div className={styles.row}>
              <p className={styles.label}>Количество посещений</p>
              <p className={styles.value}>{visits} раз</p>
            </div>
            <Divider />
            <div className={styles.row}>
              <p className={styles.label}>Сумма посещений</p>
              <p className={styles.value}>{totalAmount}</p>
            </div>
            <Divider />
            <div className={styles.row}>
              <p className={styles.label}>Сэкономлено</p>
              <p className={styles.value}>{savedAmount}</p>
            </div>
            <Divider />
            <div className={styles.row}>
              <p className={styles.label}>Дата выдачи карты</p>
              <p className={styles.value}>{issueDate}</p>
            </div>
            <Divider />
          </div>

          <div className={styles.circleWrapper}>
            <div className={styles.circularProgressContainer}>
              <CircularProgress
                variant="determinate"
                value={percent}
                size={60}
                thickness={5}
                className={`${isInactive ? styles.inactiveProgress : styles.circularProgress}`}
              />
              <p
                className={`${isInactive ? styles.inactive : styles.percentText}`}
              >
                {percent}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default PersonalDiscount;
