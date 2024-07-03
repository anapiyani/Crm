import React, { useState } from "react";
import classes from "./styles.module.scss";
import { Divider } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import classNames from "classnames";

interface ISearchFilterCardProps {
  title: string;
  children: React.ReactNode;
  classNameUnique?: string;
  open?: boolean;
}

const SearchFilterCard: React.FC<ISearchFilterCardProps> = ({
  title,
  children,
  classNameUnique,
  open,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(open);

  const handleFilterOpening = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div
      {...props}
      className={classNames(classes["container"], classNameUnique)}
    >
      <div className={classes["container__top"]}>
        <h2 className={classes["container__title"]}>{title}</h2>
        <button
          type="button"
          className={classes["container__btn"]}
          onClick={handleFilterOpening}
        >
          {!isOpen ? <ExpandMore /> : <ExpandLess />}
        </button>
      </div>

      <Divider />
      <div>{isOpen && <div className="p-3">{children}</div>}</div>
    </div>
  );
};

export default SearchFilterCard;
