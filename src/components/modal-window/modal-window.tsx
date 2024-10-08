import React, { useEffect } from "react";
import { Backdrop, Button, Divider } from "@mui/material";
import { Clear, Done } from "@mui/icons-material";
import classes from "./styles.module.scss";
import classNames from "classnames";

interface ModalWindowProps {
  title: string;
  open: boolean;
  handleClose: () => void;
  handleSave?: () => void;
  children: React.ReactNode;
  className?: string;
  withButtons?: boolean;
  titleStyles?: React.CSSProperties;
  withoutTitle?: boolean;
  afterClose?: () => void;
  isFront?: boolean;
}

const ModalWindow: React.FC<ModalWindowProps> = ({
  title,
  open,
  handleClose,
  handleSave,
  children,
  className,
  withButtons = true,
  titleStyles,
  withoutTitle = false,
  afterClose,
  isFront = false,
}) => {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: isFront ? 9999999 : (theme) => theme.zIndex.drawer + 1,
      }}
      open={open}
      onClick={handleClose}
      onExited={afterClose}
    >
      <div className={classes["modal"]} onClick={(e) => e.stopPropagation()}>
        <div className={classes["modal__window"]}>
          {!withoutTitle && (
            <>
              <div className={classes["modal__window__header"]}>
                <h2
                  className={classes["modal__window__title"]}
                  style={titleStyles}
                >
                  {title}
                </h2>
              </div>
              <Divider />
            </>
          )}
          <div
            className={classNames(classes["modal__window__content"], className)}
          >
            {children}
          </div>
          {withButtons && (
            <div className={classes["modal__window__bottom"]}>
              <Button
                variant="outlined"
                onClick={handleClose}
                startIcon={<Clear />}
              >
                Отменить
              </Button>
              <Button
                variant="contained"
                disableElevation
                startIcon={<Done />}
                onClick={handleSave}
              >
                Сохранить
              </Button>
            </div>
          )}
        </div>
      </div>
    </Backdrop>
  );
};

export default ModalWindow;
