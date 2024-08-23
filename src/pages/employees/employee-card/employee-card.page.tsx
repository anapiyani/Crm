import TableVertical from "@/components/tables/tableVertical/vertical-info-card";
import TableHorizontal from "@/components/tables/table-horizontal/horizontal-info-card";
import Grid from "@mui/material/Unstable_Grid2";
import classes from "./styles.module.scss";
import InfoHeader from "@/components/navigation/header/info-header";
import { employeeTabsData } from "./data";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  cardInfoEmplpyee,
  mainInfoEmployee,
} from "@/service/employee/employee.service";
import { CircularProgress } from "@mui/material";

const EmployeeCard = () => {
  const params = useParams<{ id: string }>();
  const location = useLocation();

  const {
    data: counterCardData,
    isLoading: counterCardLoading,
    isError: counterCardError,
  } = useQuery({
    queryKey: ["cardInfoEmplpyee", params.id],
    queryFn: () => cardInfoEmplpyee(Number(params.id)),
  });

  const {
    data: userInfoData,
    isLoading: userInfoLoading,
    isError: userInfoError,
  } = useQuery({
    queryKey: ["mainInfoEmployee", params.id],
    queryFn: () => mainInfoEmployee(Number(params.id)),
  });

  const employeeNameData = {
    name: `Карта сотрудника - ${userInfoData?.last_name} ${userInfoData?.first_name}`,
  };

  const mainTableData = [
    { property: "ID сотрудника", value: userInfoData?.user_id },
    {
      property: "Статус",
      value: userInfoData?.is_active ? "Активен" : "Неактивен",
    },
    { property: "Должность", value: "Универсал, Парикмахерский зал" },
    { property: "Фамилия", value: userInfoData?.last_name },
    { property: "Имя", value: userInfoData?.first_name },
    {
      property: "Отобр. онлайн",
      value: userInfoData?.is_active ? "Да" : "Нет",
    },
    { property: "Моб. телефон", value: userInfoData?.phone_number },
    // { property: "Отчество", value: userInfoData?.middle_name }, // there is no middle name in the response
    // { property: "Push-уведомления", value: "Да" }, // there is no push notifications in the response
  ];

  const additionalTableData = [
    { property: "Работает с.", value: userInfoData?.start_date },
    { property: "Пол", value: userInfoData?.gender },
    { property: "Интервал", value: "По умолчанию" }, // there is no interval in the response
    { property: "Блокировать", value: "Да" }, // there is no block in the response
  ];

  const contactsData = [
    {
      type: "Моб. телефон",
      contact: userInfoData?.phone_number || "Нет данных",
      primary: true,
    },
  ];

  const addressData = [
    {
      property: "Адрес",
      value: userInfoData?.city
        ? `${userInfoData?.city}, ${userInfoData?.street}, ${userInfoData?.house}`
        : "Нет данных",
    },
  ];

  return counterCardLoading && userInfoLoading ? (
    <CircularProgress className={classes.loading} />
  ) : (
    <div className={classes["main"]}>
      <InfoHeader
        tabsData={employeeTabsData}
        nameData={employeeNameData}
        counterCardData={counterCardData!}
      />
      <Grid
        container
        sx={{
          mb: "5rem",
          ml: { xs: "2rem", xl: "7.6rem" },
          flexDirection: { xs: "column", md: "row" },
        }}
        columnSpacing={{ md: 6 }}
        rowGap={{ xs: 3, md: 0 }}
        xs={9}
        md={12}
      >
        <Grid container lg={5} xl={3.5} sx={{ alignItems: "flex-start" }}>
          <TableVertical data={mainTableData} title="Главное" showLockIcon />
        </Grid>

        <Grid
          container
          xl={7}
          lg={5}
          md={6}
          sx={{ flexDirection: { xs: "column", xl: "row" } }}
          columnSpacing={{ md: 0, xl: 6 }}
          rowGap={{ xs: 3, xl: 0 }}
        >
          <Grid xl={6}>
            <TableVertical data={additionalTableData} title="Доп. информация" />
          </Grid>

          <Grid container xl={6} sx={{ flexDirection: "column" }} rowGap={3}>
            <TableHorizontal data={contactsData} title="Контакты" />
            <TableVertical data={addressData} title="Адрес проживания" />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default EmployeeCard;
