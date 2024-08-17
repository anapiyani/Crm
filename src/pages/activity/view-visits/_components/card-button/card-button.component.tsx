import { SvgIconProps } from "@mui/material";
import classes from "./styles.module.scss";

const CardButton = ({
  text,
  icon: Icon,
  backgroundIcon,
  colorIcon,
}: {
  text: string;
  icon: React.ElementType<SvgIconProps>;
  backgroundIcon: string;
  colorIcon: string;
}) => {
  return (
    <div className={classes.card}>
      <div className={classes.card__content}>
        <div className={classes.card__content__icon}>
          <Icon
            sx={{
              backgroundColor: backgroundIcon,
              color: colorIcon,
              padding: "8px",
              fontSize: "42px",
              borderRadius: "50px",
            }}
          />
        </div>
        <div className={classes.card__content__text}>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default CardButton;
