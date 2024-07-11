import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import TreeItem from "@/components/treeItem/treeItem";
import { getServices } from "@/service/services/services.service";
import { IServiceCategory } from "@/ts/types";
import { Button, CircularProgress, Divider } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { LanOutlined, Folder, ContentCut } from "@mui/icons-material";
import classes from "./styles.module.scss";
import CustomTextField from "@/components/textField/textField.component";

const ServiceCatalog = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["serviceData"],
    queryFn: getServices,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
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
              {data?.map((category: IServiceCategory) => (
                <TreeItem key={category.id} category={category} />
              ))}
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
    </div>
  );
};

export default ServiceCatalog;
