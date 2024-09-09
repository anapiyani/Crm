import React, { useState } from "react";
import TableVertical from "@/components/tables/tableVertical/vertical-info-card";
import TableHorizontal from "@/components/tables/table-horizontal/horizontal-info-card";
import VisitHistory from "./components/visit-history-table";
import Grid from "@mui/material/Unstable_Grid2";
import classes from "./styles.module.scss";
import InfoHeader from "@/components/navigation/header/info-header";
import {
  additionalInfoTableData,
  discountsTableData,
  financeTableData,
  contactsTableData,
  commentsTableData,
  sampleVisits,
} from "./data";
import { useParams } from "react-router-dom";
import { HomeOutlined } from "@mui/icons-material";
import {
  cardInfoEmplpyee,
  mainInfoEmployee,
} from "@/service/employee/employee.service";
import { useQuery } from "@tanstack/react-query";
import { ICardInfoEmployee } from "@/ts/employee.interface";

const ClientCard = () => {
  const params = useParams<{ id: string }>();
  const [page, setPage] = useState(1);
  const pageCount = 10;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const { data: userInfoData, isLoading: userInfoLoading } = useQuery({
    queryKey: ["mainInfoEmployee", params.id],
    queryFn: () => mainInfoEmployee(Number(params.id)),
  });

  const { data: counterCardData, isLoading: counterCardLoading } = useQuery({
    queryKey: ["cardInfoEmplpyee", params.id],
    queryFn: () => cardInfoEmplpyee(Number(params.id)),
  });

  const clientTabsData = [
    { to: "/clients", icon: HomeOutlined, label: "Обзор" },
  ];

  const clientNameData = {
    name:
      "Карта клиента - " +
      userInfoData?.first_name +
      " " +
      userInfoData?.last_name,
  };

  const mainTableData = [
    { property: "Автосегмент", value: "Не указано" },
    { property: "ID клиента", value: userInfoData?.user_id },
    { property: "Категория", value: userInfoData?.category || "Без категории" },
    { property: "Фамилия", value: userInfoData?.last_name || "Не указано" },
    { property: "Имя", value: userInfoData?.first_name || "Не указано" },
    {
      property: "Моб. телефон",
      value: userInfoData?.phone_number || "Не указано",
    },
    { property: "Рассылка SMS", value: "Запрет на рассылку" },
    { property: "Черный список", value: "Нет" },
    { property: "Онлайн запись", value: "Да" },
    { property: "Явка", value: "100% (0 из 48 не пришёл)" },
    { property: "Явка", value: "" },
  ];

  return (
    <div className={classes["main"]}>
      <InfoHeader
        tabsData={clientTabsData}
        nameData={clientNameData}
        counterCardData={counterCardData}
      />
      <Grid
        container
        sx={{
          mb: "5rem",
          ml: { xs: "2rem", xl: "7.6rem" },
          flexDirection: { xs: "column", md: "row" },
        }}
        columnGap={3}
        rowGap={{ xs: 3 }}
        xs={9}
        md={12}
      >
        <Grid
          container
          lg={5}
          md={5}
          xl={3.2}
          sx={{ alignItems: "flex-start" }}
          rowGap={3}
        >
          <TableVertical data={mainTableData} title="Главное" includeDropdown />
          <TableVertical
            data={additionalInfoTableData}
            title="Доп. информация"
          />
        </Grid>

        <Grid
          container
          xl={3.2}
          rowGap={{ xs: 3 }}
          sx={{ flexDirection: "column" }}
        >
          <TableVertical data={discountsTableData} title="Скидки" />
          <TableVertical data={financeTableData} title="Финансы" />
          <TableHorizontal data={contactsTableData} title="Контакты" />
          <TableHorizontal
            data={commentsTableData}
            title="Комментарии"
            hasTableHead={false}
            showEyeIcon
          />
        </Grid>

        <Grid container xl={3.8} sx={{ flexDirection: "column" }} rowGap={3}>
          <VisitHistory
            visits={sampleVisits}
            title="История посещений"
            showEyeIcon={true}
            page={page}
            pageCount={pageCount}
            onPageChange={handlePageChange}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ClientCard;
