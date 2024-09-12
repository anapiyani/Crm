import React, { useState } from "react";

import classes from "./styles.module.scss";
import { Divider } from "@mui/material";
import { IAppointmentHistory } from "@/ts/appointments.interface";
import EventHistoryTable from "../../_components/event-history-table/event-history-table";
import EventPlannedTable from "../../_components/event-planned-table/event-planned-table";
import { transformDataToTableFormat } from "@/utils/transform-table-data";

interface IEventDetailsThirdTabProps {
  finishedVisitsData: IAppointmentHistory[];
  plannedVisitsData: IAppointmentHistory[];
  noShowData: IAppointmentHistory[];
  deletedData: IAppointmentHistory[];
  isClientCard?: boolean;
}

const plannedTableHeadCells = [
  { id: "planned_id", numeric: true, label: "№" },
  { id: "id", numeric: false, label: "ID" },
  { id: "date", numeric: false, label: "Дата" },
  { id: "time", numeric: false, label: "Время" },
  { id: "status", numeric: false, label: "Статус" },
  { id: "employee", numeric: false, label: "Сотрудник" },
  { id: "service", numeric: false, label: "Услуги" },
  { id: "price", numeric: true, label: "Сумма" },
  { id: "admin", numeric: false, label: "Записал" },
];

const deletedTableHeadCells = [
  { id: "planned_id", numeric: true, label: "№" },
  { id: "id", numeric: false, label: "ID" },
  { id: "date", numeric: false, label: "Дата" },
  { id: "time", numeric: false, label: "Время" },
  { id: "status", numeric: false, label: "Статус" },
  { id: "reason", numeric: false, label: "Причина" },
  { id: "deleted_by", numeric: false, label: "Удалил" },
  { id: "employee", numeric: false, label: "Сотрудник" },
  { id: "service", numeric: false, label: "Услуги" },
  { id: "price", numeric: true, label: "Сумма" },
  { id: "admin", numeric: false, label: "Записал" },
];

const noShowTableHeadCells = [
  { id: "planned_id", numeric: true, label: "№" },
  { id: "id", numeric: false, label: "ID" },
  { id: "date", numeric: false, label: "Дата" },
  { id: "time", numeric: false, label: "Время" },
  { id: "status", numeric: false, label: "Статус" },
  { id: "employee", numeric: false, label: "Сотрудник" },
  { id: "service", numeric: false, label: "Услуги" },
  { id: "price", numeric: true, label: "Сумма" },
  { id: "admin", numeric: false, label: "Записал" },
];

const EventDetailsThirdTab: React.FC<IEventDetailsThirdTabProps> = ({
  finishedVisitsData,
  plannedVisitsData,
  noShowData,
  deletedData,
  isClientCard,
}) => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const transformedPlannedData = transformDataToTableFormat(
    plannedVisitsData,
    plannedTableHeadCells,
  );
  const transformedDeletedData = transformDataToTableFormat(
    deletedData,
    deletedTableHeadCells,
  );
  const transformedNoShowData = transformDataToTableFormat(
    noShowData,
    noShowTableHeadCells,
  );

  const tabsData = [
    {
      id: 0,
      title: "Завершенные посещения /",
      component: <EventHistoryTable data={finishedVisitsData} />,
    },
    {
      id: 1,
      title: "Запланированные посещения /",
      component: (
        <EventPlannedTable
          data={transformedPlannedData}
          headCells={plannedTableHeadCells}
        />
      ),
    },
    {
      id: 2,
      title: "Удаленные записи /",
      component: (
        <EventPlannedTable
          data={transformedDeletedData}
          headCells={deletedTableHeadCells}
        />
      ),
    },
    {
      id: 3,
      title: "Клиент не пришел",
      component: (
        <EventPlannedTable
          data={transformedNoShowData}
          headCells={noShowTableHeadCells}
        />
      ),
    },
  ];

  const handleTabChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}
      className={classes[""]}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "0.8rem",
        }}
      >
        {tabsData.map((tab) => (
          <p
            key={tab.id}
            style={{
              fontSize: isClientCard ? "2.4rem" : "1.6rem",
              color: tabIndex === tab.id ? "var(--brand-500)" : "#000000",
              letterSpacing: 0.15,
              cursor: "pointer",
            }}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.title}
          </p>
        ))}

        <Divider />
      </div>
      <Divider />
      {tabsData[tabIndex].component}
      <div style={{ display: "flex", flexDirection: "column" }}></div>
    </div>
  );
};

export default EventDetailsThirdTab;
