import React from "react";
import classes from "./styles.module.scss";

interface IDatatableProps {
  children?: React.ReactNode;
  columns?: React.ReactNode;
  header?: React.ReactNode;
}

const Datatable: React.FC<IDatatableProps> = ({
  children,
  columns,
  header,
}) => {
  return (
    <div className={classes["container"]}>
      {header}
      <table className={classes["table"]}>
        <thead>{columns}</thead>
        {children}
      </table>
    </div>
  );
};

export default Datatable;
