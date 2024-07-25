import React from "react";
import NiceModal from "@ebay/nice-modal-react";
import { AddBreakModal } from "@/modals";
import { Divider, Menu, MenuItem } from "@mui/material";
import {
  CalendarMonth,
  Event,
  CalendarToday,
  FreeBreakfast,
  DoNotDisturb,
  Warning,
  Delete,
  OpenInNew,
} from "@mui/icons-material";
import classes from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

interface IResourceDropdownMenuProps {
  anchorEl: null | HTMLElement;
  onClose: () => void;
  resourceId: string;
  username?: string;
}

const ResourceDropdownMenu: React.FC<IResourceDropdownMenuProps> = ({
  anchorEl,
  onClose,
  resourceId,
  username,
}) => {
  const navigate = useNavigate();
  const handleAddBreak = () => {
    NiceModal.show(AddBreakModal, {
      resourceId,
    });
  };

  const menuItems = [
    {
      icon: <CalendarMonth />,
      text: "Показать график",
    },
    {
      icon: <Event />,
      text: "Запись на неделю",
    },
    {
      icon: <CalendarToday />,
      text: "Запись на месяц",
    },
    {
      icon: <FreeBreakfast />,
      text: "Добавить перерыв",
      onClick: () => {
        handleAddBreak();
        onClose();
      },
    },
    {
      icon: <DoNotDisturb />,
      text: "Удалить все перерывы",
    },
    {
      icon: <Warning />,
      text: "Поставить отгул",
    },
    {
      icon: <Delete />,
      text: "Удалить смену",
    },
  ];

  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
      {menuItems.map((item, index) => (
        <MenuItem key={index} onClick={item.onClick}>
          <div className={classes["menu__item"]}>
            <div className={classes["menu__item--icon"]}>{item.icon}</div>
            <span>{item.text}</span>
          </div>
        </MenuItem>
      ))}
      <Divider />
      <MenuItem
        onClick={() => {
          navigate(`/employees/${resourceId}`, {
            state: { username: username || "" },
          });
          onClose;
        }}
      >
        <div className={classes["menu__item"]}>
          <div className={classes["menu__item--icon"]}>
            <OpenInNew />
          </div>
          <span>Карта соотрудника</span>
        </div>
      </MenuItem>
    </Menu>
  );
};

export default ResourceDropdownMenu;
