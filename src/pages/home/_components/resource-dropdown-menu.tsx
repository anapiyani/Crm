import React from "react";
import NiceModal from "@ebay/nice-modal-react";
import {
  AddBreakModal,
  DeleteAllBreaksConfirmationModal,
  DeleteEmployeeScheduleConfirmationModal,
  TakeDayOffConfirmationModal,
} from "@/modals";
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
  date: string;
  scheduleId: string;
  username?: string;
  handleOpenSchedule: (id: number) => void;
  handleMonthSchedule?: (id: number, employee_name: string) => void;
  handleWeekSchedule?: (id: number) => void;
}

const ResourceDropdownMenu: React.FC<IResourceDropdownMenuProps> = ({
  anchorEl,
  onClose,
  scheduleId,
  resourceId,
  username,
  handleOpenSchedule,
  date,
  handleMonthSchedule,
  handleWeekSchedule,
}) => {
  const navigate = useNavigate();
  const handleAddBreak = () => {
    NiceModal.show(AddBreakModal, {
      resourceId,
      date: date,
    });
  };

  const handleDeleteAllBreaks = () => {
    NiceModal.show(DeleteAllBreaksConfirmationModal, {
      date: date,
      employee_id: resourceId,
    });
  };

  const handleDeleteEmployeeSchedule = (date: string) => {
    NiceModal.show(DeleteEmployeeScheduleConfirmationModal, {
      employee_id: scheduleId,
      selectedDate: date,
    });
  };

  const handleTakeDayoff = () => {
    NiceModal.show(TakeDayOffConfirmationModal, {
      employee_id: resourceId,
      date: date,
    });
  };

  const menuItems = [
    {
      icon: <CalendarMonth />,
      text: "Показать график",
      onClick: () => {
        handleOpenSchedule(Number(resourceId));
        onClose();
      },
    },
    {
      icon: <Event />,
      text: "Запись на неделю",
      onClick: () => {
        handleWeekSchedule && handleWeekSchedule(Number(resourceId));
        onClose();
      },
    },
    {
      icon: <CalendarToday />,
      text: "Запись на месяц",
      onClick: () => {
        handleMonthSchedule &&
          handleMonthSchedule(Number(resourceId), username || "");
        onClose();
      },
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
      onClick: () => {
        handleDeleteAllBreaks();
        onClose();
      },
    },
    {
      icon: <Warning />,
      text: "Поставить отгул",
      onClick: () => {
        handleTakeDayoff();
        onClose();
      },
    },
    {
      icon: <Delete />,
      text: "Удалить смену",
      onClick: () => {
        handleDeleteEmployeeSchedule(date);
        onClose();
      },
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
