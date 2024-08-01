import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import classes from "./salary.module.scss";

const SalaryPage = () => {
  return (
    <div className={classes.salary}>
      <BreadcrumbsCustom />
      <div className={classes.salary__header}>
        <h1></h1>
      </div>
    </div>
  );
};

export default SalaryPage;
