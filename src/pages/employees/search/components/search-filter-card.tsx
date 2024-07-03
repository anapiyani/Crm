import React from "react";
import classes from "./styles.module.scss";
import { Divider } from "@mui/material";
import classNames from "classnames";

interface ISearchFilterCardProps {
  title: string;
  children: React.ReactNode;
  classNameUnique?: string;
}

const SearchFilterCard: React.FC<ISearchFilterCardProps> = ({
  title,
  children,
  classNameUnique,
  ...props
}) => {
  return (
    <div
      {...props}
      className={classNames(classes["container"], classNameUnique)}
    >
      <h2 className={classes["container__title"]}>{title}</h2>
      <Divider />
      {children}
    </div>
  );
};

export default SearchFilterCard;
