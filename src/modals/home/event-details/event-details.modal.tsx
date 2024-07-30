import React, { useEffect, useState } from "react";
import ModalWindow from "@/components/modal-window/modal-window";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import classes from "@/modals/home/styles.module.scss";
import ResponsiveTabs from "@/components/tabs/tabs.component";
import { eventTabs, eventTableData, header, bodyData } from "./data";
import Grid from "@mui/material/Unstable_Grid2";
import { CircularProgress, Divider } from "@mui/material";
import TableVertical from "@/components/tables/tableVertical/vertical-info-card";
import TableHorizontal from "@/components/tables/table-horizontal/horizontal-info-card";
import {
  mainTableData,
  additionalInfoTableData,
  discountsTableData,
  financeTableData,
  contactsTableData,
  commentsTableData,
} from "@/pages/clients/client-card/data";
import EmployeeVisitsTable from "@/pages/employees/employee-visits/visits-table/employee-visits-table";
import ChangeHistoryTable from "@/components/tables/table-change-history/table-change-history";
import { useQuery } from "@tanstack/react-query";
import { getAppointmentById } from "@/service/appointments/appointments.service";
import EventDetailsFirstTab from "./_tabs/event-details-first-tab";

interface IEventDetailsModalProps {
  appointmentId: number;
}

const EventDetails: React.FC<IEventDetailsModalProps> = ({ appointmentId }) => {
  const modal = useModal();
  const [currentTab, setCurrentTab] = useState(0);
  const [page, setPage] = useState(1);

  const {
    data: singleAppointmentData,
    isPending: singleAppointmentPending,
    refetch,
  } = useQuery({
    queryKey: ["appointmentByIdData", appointmentId],
    queryFn: () => getAppointmentById(appointmentId),
    enabled: false,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (appointmentId) {
      refetch();
    }
  }, [appointmentId, refetch]);

  const handleTabChange = (tabIndex: number) => {
    setCurrentTab(tabIndex);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const renderContent = () => {
    switch (currentTab) {
      case 0:
        return (
          <div>
            {singleAppointmentPending ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <CircularProgress />
              </div>
            ) : (
              <EventDetailsFirstTab data={singleAppointmentData} />
            )}
          </div>
        );
      case 1:
        return (
          <div>
            <Grid
              container
              sx={{
                flexDirection: { xs: "column" },
              }}
              rowSpacing={3}
            >
              <Grid container columnSpacing={3}>
                <Grid xs={6}>
                  <TableVertical
                    data={mainTableData}
                    title="Главное"
                    includeDropdown
                  />
                </Grid>
                <Grid xs={6}>
                  <TableVertical
                    data={additionalInfoTableData}
                    title="Доп. информация"
                  />
                </Grid>
              </Grid>

              <Grid container columnSpacing={3}>
                <Grid xs={6}>
                  <TableVertical data={discountsTableData} title="Скидки" />
                </Grid>
                <Grid xs={6}>
                  <TableVertical data={financeTableData} title="Финансы" />
                </Grid>
              </Grid>

              <Grid container columnSpacing={3}>
                <Grid xs={6}>
                  <TableHorizontal data={contactsTableData} title="Контакты" />
                </Grid>
                <Grid xs={6}>
                  <TableHorizontal
                    data={commentsTableData}
                    title="Комментарии"
                    hasTableHead={false}
                    showEyeIcon
                  />
                </Grid>
              </Grid>
            </Grid>
          </div>
        );
      case 2:
        return (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.8rem",
              }}
            >
              <p
                style={{
                  fontSize: "1.6rem",
                  color: "var(--brand-500)",
                  letterSpacing: 0.15,
                }}
              >
                Запланированные посещения
              </p>

              <Divider />
            </div>
            <EmployeeVisitsTable data={eventTableData} />
            <div style={{ display: "flex", flexDirection: "column" }}></div>
          </div>
        );
      case 3:
        return (
          <ChangeHistoryTable
            title="История изменений"
            header={header}
            bodyData={bodyData}
            paginationCount={1}
            paginationPage={page}
            onPageChange={handlePageChange}
          />
        );
      default:
        return <div>Default Content</div>;
    }
  };

  return (
    <ModalWindow
      title={"Запись клиента"}
      open={modal.visible}
      handleClose={() => modal.hide()}
      className={classes["u-p-0"]}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
        <ResponsiveTabs
          tabsData={eventTabs}
          currentTab={currentTab}
          onTabChange={handleTabChange}
          isWithLink={false}
          className={classes["tabs-modal"]}
        />
        {renderContent()}
      </div>
    </ModalWindow>
  );
};

const EventDetailsModal = NiceModal.create(EventDetails);
export default EventDetailsModal;
