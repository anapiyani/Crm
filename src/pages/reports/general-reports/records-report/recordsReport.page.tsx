import React, { useState } from "react";
import ReportsHeader from "@/pages/reports/_components/reports-header.component";
import classes from "./styles.module.scss";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  IconButton,
  Divider,
  Collapse,
  MenuItem,
  TextField,
  styled,
} from "@mui/material";

const RecordsReport = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const StyledMenuItem = styled(MenuItem)({
    fontSize: 16,
  });

  return (
    <div className={classes.recordsReports}>
      <ReportsHeader />
      <div className={classes.recordsReports__content}>
        <div className={classes.recordsReports__content__filters}>
          <div className={classes.recordsReports__content__filters__header}>
            <div
              className={
                classes.recordsReports__content__filters__header__content
              }
            >
              <p
                className={
                  classes.recordsReports__content__filters__header__content__title
                }
              >
                Фильтры отчета
              </p>
              <IconButton onClick={toggleExpand}>
                {isExpanded ? (
                  <ExpandLess sx={{ fontSize: "2.4rem" }} />
                ) : (
                  <ExpandMore sx={{ fontSize: "2.4rem" }} />
                )}
              </IconButton>
            </div>
            <Divider />
          </div>
        </div>

        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <div className={classes.recordsReports__content__list}>
            <div className={classes.recordsReports__content__list__header}>
              <p
                className={classes.recordsReports__content__list__header__title}
              >
                Сотрудники
              </p>
              <Divider />
              <TextField
                select
                variant="outlined"
                size="small"
                sx={{ width: "36rem" }}
                InputProps={{ sx: { fontSize: 16 } }}
                defaultValue={"Выберите сотрудника"}
              >
                <StyledMenuItem value="Выберите сотрудника">
                  Выберите сотрудника
                </StyledMenuItem>
              </TextField>
            </div>
            <div className={classes.recordsReports__content__list__header}>
              <p
                className={classes.recordsReports__content__list__header__title}
              >
                Тип даты
              </p>
              <Divider />
              <TextField
                select
                variant="outlined"
                size="small"
                sx={{ width: "36rem" }}
                InputProps={{ sx: { fontSize: 16 } }}
                defaultValue={"По дате начала записи"}
              >
                <StyledMenuItem value="По дате начала записи">
                  По дате начала записи
                </StyledMenuItem>
              </TextField>
            </div>
            <div className={classes.recordsReports__content__list__header}>
              <p
                className={classes.recordsReports__content__list__header__title}
              >
                Онлайн
              </p>
              <Divider />
              <TextField
                select
                variant="outlined"
                size="small"
                sx={{ width: "36rem" }}
                InputProps={{ sx: { fontSize: 16 } }}
                defaultValue={"Не важно"}
              >
                <StyledMenuItem value="Не важно">Не важно</StyledMenuItem>
              </TextField>
            </div>
            <div className={classes.recordsReports__content__list__header}>
              <p
                className={classes.recordsReports__content__list__header__title}
              >
                Удаленные
              </p>
              <Divider />
              <TextField
                select
                variant="outlined"
                size="small"
                sx={{ width: "36rem" }}
                InputProps={{ sx: { fontSize: 16 } }}
                defaultValue={"Нет"}
              >
                <StyledMenuItem value="Нет">Нет</StyledMenuItem>
              </TextField>
            </div>
            <div className={classes.recordsReports__content__list__header}>
              <p
                className={classes.recordsReports__content__list__header__title}
              >
                Статус
              </p>
              <Divider />
              <TextField
                select
                variant="outlined"
                size="small"
                sx={{ width: "36rem" }}
                InputProps={{ sx: { fontSize: 16 } }}
                defaultValue={"Не важно"}
              >
                <StyledMenuItem value="Не важно">Не важно</StyledMenuItem>
              </TextField>
            </div>
            <div className={classes.recordsReports__content__list__header}>
              <p
                className={classes.recordsReports__content__list__header__title}
              >
                Клиент
              </p>
              <Divider />
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                sx={{ width: "36rem" }}
                InputProps={{ sx: { fontSize: 16 } }}
                placeholder="Имя / телефон / карта / ID"
              />
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default RecordsReport;
