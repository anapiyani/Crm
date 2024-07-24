import React from "react";
import classes from "./style.module.scss";

interface InfoBoxProps {
  header: React.ReactNode;
  content: Array<{ icon: React.ReactNode; text: string }>;
}

const CashCard: React.FC<InfoBoxProps> = ({ header, content }) => {
  return (
    <div className={classes.infoBox}>
      <div className={classes.infoBox__header}>
        <p>{header}</p>
      </div>
      <div className={classes.infoBox__content}>
        {content.map((item, index) => (
          <p key={index}>
            {item.icon} {item.text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CashCard;
