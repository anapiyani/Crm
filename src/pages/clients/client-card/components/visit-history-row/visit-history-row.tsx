import React from "react";
import { CheckCircle, AccessTime, Done } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import classes from "./styles.module.scss";

interface VisitRowProps {
  description: string;
  cost: string;
  dateTime: string;
  link: string;
}

const VisitRow: React.FC<VisitRowProps> = ({
  description,
  cost,
  dateTime,
  link,
}) => (
  <div className={classes["row-container"]}>
    <div className={classes["row-container__content"]}>
      <div
        style={{backgroundColor: "var(--success-main)", borderRadius: "50%"}}
        className={classes["row-container__content__tick"]}
      >
        <Done sx={{ fontSize: "2.4rem", color: "#fff" }} />
      </div>

      <div className={classes["row-container__content__body"]}>
        <p style={{ color: "var(--neutral-700)" }}>
          {description}&nbsp;-&nbsp;
        </p>
        <p style={{ color: "var(--red-500)" }}>{cost}&nbsp;</p>
        <a
          href="/clients/client-card"
          style={{ color: "var(--link-500)", textDecoration: "none" }}
        >
          {link}
        </a>
      </div>
    </div>
    <div className={classes["row-container__time-info"]}>
      <AccessTime sx={{ fontSize: "2.4rem", color: "var(--neutral-500)" }} />
      <p style={{ color: "var(--neutral-700)" }}>{dateTime}</p>
    </div>
  </div>
);

export default VisitRow;
