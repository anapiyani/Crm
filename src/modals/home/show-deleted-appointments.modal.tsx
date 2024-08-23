import React, { useEffect, useMemo } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import ModalWindow from "@/components/modal-window/modal-window";
import { useQuery } from "@tanstack/react-query";
import { getAllDeletedAppointments } from "@/service/appointments/appointments.service";
import EventPlannedTable from "./_components/event-planned-table/event-planned-table";
import { transformDataToTableFormatNew } from "@/utils/transform-table-data";
import { CircularProgress } from "@mui/material";

const ShowDeletedAppointments = () => {
  const modal = useModal();
  const { data: deletedAppointmentsData, isPending: deleteAppointmentPending } =
    useQuery({
      queryKey: ["deletedAppointments"],
      queryFn: () => getAllDeletedAppointments(),
    });

  const deletedAppointmentsHeader = [
    { id: "planned_id", numeric: true, label: "№" },
    { id: "date", numeric: false, label: "Дата" },
    { id: "client", numeric: false, label: "Клиент" },
    { id: "service", numeric: false, label: "Услуги" },
    { id: "employee", numeric: false, label: "Сотрудник" },
    { id: "online", numeric: false, label: "Онлайн" },
    { id: "deleted_by", numeric: false, label: "Удалил" },
  ];

  const transformedDeletedData = deletedAppointmentsData
    ? transformDataToTableFormatNew(
        deletedAppointmentsData || [],
        deletedAppointmentsHeader
      )
    : [];

  useEffect(() => {
    setTimeout(() => {
      const res = transformDataToTableFormatNew(
        deletedAppointmentsData || [],
        deletedAppointmentsHeader
      );
      console.log(deletedAppointmentsData);
      console.log(res);
    }, 1000);
  }, [deletedAppointmentsData]);

  console.log("transformedDeletedData", transformedDeletedData);

  return (
    <ModalWindow
      title={"Удаленные записи"}
      open={modal.visible}
      handleClose={() => modal.hide()}
    >
      {deleteAppointmentPending ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <>
          <EventPlannedTable
            headCells={deletedAppointmentsHeader}
            data={transformedDeletedData}
          />
        </>
      )}
    </ModalWindow>
  );
};

const ShowDeletedAppointmentsModal = NiceModal.create(ShowDeletedAppointments);
export default ShowDeletedAppointmentsModal;
