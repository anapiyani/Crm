import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import classes from "./styles.module.scss";
import { Autocomplete, Button, Chip, Divider, TextField } from "@mui/material";
import { useState } from "react";
import CustomTextField from "@/components/textField/textField.component";

const Report = () => {
  const [tagCategory, setTagCategory] = useState<string>("");
  const [reportName, setReportName] = useState<string>("");

  const handleSearch = () => {
    console.log("Searching for:", tagCategory, reportName);
  };

  const [formData, setFormData] = useState({});

  return (
    <div className={classes.report}>
      <div className={classes.report__upper}>
        <BreadcrumbsCustom />
        <h1 className={classes.report__upper__title}>Поиск отчетов</h1>
        <div className={classes.reportSearchBar}>
          <Autocomplete
            options={[]}
            renderInput={(params) => (
              <CustomTextField {...params} label={"По тегам"} size="small" />
            )}
            sx={{ width: "36rem" }}
          />
          <div className={classes.textfield}>
            <CustomTextField
              label={"По названию отчета"}
              onChange={(e) =>
                setFormData({ ...formData, keyword: e.target.value })
              }
              size="small"
            />
          </div>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{
              fontSize: "1.4rem",
              textTransform: "none",
              padding: "0.4rem 0.8rem 0.4rem 1.2rem",
              minHeight: "4rem",
              boxShadow: "none",
              borderRadius: "0.8rem",
            }}
          >
            Искать
          </Button>
        </div>
      </div>
      <div className={classes.report__content}>
        <div className={classes.report__tags}>
          <div className={classes.header}>
            <p className={classes.title}>Категории тегов</p>
            <Divider />
          </div>

          <div className={classes.report__tags__list}>
            {[
              "Абонементы клиентов",
              "Клиенты",
              "Склад и материалы",
              "Сотрудники",
              "Администраторы",
              "Коммуникация с клиентом",
              "Услуги",
              "Бонусы клиентов",
              "Маркетинг",
              "Подарочные сертификаты",
              "Финансы",
              "Депозиты клиентов",
              "Посещения",
              "Зарплата",
            ].map((tag) => (
              <Chip
                key={tag}
                variant="outlined"
                label={tag}
                sx={{
                  fontSize: "1.4rem",
                  backgroundColor: "#E3EFFB",
                  border: "none",
                  height: "2.4rem",
                  width: "auto",
                }}
              />
            ))}
          </div>
        </div>
        <div className={classes.report__list}>
          <div className={classes.header}>
            <p className={classes.title}>Список тегов</p>
            <p className={classes.content__text}>
              Выберите категорию из списка выше, чтобы увидеть список доступных
              тегов, или воспользуйтесь поиском.
            </p>
            <Divider />
          </div>
        </div>
        <div className={classes.report__results}>
          <div className={classes.header}>
            <p className={classes.title}>Список отчетов</p>
            <p className={classes.content__text}>
              Пожалуйста, выберите хотя бы один тег для поиска отчётов
            </p>
            <Divider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
