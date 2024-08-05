import React, { useEffect, useState } from "react";
import ModalWindow from "@/components/modal-window/modal-window";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import classes from "@/modals/home/styles.module.scss";
import ResponsiveTabs from "@/components/tabs/tabs.component";
import { eventTabs, header, bodyData } from "./data";
import Grid from "@mui/material/Unstable_Grid2";
import { Button, CircularProgress } from "@mui/material";
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
import ChangeHistoryTable from "@/components/tables/table-change-history/table-change-history";
import { useQuery } from "@tanstack/react-query";
import {
  getAppointmentById,
  getCustomerAppointmentHistoryById,
  getCustomerAppointmentNoShowById,
  getCustomerAppointmentPlannedById,
  getCustomerDeletedAppointments,
} from "@/service/appointments/appointments.service";
import EventDetailsFirstTab from "./_tabs/event-details-first-tab";
import {
  Check,
  Close,
  Comment,
  CreditCard,
  Delete,
  Mail,
  Notifications,
} from "@mui/icons-material";
import { useTemporaryDeleteAppointment } from "@/service/appointments/appointments.hook";
import EventDetailsThirdTab from "./_tabs/event-details-third-tab";
import classNames from "classnames";

interface IEventDetailsModalProps {
  appointmentId: number;
}

const EventDetails: React.FC<IEventDetailsModalProps> = ({ appointmentId }) => {
  const modal = useModal();
  const [currentTab, setCurrentTab] = useState(0);
  const [page, setPage] = useState(1);
  const TemporaryDeleteAppointment = useTemporaryDeleteAppointment();

  const {
    data: singleAppointmentData,
    isPending: singleAppointmentPending,
    refetch,
  } = useQuery({
    queryKey: ["appointmentByIdData", appointmentId],
    queryFn: () => getAppointmentById(appointmentId),
    enabled: !!appointmentId,
    staleTime: 1000 * 60 * 5,
  });

  const clientId = singleAppointmentData?.client?.id;

  const {
    data: customerAppointmentHistoryData,
    isPending: customerAppointmentPending,
    refetch: customerRefetch,
  } = useQuery({
    queryKey: ["customerAppointmentHistoryData", clientId],
    queryFn: () =>
      clientId ? getCustomerAppointmentHistoryById(clientId) : undefined,
    enabled: !!clientId,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const { data: customerAppointmentNoShowData, refetch: noDataRefetch } =
    useQuery({
      queryKey: ["customerAppointmentNoShowData", clientId],
      queryFn: () =>
        clientId ? getCustomerAppointmentNoShowById(clientId) : undefined,
      enabled: !!clientId,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    });

  const { data: customerAppointmentPlanned, refetch: plannedRefetch } =
    useQuery({
      queryKey: ["customerAppointmentPlanned", clientId],
      queryFn: () =>
        clientId ? getCustomerAppointmentPlannedById(clientId) : undefined,
      enabled: !!clientId,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    });

  const { data: customerDeletedAppointments, refetch: deletedRefetch } =
    useQuery({
      queryKey: ["customerDeletedAppointments", clientId],
      queryFn: () =>
        clientId ? getCustomerDeletedAppointments(clientId) : undefined,
      enabled: !!clientId,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    });

  useEffect(() => {
    if (appointmentId) {
      refetch();
    }
    if (clientId) {
      customerRefetch();
      noDataRefetch();
      plannedRefetch();
      deletedRefetch();
    }
  }, [
    appointmentId,
    clientId,
    customerRefetch,
    deletedRefetch,
    noDataRefetch,
    plannedRefetch,
    refetch,
  ]);

  if (customerAppointmentPending) {
    return (
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
    );
  }

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
          <div>
            <EventDetailsThirdTab
              finishedVisitsData={customerAppointmentHistoryData || []}
              plannedVisitsData={customerAppointmentPlanned || []}
              noShowData={customerAppointmentNoShowData || []}
              deletedData={customerDeletedAppointments || []}
            />
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

  const buttonClass = {
    fontSize: "1.4rem",
    height: "3.7rem",
    minWidth: "4rem",
    padding: "0",
  };

  return (
    <ModalWindow
      title={"Запись клиента"}
      open={modal.visible}
      handleClose={() => modal.hide()}
      className={classNames(
        classes["u-p-0"],
        currentTab === 2 && classes["event-details__modal"]
      )}
      withButtons={false}
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
        <div className={classes["event-details"]}>
          <div>
            <Button
              variant="outlined"
              startIcon={<Close />}
              sx={{
                fontSize: "1.4rem",
              }}
              onClick={() => modal.hide()}
            >
              Отменить
            </Button>
          </div>
          <div className={classes["event-details__right"]}>
            <Button
              variant="outlined"
              sx={{
                ...buttonClass,
              }}
            >
              <CreditCard />
            </Button>
            <Button
              variant="outlined"
              sx={{
                ...buttonClass,
              }}
            >
              <Mail />
            </Button>
            <Button
              variant="outlined"
              sx={{
                ...buttonClass,
              }}
            >
              <Notifications />
            </Button>
            <Button
              variant="outlined"
              sx={{
                ...buttonClass,
              }}
            >
              <Comment />
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<Delete />}
              sx={{
                fontSize: "1.4rem",
              }}
              onClick={() => TemporaryDeleteAppointment.mutate(appointmentId)}
            >
              Удалить
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Check />}
              sx={{
                fontSize: "1.4rem",
              }}
            >
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </ModalWindow>
  );
};

const EventDetailsModal = NiceModal.create(EventDetails);
export default EventDetailsModal;
