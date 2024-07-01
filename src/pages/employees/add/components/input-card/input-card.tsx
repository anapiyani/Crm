import { ChangeEvent, ReactNode, useState } from "react";
import classes from "./styles.module.scss";

type InputCardProps = {
  title: string;
  children: ReactNode;
};

const InputCard: React.FC<InputCardProps> = ({ title, children }) => {
  return (
    <div className={classes["container"]}>
      <h2 className={classes["container__title"]}>{title}</h2>
      {children}
    </div>
  );
};
export default InputCard;
