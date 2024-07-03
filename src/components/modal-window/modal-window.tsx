import { Backdrop, Button, Divider } from "@mui/material";
import { Clear, Done } from "@mui/icons-material";
import { ex } from "node_modules/@fullcalendar/core/internal-common";
import { useState } from "react";
import classes from "./styles.module.scss";

interface ModalWindowProps {
  children: React.ReactNode;
  title: string;
}

const ModalWindow: React.FC<ModalWindowProps> = ({ children, title }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <Button onClick={handleOpen}>Show backdrop</Button>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        className="backdrop"
      >
        <div className={classes["modal"]}>
          <div className={classes["modal__window"]}>
            <div className={classes["modal__window__header"]}>
              <h2 className={classes["modal__window__title"]}>{title}</h2>
            </div>
            <Divider />
            <div className={classes["modal__window__content"]}>{children}</div>
            <div className={classes["modal__window__bottom"]}>
              <Button variant="outlined" onClick={handleClose}>
                <Clear />
                Отменить
              </Button>
              <Button variant="contained" disableElevation>
                <Done />
                Сохранить
              </Button>
            </div>
          </div>
        </div>
      </Backdrop>
    </div>
  );
};

export default ModalWindow;
