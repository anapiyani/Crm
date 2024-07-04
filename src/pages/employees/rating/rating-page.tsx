import { useState } from "react";
import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import {
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import classes from "./styles.module.scss";

const Rating = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: "Имя Фамилия",
      serviceRevenue: 800,
      subscriptionRevenue: 0,
      productRevenue: 800,
      productSales: 0,
      earnedCertificates: 0,
      salary: "20 000 руб.",
      visits: 10,
      newClients: 5,
      constantClients: 0,
      totalClients: 5,
      averageCheck: "4 800 руб.",
      workHours: 64,
      shifts: 8,
      revenuePerHour: "3 000 руб.",
      employeeRating: 2.5,
    },
  ]);

  return (
    <div className={classes["rating"]}>
      <BreadcrumbsCustom />
      <div className={classes["rating__header"]}>
        <h1>Рейтинг</h1>
        <p>
          На данной странице вы можете посмотреть отчет “Рейтинг сотрудников”
          без выгрузки в отдельный файл.
        </p>
        <h2>Выберите время</h2>
      </div>
      <div className={classes["rating__choices"]}>
        <RadioGroup row>
          <FormControlLabel value="day" control={<Radio />} label="День" />
          <FormControlLabel value="week" control={<Radio />} label="Неделя" />
          <FormControlLabel value="month" control={<Radio />} label="Месяц" />
          <FormControlLabel
            value="quartal"
            control={<Radio />}
            label="Квартал"
          />
          <FormControlLabel value="year" control={<Radio />} label="Год" />
          <FormControlLabel
            value="other"
            control={<Radio />}
            label="Заданный период:"
          />
        </RadioGroup>
        <div className={classes["rating__choices__btns"]}>
          <Button variant="outlined">Сбросить</Button>
          <Button variant="contained">Создать отчет</Button>
        </div>
      </div>
      <Divider sx={{ margin: "10px" }} />
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>№</TableCell>
            <TableCell>Сотрудник</TableCell>
            <TableCell>Выручка по услугам</TableCell>
            <TableCell>Выручка по абонементам</TableCell>
            <TableCell>Выручка по товарам</TableCell>
            <TableCell>Продажи абонементов</TableCell>
            <TableCell>Продажи сертификатов</TableCell>
            <TableCell>Заработная плата</TableCell>
            <TableCell>Посещения</TableCell>
            <TableCell>Кол-во клиентов</TableCell>
            <TableCell>Новые клиенты</TableCell>
            <TableCell>Постоянные клиенты</TableCell>
            <TableCell>Средний чек</TableCell>
            <TableCell>Раб. часы</TableCell>
            <TableCell>Смены</TableCell>
            <TableCell>Выручка в час</TableCell>
            <TableCell>Рейтинг сотрудника</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.serviceRevenue}</TableCell>
              <TableCell>{row.subscriptionRevenue}</TableCell>
              <TableCell>{row.productRevenue}</TableCell>
              <TableCell>{row.productSales}</TableCell>
              <TableCell>{row.earnedCertificates}</TableCell>
              <TableCell>{row.salary}</TableCell>
              <TableCell>{row.visits}</TableCell>
              <TableCell>{row.newClients}</TableCell>
              <TableCell>{row.constantClients}</TableCell>
              <TableCell>{row.totalClients}</TableCell>
              <TableCell>{row.averageCheck}</TableCell>
              <TableCell>{row.workHours}</TableCell>
              <TableCell>{row.shifts}</TableCell>
              <TableCell>{row.revenuePerHour}</TableCell>
              <TableCell>{row.employeeRating}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Rating;
