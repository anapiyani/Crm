import CustomDatePicker from "@/components/date-picker/date-picker-custom";
import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import classes from "./styles.module.scss";

const ReportsHeader = () => {
  const [startDate, setStartDate] = useState<string | null>("01.08.2024");
  const [endDate, setEndDate] = useState<string | null>("14.08.2024");

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className={classes.upper}>
      <BreadcrumbsCustom />
      <p className={classes.upper__reportTitle}>Название отчета</p>
      <p className={classes.upper__reportDescription}>
        Выберите интересующий вас отчет, задайте отчетный период и нажмите на
        кнопку "Создать отчет" или скачайте его в Excel.
      </p>
      <Box className={classes.upper__reportSearchBar}>
        <div className={classes.upper__reportSearchBar__dateRange}>
          <CustomDatePicker />
          <span>-</span>
          <CustomDatePicker />
        </div>
        <div className={classes.upper__reportSearchBar__buttonGroup}>
          <Button variant="outlined" onClick={handleReset}>
            Сбросить
          </Button>
          <Button variant="outlined">Скачать в Excel</Button>
          <Button variant="contained" color="primary">
            Создать отчет
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default ReportsHeader;
