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
  openEnabled?: boolean;
}

const SearchFilterCard: React.FC<ISearchFilterCardProps> = ({
  title,
  children,
  classNameUnique,
  open,
  openEnabled,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(open);
  const [isEnable] = useState(openEnabled);

  const handleFilterOpening = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div
      {...props}
      className={classNames(classes["container"], classNameUnique)}
    >
      <div onClick={handleFilterOpening} className={classes["container__top"]}>
        <h2 className={classes["container__title"]}>{title}</h2>

        {isEnable ? (
          <button
            disabled={isEnable}
            type="button"
            className={classes["container__btn"]}
          >
            {!isOpen ? <ExpandMore /> : <ExpandLess />}
          </button>
        ) : (
          <></>
        )}
      </div>

      <Divider />
      {isEnable ? (
        <div>{isOpen && <div className="p-3">{children}</div>}</div>
      ) : (
        <div className="p-3">{children}</div>
      )}
    </div>
  );
};

export default SearchFilterCard;
