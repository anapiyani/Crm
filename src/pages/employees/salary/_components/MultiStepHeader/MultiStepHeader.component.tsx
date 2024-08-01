import { Divider } from "@mui/material";
import classes from "./styles.module.scss";

const HeaderTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={classes.header}>
      <div className={classes.header__content}>
        <h2>{children}</h2>
      </div>
      <Divider />
    </div>
  );
};

export default HeaderTemplate;
