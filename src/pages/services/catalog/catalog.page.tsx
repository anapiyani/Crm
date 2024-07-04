import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import classes from "./styles.module.scss";

const ServiceCatalog = () => {
  return (
    <div className={classes["catalog"]}>
      <BreadcrumbsCustom />
      <div className={classes["catalog__upper"]}>
        
      </div>
    </div>
  );
};

export default ServiceCatalog;
