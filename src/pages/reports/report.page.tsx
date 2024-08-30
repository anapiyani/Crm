import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import classes from "./styles.module.scss";
import VerticalTextField from "@/components/textfield-vertical/textfield-vertical";
import { Button } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { getExcelFile } from "@/service/reports/reports.service";
import dayjs from "dayjs";

const Report = () => {
  const [dateFirst, setDateFirst] = useState<string>("");
  const [dateSecond, setDateSecond] = useState<string>("");

  const { data: reportData, isLoading: isReportLoading } = useQuery({
    queryKey: ["report", dateFirst, dateSecond],
    queryFn: () =>
      getExcelFile({
        date_from: dayjs(dateFirst).format("DD.MM.YYYY"),
        date_to: dayjs(dateSecond).format("DD.MM.YYYY"),
      }),
    enabled: !!dateFirst && !!dateSecond,
  });

  const getExcel = async () => {
    if (dateFirst && dateSecond) {
      try {
        const blob = await getExcelFile({
          date_from: dayjs(dateFirst).format("DD.MM.YYYY"),
          date_to: dayjs(dateSecond).format("DD.MM.YYYY"),
        });

        // Create a link element
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `report_${dateFirst}_to_${dateSecond}.xlsx`,
        ); // Filename
        document.body.appendChild(link);
        link.click();
        link.remove();

        toast.success("Отчет успешно скачан");
      } catch (error) {
        toast.error("Ошибка при скачивании отчета");
      }
    } else {
      toast.error("Выберите даты");
    }
  };

  return (
    <div className={classes.report}>
      <div className={classes.report__upper}>
        <BreadcrumbsCustom />
        <h1 className={classes.report__upper__title}>Создание карты клиента</h1>
        <p className={classes.report__upper__subtitle}>
          Вы можете добавить дополнительную информацию здесь либо внести ее
          позже, зайдя в карту клиента.
        </p>
        <div className={classes.report__upper__search}>
          <VerticalTextField
            placeholder={"01.08.2024"}
            placeholderOptional={"01.08.2024"}
            doubleDivier="-"
            type="double-calendar"
            onChangeFrom={(e) => setDateFirst(e.target.value)}
            onChangeTo={(e) => setDateSecond(e.target.value)}
          />
          <Button
            color="primary"
            sx={{
              fontSize: "1.4rem",
            }}
            variant="outlined"
          >
            Сбросить
          </Button>
          <Button
            color="primary"
            sx={{
              fontSize: "1.4rem",
            }}
            variant="outlined"
            onClick={getExcel}
          >
            Скачать в Excel
          </Button>
          <Button
            color="primary"
            sx={{
              fontSize: "1.4rem",
            }}
            variant="contained"
          >
            Создать отчет
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Report;
