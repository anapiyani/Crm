import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import TreeItem from "@/components/treeItem/treeItem";
import { getServices } from "@/service/services/services.service";
import { IServiceCategory } from "@/ts/types";
import { CircularProgress, Divider } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  ExpandLess,
  ExpandMore,
  LanOutlined,
  Folder,
  ContentCut,
} from "@mui/icons-material";
import classes from "./styles.module.scss";
import { C } from "node_modules/@fullcalendar/core/internal-common";

const ServiceCatalog = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["serviceData"],
    queryFn: getServices,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

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
              <div className={classes.catalog__upper__content__hint__row}>
                <LanOutlined
                  style={{
                    color: "#0B6BCB",
                    fontSize: "24px",
                  }}
                />
                <label>Отдел</label>
              </div>
              <div className={classes.catalog__upper__content__hint__row}>
                <Folder
                  style={{
                    color: "#1E88E5",
                    fontSize: "24px",
                  }}
                />
                <label>Секция</label>
              </div>
              <div className={classes.catalog__upper__content__hint__row}>
                <Folder
                  style={{
                    color: "#1565C0",
                    fontSize: "24px",
                  }}
                />
                <label>Тип</label>
              </div>
              <div className={classes.catalog__upper__content__hint__row}>
                <Folder
                  style={{
                    color: "#7B1FA2",
                    fontSize: "24px",
                  }}
                />

                <label>Группа</label>
              </div>
              <div className={classes.catalog__upper__content__hint__row}>
                <Folder
                  style={{
                    color: "#EF6C00",
                    fontSize: "24px",
                  }}
                />
                <label>Категория</label>
              </div>
              <div className={classes.catalog__upper__content__hint__row}>
                <Folder
                  style={{
                    color: "#FBC02D",
                    fontSize: "24px",
                  }}
                />
                <label>Подкатегория</label>
              </div>
              <div className={classes.catalog__upper__content__hint__row}>
                <ContentCut
                  style={{
                    color: "#388E3C",
                    fontSize: "24px",
                  }}
                />
                <label>Услуга</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCatalog;
