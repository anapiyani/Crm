import { Button, Divider } from "@mui/material";
import classes from "./styles.module.scss";

const HeaderTemplate = ({
  children,
  hasPlus,
  onPlusClick,
  hasleftChildren,
}: {
  children: React.ReactNode;
  hasPlus?: boolean;
  onPlusClick?: () => void;
  hasleftChildren?: React.ReactNode;
}) => {
  return (
    <div className={classes.header}>
      <div className={classes.header__content}>
        <h2>{children}</h2>
        {hasPlus && <Button onClick={onPlusClick}>+</Button>}
        {hasleftChildren && hasleftChildren}
      </div>
      <Divider />
    </div>
  );
};

export default HeaderTemplate;
