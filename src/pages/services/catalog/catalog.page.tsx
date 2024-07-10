import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import TreeItem from "@/components/treeItem/treeItem";
import { getServices } from "@/service/services/services.service";
import { IServiceCategory } from "@/ts/types";
import { CircularProgress, Divider } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import classes from "./styles.module.scss";

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
            <h1>Каталог услуг</h1>
            <Divider />
            <div className={classes.catalog__upper__content__items}>
              {isPending ? <CircularProgress /> : ""}
              {data?.map((category: IServiceCategory) => (
                <TreeItem key={category.id} category={category} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCatalog;
