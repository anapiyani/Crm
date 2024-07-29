import React from "react";
import { Card, Button, CardActions, CardContent } from "@mui/material";
import { ContentCut, AddRounded } from "@mui/icons-material";
import classes from "./styles.module.scss";

type CounterCardProps = {
  backgroundColor: string;
  iconColor: string;
  textTitle: string;
  textTitleFocus?: string;
  valueText: string | number;
  isButton?: boolean;
};

const CounterCard: React.FC<CounterCardProps> = (props) => {
  return (
    <Card

      sx={{
        maxHeight: "14.8",
        width: { xs: "22rem", md: "30rem" },
        alignItems: "center",
      }}
    >
      <CardContent>
        <div className={classes["topItems"]}>
          <div
            className={classes["topItems__icon"]}
            style={{
              backgroundColor: props.backgroundColor,
            }}
          >
            <ContentCut sx={{ color: props.iconColor, width: 24 }} />
          </div>
          <CardActions>
            {props.isButton ? (
              <Button size="small" variant="outlined" sx={{ alignSelf: "end" }}>
                Создать
                <AddRounded />
              </Button>
            ) : null}
          </CardActions>
        </div>

        <p className={classes["text"]}>{props.textTitle}</p>
        {props.textTitleFocus ? (
          <h2 className={classes["textValue"]}> {props.textTitleFocus}</h2>
        ) : null}

        <h2 className={classes["textValue"]}>{props.valueText}</h2>
      </CardContent>
    </Card>
  );
};

export default CounterCard;
