import React from "react";
import { Button, IconButton, Divider } from "@mui/material";
import { Man3Outlined } from "@mui/icons-material";
import classes from "./style.module.scss";

interface CalculationProps {
  material: string;
  employeePercentage: string;
  position: string;
  employeeName: string;
}

const buttonStyle = {
  width: "100%",
  textTransform: "none",
  fontSize: "1.4rem",
  padding: "0.8rem",
  justifyContent: "flex-start",
  backgroundColor: "rgba(11,107,203, 0.8)",
  fontWeight: 400,
};

const Calculation: React.FC<CalculationProps> = ({
  material,
  employeePercentage,
  position,
  employeeName,
}) => {
  return (
    <div className={classes.calculation}>
      <p className={classes.calculation__title}>Калькуляция</p>
      <Divider sx={{ marginBottom: "1.6rem" }} />

      <div className={classes.calculation__content}>
        <div className={classes.calculation__content__item}>
          <p className={classes.calculation__content__item__label}>Материалы</p>
          <Button
            variant="contained"
            sx={{
              ...buttonStyle,
            }}
          >
            {material}
          </Button>
        </div>

        <div className={classes.calculation__content__item}>
          <p className={classes.calculation__content__item__label}>
            Процент сотрудника
          </p>
          <Button
            variant="contained"
            sx={{
              ...buttonStyle,
            }}
          >
            {employeePercentage}
          </Button>
        </div>

        <div className={classes.calculation__content__item}>
          <p className={classes.calculation__content__item__label}>Должность</p>
          <Button
            variant="contained"
            sx={{
              ...buttonStyle,
            }}
          >
            {position}
          </Button>
        </div>

        <div className={classes.calculation__content__item}>
          <p className={classes.calculation__content__item__label}>
            Сотрудники
          </p>
          <div className={classes.calculation__content__item__employee}>
            <IconButton sx={{ padding: 0, marginRight: "0.8rem" }}>
              <Man3Outlined
                sx={{ fontSize: "2.4rem", color: "var(--primary-500)" }}
              />
            </IconButton>
            <p className={classes.calculation__content__item__employee__name}>
              {employeeName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculation;
