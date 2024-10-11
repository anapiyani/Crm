import React, { useEffect, useState, useCallback } from "react";
import ModalWindow from "@/components/modal-window/modal-window";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import classes from "@/modals/home/styles.module.scss";
import ResponsiveTabs from "@/components/tabs/tabs.component";
import { eventTabs, header, bodyData } from "./data";
import Grid from "@mui/material/Unstable_Grid2";
import { Button, CircularProgress, Divider } from "@mui/material";
import TableVertical from "@/components/tables/tableVertical/vertical-info-card";
import TableHorizontal from "@/components/tables/table-horizontal/horizontal-info-card";
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
  PlayArrow,
  RemoveRedEye,
} from "@mui/icons-material";
import {
  useAddServiceForAppointment,
  useDeleteAppointmentService,
  useTemporaryDeleteAppointment,
  useUpdateAppointmentStatus,
} from "@/service/appointments/appointments.hook";
import EventDetailsThirdTab from "./_tabs/event-details-third-tab";
import classNames from "classnames";
import { mainInfoEmployee } from "@/service/employee/employee.service";
import { getDeposit } from "@/service/client/client.service";
import { ITableRowData } from "../_components/reusable-service-table/reusable-service-table";
import {
  IAppointmentServiceToAdd,
  IServicesAdd,
} from "@/ts/appointments.interface";
import toast from "react-hot-toast";

interface IEventDetailsModalProps {
  appointmentId: number;
}

const EventDetails: React.FC<IEventDetailsModalProps> = ({ appointmentId }) => {
  const modal = useModal();
  const deleteServiceMutation = useDeleteAppointmentService();
  const addServicesMutation = useAddServiceForAppointment();
  const [currentTab, setCurrentTab] = useState(0);
  const [page, setPage] = useState(1);
  const TemporaryDeleteAppointment = useTemporaryDeleteAppointment();
  const updateAppointmentStatus = useUpdateAppointmentStatus().mutate;
  const [serviceAppointments, setServiceAppointments] =
    useState<IServicesAdd | null>(null);

  const onAddServices = (servicesData: ITableRowData[]) => {
    const appointment_services: IAppointmentServiceToAdd[] = servicesData.map(
      (item) => ({
        parameter: Number(item.parameter_id),
        quantity: item.quantity,
        service: item.service_id,
      }),
    );

    const servicesToAdd: IServicesAdd = {
      appointment_services,
    };

    setServiceAppointments(servicesToAdd);
  };

  const onDeleteService = (service_id: number) => {
    deleteServiceMutation.mutate({ id: appointmentId, services: [service_id] });
  };

  const handleSaveServicesClick = () => {
    if (serviceAppointments) {
      addServicesMutation.mutate({
        id: appointmentId.toString(),
        services: serviceAppointments,
      });
    } else {
      toast.error("Выберите минимум 1 услугу");
    }

    if (addServicesMutation.isSuccess) {
      setServiceAppointments(null);
      modal.hide();
    } else if (addServicesMutation.isError) {
      toast.error("Ошибка при добавлении");
      modal.hide();
    }
  };

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

  const { data: userInfoData, isLoading: userInfoLoading } = useQuery({
    queryKey: ["mainInfoEmployee", clientId],
    queryFn: () => (clientId ? mainInfoEmployee(Number(clientId)) : undefined),
    enabled: !!clientId,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const { data: userDepositData, isLoading: userDepositLoading } = useQuery({
    queryKey: ["userDepositData", clientId],
    queryFn: () => (clientId ? getDeposit(Number(clientId)) : undefined),
    enabled: !!clientId,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

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

  const refetchAll = useCallback(() => {
    if (clientId) {
      customerRefetch();
      noDataRefetch();
      plannedRefetch();
      deletedRefetch();
    }
  }, [
    clientId,
    customerRefetch,
    deletedRefetch,
    noDataRefetch,
    plannedRefetch,
  ]);

  useEffect(() => {
    if (appointmentId) {
      refetch();
    }
    refetchAll();
  }, [appointmentId, refetch, refetchAll]);

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
    value: number,
  ) => {
    setPage(value);
  };

  const mainTableData = [
    { property: "Автосегмент", value: "Не указано" },
    { property: "ID клиента", value: userInfoData?.user_id },
    {
      property: "Категория",
      value: userInfoData?.category ? userInfoData?.category : "Без категории",
    },
    { property: "Фамилия", value: userInfoData?.last_name },
    { property: "Имя", value: userInfoData?.first_name },
    { property: "Моб. телефон", value: userInfoData?.phone_number },
    {
      property: "Рассылка SMS",
      value: userInfoData?.sms_notification
        ? "Запрет на рассылку"
        : "Разрешено",
    },
  ];

  const additionalInfoTableData = [
    {
      property: "1-е посещение",
      value: userInfoData?.first_visit
        ? new Date(userInfoData.first_visit).toLocaleString("ru-RU", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "Не указано",
    },

    {
      property: "Род занятий",
      value: userInfoData?.occupation ? userInfoData?.occupation : "Не указано",
    },
    { property: "Дата рождения", value: userInfoData?.date_of_birth },
    {
      property: "Пол",
      value: userInfoData?.gender ? userInfoData?.gender : "Не указан",
    },
    { property: "Анкета", value: userInfoData?.description ? "Есть" : "Нет" },
    {
      property: "Привлечение",
      value: userInfoData?.invite_source
        ? userInfoData?.invite_source
        : "Не указано",
    },
    { property: "Удобство расположения", value: "Не указано" },
    {
      property: "Город",
      value: userInfoData?.city ? userInfoData?.city : "Не указано",
    },
    {
      property: "Дата добавления",
      value: userInfoData?.start_date
        ? new Date(userInfoData.start_date).toLocaleString("ru-RU", {})
        : "Не указано",
    },
    { property: "Добавил сотрудник", value: userInfoData?.employee },
  ];

  const discountsTableData = [
    {
      property: "Тип скидки",
      value: userInfoData?.personal_discount?.type.name
        ? userInfoData?.personal_discount?.type.name
        : "Отсутствует",
    },
    {
      property: "Скидка",
      value: userInfoData?.personal_discount?.promotion_name
        ? userInfoData?.personal_discount.promotion_name
        : "Отсутствует",
    },
  ];

  const financeTableData = [
    {
      property: "Депозит",
      value: userDepositData?.balance ? userDepositData?.balance : "0",
      link: "/clients/deposits/history",
      linkLabel: "История",
    },
  ];

  const contactsTableData = [
    {
      type: "Моб. телефон",
      contact: userInfoData?.phone_number,
      primary: true,
    },
  ];

  const commentsTableData = [{ value: "Нет ни одного комментария" }];

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
              <EventDetailsFirstTab
                onAddServices={onAddServices}
                data={singleAppointmentData}
                onDeleteService={onDeleteService}
              />
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
        currentTab === 2 && classes["event-details__modal"],
      )}
      withButtons={false}
      withoutTitle={true}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
        <div className={classes["event-details__header"]}>
          <h2 className={classes["event-details__header--text"]}>
            Запись клиента
          </h2>{" "}
          <div>
            {singleAppointmentData?.status === "scheduled" && (
              <div className={classes["event-details__header--buttons"]}>
                <Button
                  sx={{ height: "4rem" }}
                  color="error"
                  variant="outlined"
                  startIcon={<PlayArrow />}
                  onClick={() => {
                    updateAppointmentStatus({
                      appointment_id: appointmentId,
                      status: "underway",
                    });
                  }}
                >
                  Начать
                </Button>
                <Button
                  sx={{ height: "4rem" }}
                  variant="outlined"
                  startIcon={<CreditCard />}
                  onClick={() => {
                    updateAppointmentStatus({
                      appointment_id: appointmentId,
                      status: "underway",
                    });

                    window.location.assign(`/visits/${appointmentId}`);
                  }}
                >
                  Начать и оплатить
                </Button>
              </div>
            )}
            {singleAppointmentData?.status === "underway" && (
              <div className={classes["event-details__header--buttons"]}>
                <Button
                  sx={{
                    height: "4rem",
                    color: "var(--neutral-500)",
                    borderColor: "var(--neutral-500)",
                  }}
                  variant="outlined"
                  onClick={() => {
                    updateAppointmentStatus({
                      appointment_id: appointmentId,
                      status: "scheduled",
                    });
                  }}
                >
                  Отменить начало записи
                </Button>
                <Button
                  sx={{ height: "4rem" }}
                  variant="outlined"
                  startIcon={<CreditCard />}
                  onClick={() => {
                    window.location.assign(`/visits/${appointmentId}`);
                  }}
                >
                  Оплатить
                </Button>
              </div>
            )}
            {singleAppointmentData?.status === "completed" && (
              <div className={classes["event-details__header--buttons"]}>
                <Button
                  sx={{ height: "4rem" }}
                  variant="outlined"
                  startIcon={<RemoveRedEye />}
                  onClick={() => {
                    window.location.assign(`/visits/${appointmentId}`);
                  }}
                >
                  Посмотреть запись
                </Button>
              </div>
            )}
          </div>
        </div>
        <Divider />
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
              onClick={() =>
                TemporaryDeleteAppointment.mutate({
                  id: appointmentId,
                  is_deleted: true,
                  reason_deleted: null,
                })
              }
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
              onClick={handleSaveServicesClick}
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
