import React, { useEffect } from "react";
import { Button, IconButton, Divider } from "@mui/material";
import { Man3Outlined } from "@mui/icons-material";
import classes from "./style.module.scss";
import { IServiceCalculation } from "@/ts/service.interface";

interface CalculationProps {
  material: string;
  data: IServiceCalculation[];
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

const Calculation: React.FC<CalculationProps> = ({ material, data }) => {
  const [employeePercentage, setEmployeePercentage] = React.useState<number>(0);
  const [position, setPosition] = React.useState<number>(0);

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
          {data.map((item, index) => (
            <Button
              onClick={() => {
                setEmployeePercentage(index);
              }}
              variant="contained"
              sx={{
                ...buttonStyle,
              }}
            >
              {item.employee_percentage}%
            </Button>
          ))}
        </div>

        <div className={classes.calculation__content__item}>
          <p className={classes.calculation__content__item__label}>Должность</p>
          {employeePercentage === undefined ||
          data[employeePercentage] === undefined ? (
            <></>
          ) : (
            <>
              {data[employeePercentage].positions.map((item, index) => (
                <Button
                  onClick={() => {
                    setPosition(index);
                  }}
                  variant="contained"
                  sx={{
                    ...buttonStyle,
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </>
          )}
        </div>

        <div className={classes.calculation__content__item}>
          <p className={classes.calculation__content__item__label}>
            Сотрудники
          </p>
          {employeePercentage === undefined ||
          data[employeePercentage] === undefined ? (
            <></>
          ) : (
            <>
              {data[employeePercentage].positions[position].employees.map(
                (item, index) => (
                  <div
                    className={classes.calculation__content__item__employee}
                    onClick={() =>
                      window.location.assign(`/employees/${item.user}`)
                    }
                  >
                    <IconButton sx={{ padding: 0, marginRight: "0.8rem" }}>
                      <Man3Outlined
                        sx={{ fontSize: "2.4rem", color: "var(--primary-500)" }}
                      />
                    </IconButton>
                    <p
                      className={
                        classes.calculation__content__item__employee__name
                      }
                    >
                      {item.full_name}
                    </p>
                  </div>
                )
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculation;
