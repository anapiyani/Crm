import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import classes from "./styles.module.scss";

const ServicePriceList = () => {
  return (
    <div className={classes["price"]}>
      <BreadcrumbsCustom />
      <div className={classes["price__upper"]}>Price List</div>
    </div>
  );
};

export default ServicePriceList;
