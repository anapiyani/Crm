import React from "react";
import { Card, Button, CardActions, CardContent } from "@mui/material";
import { AddRounded } from "@mui/icons-material";
import classes from "./styles.module.scss";

type CounterCardProps = {
  backgroundColor: string;
  iconColor: string;
  icon: React.ReactNode;
  textTitle: string;
  textTitleFocus?: string;
  valueText: string | number | undefined;
  isButton?: boolean;
};

const CounterCard: React.FC<CounterCardProps> = ({
  backgroundColor,
  iconColor,
  icon,
  textTitle,
  textTitleFocus,
  valueText,
  isButton = false,
}) => {
  return (
    <Card
      sx={{
        maxHeight: "14.8rem",
        width: { xs: "22rem", md: "30rem" },
        alignItems: "center",
      }}
    >
      <CardContent>
        <div className={classes["topItems"]}>
          <div
            className={classes["topItems__icon"]}
            style={{
              backgroundColor: backgroundColor,
            }}
          >
            {React.cloneElement(icon as React.ReactElement, {
              sx: { color: iconColor, width: 24, height: 24 },
            })}
          </div>
          <CardActions>
            {isButton ? (
              <Button size="small" variant="outlined" sx={{ alignSelf: "end" }}>
                Создать
                <AddRounded />
              </Button>
            ) : null}
          </CardActions>
        </div>

        <p className={classes["text"]}>{textTitle}</p>
        <h2 className={classes["textValue"]}>{valueText}</h2>

        {textTitleFocus ? (
          <h2 className={classes["textValue"]}> {textTitleFocus}</h2>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default CounterCard;
