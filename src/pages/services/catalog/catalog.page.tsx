import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import { getHierarchy } from "@/service/hierarchy/hierarchy.service";
import { IService, IServiceCategory } from "@/ts/service.interface";
import { Button, CircularProgress, Divider, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { LanOutlined, Folder, ContentCut } from "@mui/icons-material";
import classes from "./styles.module.scss";
import CustomTextField from "@/components/textField/textField.component";
import TreeView from "@/components/treeItem/treeItem";

import SearchFilterCard from "@/components/search-filter-card/search-filter-card";
import { useState } from "react";

const ServiceCatalog = () => {
  const [service, setService] = useState<IService | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data, isPending, isError } = useQuery({
    queryKey: ["hierarchyData"],
    queryFn: getHierarchy,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const handleServiceSelect = (service: IService, parent: string[]) => {
    setService(service);
    console.log(service);
    console.log(parent);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 10);
  };
  const handleParentInfo = (parentCategory: IServiceCategory) => {
    console.log("Parent Category:", parentCategory);
    // Handle the parent category information here
  };

  const rows = [
    { IconComponent: LanOutlined, color: "#0B6BCB", label: "Отдел" },
    { IconComponent: Folder, color: "#1E88E5", label: "Секция" },
    { IconComponent: Folder, color: "#1565C0", label: "Тип" },
    { IconComponent: Folder, color: "#7B1FA2", label: "Группа" },
    { IconComponent: Folder, color: "#EF6C00", label: "Категория" },
    { IconComponent: Folder, color: "#FBC02D", label: "Подкатегория" },
    { IconComponent: ContentCut, color: "#388E3C", label: "Услуга" },
  ];

  if (isError) {
    toast.error("Произошла ошибка при получении данных.");
  }

  return (
    <div className={classes.catalog}>
      <BreadcrumbsCustom />
      <div className={classes.catalog__upper}>
        <div className={classes.catalog__upper__content}>
          <div className={classes.catalog__upper__content__header}>
            <h5 className={classes.catalog__upper__content__label}>
              Каталог услуг
            </h5>
            <Divider />
            <div className={classes.catalog__upper__content__items}>
              {isPending ? <CircularProgress /> : ""}
              <TreeView
                categories={data || []}
                onServiceSelect={handleServiceSelect}
              />
            </div>
            <Divider />
            <div className={classes.catalog__upper__content__hint}>
              {rows.map((row, index) => (
                <div className={classes.catalog__upper__content__hint__row}>
                  <row.IconComponent
                    style={{ color: row.color, fontSize: "24px" }}
                  />
                  <label>{row.label}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={classes.catalog__upper__search}>
          <h5 className={classes.catalog__upper__content__label}>
            Основные характеристики
          </h5>
          <Divider />
          <div className={classes.catalog__upper__search__content}>
            <div className={classes.catalog__upper__search__content__row}>
              <p className={classes.catalog__upper__search__content__label}>
                Услуга
              </p>
              <CustomTextField label={"Введите Услугу"} />
            </div>
            <div className={classes.catalog__upper__search__content__row}>
              <p className={classes.catalog__upper__search__content__label}>
                {" "}
                Отдел
              </p>
              <CustomTextField label={"Введите Отдел"} />
            </div>
            <div className={classes.catalog__upper__search__content__row}>
              <p className={classes.catalog__upper__search__content__label}>
                Секция
              </p>
              <CustomTextField label={"Введите Секцию"} />
            </div>
            <div className={classes.catalog__upper__search__content__row}>
              <p className={classes.catalog__upper__search__content__label}>
                Тип
              </p>
              <CustomTextField label={"Введите Тип"} />
            </div>
            <div className={classes.catalog__upper__search__content__row}>
              <p className={classes.catalog__upper__search__content__label}>
                Категория
              </p>
              <CustomTextField label={"Введите Категорию"} />
            </div>
            <div className={classes.catalog__upper__search__content__row}>
              <p className={classes.catalog__upper__search__content__label}>
                Подкатегория
              </p>
              <CustomTextField label={"Введите Подкатегорию"} />
            </div>
            <div className={classes.catalog__upper__search__content__row}>
              <p className={classes.catalog__upper__search__content__label}>
                Профессия
              </p>
              <CustomTextField label={"Введите Профессию"} />
            </div>
            <div className={classes.catalog__upper__search__content__row}>
              <Button
                variant="outlined"
                color="primary"
                size="medium"
                sx={{ fontSize: "1.6rem", fontWeight: "400" }}
              >
                Очистить
              </Button>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                size="medium"
                sx={{ fontSize: "1.6rem", fontWeight: "400" }}
              >
                Искать
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.catalog__lower}>
        <div className={classes.catalog__lower__info}>
          {isLoading ? (
            <div style={{ height: "250px" }}></div>
          ) : (
            <>
              <SearchFilterCard
                classNameUnique={classes.catalog__lower__info__card1}
                title={"Обзор"}
                children={
                  <div className={classes.catalog__lower__info__content}>
                    <div className={classes.catalog__lower__info__row}>
                      <p>Наименование</p>
                      <TextField
                        className={classes.catalog__lower__info__row__input}
                        disabled
                        variant="standard"
                        defaultValue={service?.name}
                        sx={{
                          "& .MuiInputBase-root.Mui-disabled:before": {
                            fontSize: "1.6rem",
                            borderBottom: "0.5px solid #636b744d",
                          },
                        }}
                      />
                    </div>
                    <div className={classes.catalog__lower__info__row}>
                      <p>Отобр. онлайн</p>
                      <TextField
                        className={classes.catalog__lower__info__row__input}
                        disabled
                        variant="standard"
                        defaultValue={service?.active ? "Да" : "Нет"}
                        sx={{
                          "& .MuiInputBase-root.Mui-disabled:before": {
                            fontSize: "1.6rem",
                            borderBottom: "0.5px solid #636b744d",
                          },
                        }}
                      />
                    </div>
                    <div className={classes.catalog__lower__info__row}>
                      <p>Продолж. мин</p>
                      <TextField
                        className={classes.catalog__lower__info__row__input}
                        disabled
                        variant="standard"
                        defaultValue={service?.duration.toString() + " мин"}
                        sx={{
                          "& .MuiInputBase-root.Mui-disabled:before": {
                            fontSize: "1.6rem",
                            borderBottom: "0.5px solid #636b744d",
                          },
                        }}
                      />
                    </div>
                    <div className={classes.catalog__lower__info__row}>
                      <p> Мин. объем</p>
                      <TextField
                        className={classes.catalog__lower__info__row__input}
                        disabled
                        variant="standard"
                        defaultValue={
                          service?.min_volume.toString() +
                          " " +
                          service?.unit_mes
                        }
                        sx={{
                          "& .MuiInputBase-root.Mui-disabled:before": {
                            fontSize: "1.6rem",
                            borderBottom: "0.5px solid #636b744d",
                          },
                        }}
                      />
                    </div>
                    <div className={classes.catalog__lower__info__row}>
                      <p>Статус</p>
                      <TextField
                        className={classes.catalog__lower__info__row__input}
                        disabled
                        variant="standard"
                        defaultValue={
                          service?.is_deleted ? "Удалено" : "Активно"
                        }
                        sx={{
                          "& .MuiInputBase-root.Mui-disabled:before": {
                            fontSize: "1.6rem",
                            borderBottom: "0.5px solid #636b744d",
                          },
                        }}
                      />
                    </div>
                    <div className={classes.catalog__lower__info__row}>
                      <p> Цвет в журнале </p>
                      <TextField
                        className={classes.catalog__lower__info__row__input}
                        disabled
                        variant="standard"
                        defaultValue={"Нет цвета"}
                        sx={{
                          "& .MuiInputBase-root.Mui-disabled:before": {
                            fontSize: "1.6rem",
                            borderBottom: "0.5px solid #636b744d",
                          },
                        }}
                      />
                    </div>
                  </div>
                }
                openEnabled={false}
              />
              <SearchFilterCard
                classNameUnique={classes.catalog__lower__info__card2}
                title={"Основные характеристики"}
                openEnabled={false}
                children={
                  <div className={classes.catalog__lower__info__content}>
                    <div className={classes.catalog__lower__info__row}>
                      <p>Наименование</p>
                      <TextField
                        className={classes.catalog__lower__info__row__input}
                        disabled
                        variant="standard"
                        defaultValue={"Укладка"}
                        sx={{
                          "& .MuiInputBase-root.Mui-disabled:before": {
                            fontSize: "1.6rem",
                            borderBottom: "0.5px solid #636b744d",
                          },
                        }}
                      />
                    </div>
                    <div className={classes.catalog__lower__info__row}>
                      <p>Наименование</p>
                      <TextField
                        className={classes.catalog__lower__info__row__input}
                        disabled
                        variant="standard"
                        defaultValue={"Укладка"}
                        sx={{
                          "& .MuiInputBase-root.Mui-disabled:before": {
                            fontSize: "1.6rem",
                            borderBottom: "0.5px solid #636b744d",
                          },
                        }}
                      />
                    </div>
                    <div className={classes.catalog__lower__info__row}>
                      <p>Наименование</p>
                      <TextField
                        className={classes.catalog__lower__info__row__input}
                        disabled
                        variant="standard"
                        defaultValue={"Укладка"}
                        sx={{
                          "& .MuiInputBase-root.Mui-disabled:before": {
                            fontSize: "1.6rem",
                            borderBottom: "0.5px solid #636b744d",
                          },
                        }}
                      />
                    </div>
                    <div className={classes.catalog__lower__info__row}>
                      <p>Наименование</p>
                      <TextField
                        className={classes.catalog__lower__info__row__input}
                        disabled
                        variant="standard"
                        defaultValue={"Укладка"}
                        sx={{
                          "& .MuiInputBase-root.Mui-disabled:before": {
                            fontSize: "1.6rem",
                            borderBottom: "0.5px solid #636b744d",
                          },
                        }}
                      />
                    </div>
                  </div>
                }
              />
              <SearchFilterCard
                classNameUnique={classes.catalog__lower__info__card3}
                title={"Скидка"}
                openEnabled={false}
                children={
                  <div className={classes.catalog__lower__info__content}>
                    <div className={classes.catalog__lower__info__row}>
                      <p>Наименование</p>
                      <TextField
                        className={classes.catalog__lower__info__row__input}
                        disabled
                        variant="standard"
                        defaultValue={"Укладка"}
                        sx={{
                          "& .MuiInputBase-root.Mui-disabled:before": {
                            fontSize: "1.6rem",
                            borderBottom: "0.5px solid #636b744d",
                          },
                        }}
                      />
                    </div>
                    <div className={classes.catalog__lower__info__row}>
                      <p>Наименование</p>
                      <TextField
                        className={classes.catalog__lower__info__row__input}
                        disabled
                        variant="standard"
                        defaultValue={"Укладка"}
                        sx={{
                          "& .MuiInputBase-root.Mui-disabled:before": {
                            fontSize: "1.6rem",
                            borderBottom: "0.5px solid #636b744d",
                          },
                        }}
                      />
                    </div>
                    <div className={classes.catalog__lower__info__row}>
                      <p>Наименование</p>
                      <TextField
                        className={classes.catalog__lower__info__row__input}
                        disabled
                        variant="standard"
                        defaultValue={"Укладка"}
                        sx={{
                          "& .MuiInputBase-root.Mui-disabled:before": {
                            fontSize: "1.6rem",
                            borderBottom: "0.5px solid #636b744d",
                          },
                        }}
                      />
                    </div>
                    <div className={classes.catalog__lower__info__row}>
                      <p>Наименование</p>
                      <TextField
                        className={classes.catalog__lower__info__row__input}
                        disabled
                        variant="standard"
                        defaultValue={"Укладка"}
                        sx={{
                          "& .MuiInputBase-root.Mui-disabled:before": {
                            fontSize: "1.6rem",
                            borderBottom: "0.5px solid #636b744d",
                          },
                        }}
                      />
                    </div>
                  </div>
                }
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCatalog;
