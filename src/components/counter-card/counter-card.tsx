import React from "react";
import { Card, Button, CardActions, CardContent } from "@mui/material";
import { ContentCut, AddRounded } from "@mui/icons-material";
import classes from "./styles.module.scss";

type CounterCardProps = {
  backgroundColor: string;
  iconColor: string;
  textTitle: string;
  textTitleFocus?: string;
  valueText: string;
  isButton?: boolean;
};

const CounterCard: React.FC<CounterCardProps> = (props) => {
  return (
    <Card
      sx={{
        maxHeight: "14.8",
        maxWidth: "30rem",
        marginTop: 9,
        marginLeft: 8,
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
            <ContentCut sx={{ color: props.iconColor }} />
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
