import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import toast from "react-hot-toast";
import { Button, Divider, TextField } from "@mui/material";
import {
  Add,
  Clear,
  Chat,
  AttachMoney,
  Done,
  Help,
  AddCircle,
  Close,
} from "@mui/icons-material";

import ModalWindow from "@/components/modal-window/modal-window";
import { ChooseServiceModal } from "..";
import CustomAutoComplete from "@/components/autocomplete/custom-autocomplete.component";
import { searchEmployee } from "@/service/employee/employee.service";
import {
  IAppointmentCreateForm,
  IAppointmentService,
} from "@/ts/appointments.interface";
import {
  getServiceForEmployeeById,
  getServiceParametersById,
} from "@/service/services/services.service";
import { useCreateAppointment } from "@/service/appointments/appointments.hook";
import classNames from "classnames";
import classes from "./styles.module.scss";

import {
  DatePicker,
  LocalizationProvider,
  TimeField,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import ReusableServiceTable from "./_components/reusable-service-table/reusable-service-table";
import { getHierarchyByEmployeeId } from "@/service/hierarchy/hierarchy.service";
import { flattenEmployeeHierarchy } from "@/utils/flatten-employee-hierarchy";

interface ICreateAppointmentModalProps {
  start: string;
  end: string;
  employee: string;
}

const initialAppointmentForm: IAppointmentCreateForm = {
  client_id: 0,
  employee_id: 0,
  dates: [],
  start_times: [],
  end_times: [],
  discount_custom: "",
  notes: "",
  type: "service",
  appointment_services: [],
  material_purchases: [],
};

interface IOption {
  label: string;
  value: number;
}

const CreateAppointment: React.FC<ICreateAppointmentModalProps> = ({
  start,
  end,
  employee,
}) => {
  const modal = useModal();
  const [appointmentForm, setAppointmentForm] = useState<
    IAppointmentCreateForm
  >(initialAppointmentForm);
  const [selectedEmployee, setSelectedEmployee] = useState<IOption | null>(
    null
  );
  const [selectedServices, setSelectedServices] = useState<IOption | null>(
    null
  );
  const [selectedParameters, setSelectedParameters] = useState<IOption | null>(
    null
  );
  const [parametersData, setParametersData] = useState<
    {
      id: number;
      name: string;
      price: number;
      type: string;
    }[]
  >([]);
  const [serviceTableData, setServiceTableData] = useState<
    {
      id: number;
      service: string;
      service_id: number;
      price?: string;
      unitPrice: number;
      quantity: number;
      parameter: string;
      parameter_id: number;
    }[]
  >();
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);
  const [appointmentDates, setAppointmentDates] = useState<
    {
      id: number;
      date: Dayjs;
      start_time: Dayjs;
      end_time: Dayjs;
    }[]
  >([
    {
      id: Date.now(),
      date: dayjs(start.split(" ")[0]),
      start_time: dayjs(`${start.split(" ")[0]} ${start.split(" ")[1]}`),
      end_time: dayjs(`${start.split(" ")[0]} ${end.split(" ")[1]}`),
    },
  ]);
  const AppointmentMutation = useCreateAppointment();

  useEffect(() => {
    setAppointmentDates([
      {
        id: Date.now(),
        date: dayjs(start.split(" ")[0]),
        start_time: dayjs(`${start.split(" ")[0]} ${start.split(" ")[1]}`),
        end_time: dayjs(`${start.split(" ")[0]} ${end.split(" ")[1]}`),
      },
    ]);
  }, [start, end]);

  const { data: clientsData } = useQuery({
    queryKey: ["employeeData"],
    queryFn: () =>
      searchEmployee({
        role: "customer",
      }),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: servicesDataByEmployee } = useQuery({
    queryKey: ["servicesData", employee],
    queryFn: () => getServiceForEmployeeById(employee),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  // const { data: parametersData } = useQuery({
  //   queryKey: ["parametersData", selectedServices?.value],
  //   queryFn: () => getServiceParametersById(selectedServices?.value as number),
  //   enabled: selectedServices !== null && selectedServices?.value !== 0,
  //   staleTime: Infinity,
  //   refetchOnWindowFocus: false,
  // });

  const { data: employeeHierarchyData } = useQuery({
    queryKey: ["employeeHierarchyData", employee],
    queryFn: () => getHierarchyByEmployeeId(employee),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const buttonClass = {
    fontSize: "1.1rem",
    fontWeight: 600,
    height: "4rem",
  };

  const handleSubmit = (appointmentForm: IAppointmentCreateForm) => {
    if (!selectedEmployee) {
      toast.error("Выберите клиента");
      return;
    }
    if (!serviceTableData) {
      toast.error("Выберите услуги");
      return;
    }

    const services: IAppointmentService[] = serviceTableData.map((service) => ({
      service: service.service_id,
      price: service.price,
      quantity: service.quantity,
      materials: [],
      parameter_id: service.parameter_id,
    }));

    console.log(services);
    const dates = appointmentDates.map((date) =>
      date.date.format("YYYY-MM-DD")
    );
    const start_times = appointmentDates.map((date) =>
      date.start_time.format("HH:mm")
    );
    const end_times = appointmentDates.map((date) =>
      date.end_time.format("HH:mm")
    );

    const updatedForm: IAppointmentCreateForm = {
      ...appointmentForm,
      client_id: selectedEmployee.value,
      employee_id: +employee,
      dates,
      start_times,
      end_times,
      appointment_services: services,
      material_purchases: [],
    };

    AppointmentMutation.mutate(updatedForm);
  };

  const handleAddService = () => {
    if (selectedServices && selectedParameters) {
      const service = servicesDataByEmployee?.find(
        (service) => service.service_id === selectedServices.value
      );
      if (service) {
        setServiceTableData([
          ...(serviceTableData || []),
          {
            id: Date.now(),
            service: selectedServices.label,
            service_id: selectedServices.value,
            quantity: 1,
            price: service.parameters
              .find((param) => param.id === selectedParameters.value)
              ?.price.toString(),
            unitPrice: Number(
              service.parameters
                .find((param) => param.id === selectedParameters.value)
                ?.price.toString()
            ),
            parameter: selectedParameters.label,
            parameter_id: selectedParameters.value,
          },
        ]);
      }
    }
    setSelectedParameters(null);
    setSelectedServices(null);
  };

  const handleDeleteServiceTableData = (id: number) => {
    serviceTableData &&
      setServiceTableData(serviceTableData.filter((item) => item.id !== id));
  };

  const handleAddDate = () => {
    setAppointmentDates([
      ...appointmentDates,
      {
        id: Date.now(),
        date: dayjs(start.split(" ")[0]),
        start_time: dayjs().hour(9).minute(0),
        end_time: dayjs().hour(10).minute(0),
      },
    ]);
  };

  const handleDeleteDate = (id: number) => {
    setAppointmentDates(appointmentDates.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    setServiceTableData(
      serviceTableData &&
        serviceTableData.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
    );
  };

  const handleSaveSelectedServices = (
    selectedServices: {
      id: number;
      parameter: {
        id: number;
        name: string;
        price: number;
      };
      quantity: number;
      serviceName: string;
      service_id: number;
    }[]
  ) => {
    console.log("asdasd", selectedServices);
    setServiceTableData((prevData) => {
      const newData = [...(prevData || [])];
      selectedServices.forEach((selectedService) => {
        const existingService = newData.find((item) => {
          item.service_id === selectedService.service_id;
          item.parameter_id === selectedService.parameter.id;
          item.price === selectedService.parameter.price.toString() + "тг";
        });

        if (existingService) {
          existingService.quantity = selectedService.quantity;
        } else {
          const temp = {
            id: selectedService.id,
            service: selectedService.serviceName,
            service_id: selectedService.service_id,
            price: selectedService.parameter.price.toString(),
            unitPrice: selectedService.parameter.price,
            quantity: selectedService.quantity,
            parameter: selectedService.parameter.name,
            parameter_id: selectedService.parameter.id,
          };
          newData.push(temp);
        }
      });
      return newData;
    });
  };

  return (
    <ModalWindow
      title={"Запись клиента"}
      open={modal.visible}
      handleClose={() => modal.hide()}
      className={classes["u-full-zero"]}
      withButtons={false}
      afterClose={modal.remove}
      titleStyles={{ zIndex: -99999 }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className={classes["create-appointment"]}>
          <p
            className={classNames(
              classes["create-appointment__params-text"],
              classes["u-mt-2"]
            )}
          >
            Основные параметры
          </p>
          <Divider />
          <div>
            <div className={classes["create-appointment__params"]}>
              <CustomAutoComplete
                className={classes["u-w-full"]}
                name="client"
                selectValue={"label"}
                label="Клиент"
                value={selectedEmployee}
                onChange={(value) => setSelectedEmployee(value)}
                options={
                  clientsData?.results
                    ? clientsData.results.map((client) => ({
                        label: `${client.first_name} ${client.last_name}`,
                        value: client.user_id,
                      }))
                    : []
                }
                placeholder="Фамилия Имя"
              />
              <div className={classes["create-appointment__params--icon"]}>
                <Button
                  sx={{
                    padding: "0",
                    minWidth: "3rem",
                  }}
                >
                  <Help />
                </Button>
                <Button
                  sx={{
                    padding: "0",
                    minWidth: "3rem",
                  }}
                  onClick={() => console.log(employee)}
                >
                  <AddCircle />
                </Button>
              </div>
            </div>
          </div>

          <div>
            {appointmentDates.map((dateEntry, index) => (
              <div
                key={dateEntry.id}
                className={classes["create-appointment__calendar"]}
              >
                <DatePicker
                  value={dateEntry.date}
                  onChange={(date) =>
                    setAppointmentDates(
                      appointmentDates.map((item) =>
                        item.id === dateEntry.id
                          ? { ...item, date: date as Dayjs }
                          : item
                      )
                    )
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "4rem",
                      fontSize: "1.4rem",
                    },
                  }}
                />
                <TimeField
                  value={dateEntry.start_time}
                  format="HH:mm"
                  onChange={(newValue) =>
                    setAppointmentDates(
                      appointmentDates.map((item) =>
                        item.id === dateEntry.id
                          ? { ...item, start_time: newValue as Dayjs }
                          : item
                      )
                    )
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "4rem",
                      fontSize: "1.4rem",
                    },
                  }}
                />
                <TimeField
                  value={dateEntry.end_time}
                  format="HH:mm"
                  onChange={(newValue) =>
                    setAppointmentDates(
                      appointmentDates.map((item) =>
                        item.id === dateEntry.id
                          ? { ...item, end_time: newValue as Dayjs }
                          : item
                      )
                    )
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "4rem",
                      fontSize: "1.4rem",
                    },
                  }}
                />
                {index === 0 ? (
                  <Button
                    variant="outlined"
                    sx={{
                      minWidth: "4rem",
                      padding: "0",
                      height: "4rem",
                    }}
                    onClick={handleAddDate}
                  >
                    <Add />
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    sx={{
                      minWidth: "4rem",
                      padding: "0",
                      height: "4rem",
                    }}
                    onClick={() => handleDeleteDate(dateEntry.id)}
                  >
                    <Close />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className={classes["u-mt-1"]}>
            <div className={classes["create-appointment__services"]}>
              <p className={classes["create-appointment__params-text"]}>
                Услуги
              </p>
              <Divider />
              <Button
                variant="text"
                startIcon={<Add />}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
                onClick={() => {
                  NiceModal.show(ChooseServiceModal, {
                    onSave: handleSaveSelectedServices,
                    flattenData: flattenEmployeeHierarchy(
                      employeeHierarchyData || []
                    ),
                  }).then((data) => {
                    console.log("sdasdasd", data);
                  });
                }}
              >
                Выбрать услуги
              </Button>
            </div>
            <Divider />
            <div className={classes["create-appointment__services--select"]}>
              <CustomAutoComplete
                className={classes["u-w-full"]}
                name="service"
                selectValue={"label"}
                size="small"
                value={selectedServices}
                onChange={(value) => {
                  setSelectedServices(value);

                  setParametersData(
                    servicesDataByEmployee?.find(
                      (service) => service.id === value?.value
                    )?.parameters || []
                  );
                }}
                options={
                  servicesDataByEmployee
                    ? servicesDataByEmployee.map((service) => ({
                        label: service.service,
                        value: service.service_id,
                      }))
                    : []
                }
                placeholder="Выберите услугу"
              />
              <CustomAutoComplete
                className={classes["u-w-full"]}
                name="parameter"
                selectValue={"label"}
                size="small"
                value={selectedParameters}
                onChange={(value) => setSelectedParameters(value)}
                options={
                  parametersData
                    ? parametersData.map((parameter) => ({
                        label: parameter.name,
                        value: parameter.id,
                      }))
                    : []
                }
                placeholder="Параметр"
              />
              <Button
                variant="outlined"
                sx={{
                  minWidth: "4rem",
                  padding: "0",
                }}
                onClick={handleAddService}
              >
                <Add />
              </Button>
            </div>
          </div>

          {serviceTableData && serviceTableData.length > 0 && (
            <ReusableServiceTable
              data={serviceTableData}
              onQuantityChange={handleQuantityChange}
              onDelete={handleDeleteServiceTableData}
            />
          )}

          {isNotesOpen && (
            <div className={classes["create-appointment__notes"]}>
              <p
                className={classNames(
                  classes["create-appointment__params-text"],
                  classes["u-mt-2"]
                )}
              >
                Комментарий
              </p>
              <Divider />
              <TextField
                multiline
                rows={3}
                fullWidth
                placeholder="Комментарий"
                value={appointmentForm.notes}
                onChange={(e) =>
                  setAppointmentForm({
                    ...appointmentForm,
                    notes: e.target.value,
                  })
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    fontSize: "1.4rem",
                    borderRadius: "4px",
                    marginTop: "1rem",
                  },
                }}
              />
            </div>
          )}

          <div className={classes["create-appointment__buttons"]}>
            <Button
              variant="outlined"
              startIcon={<Clear />}
              sx={buttonClass}
              onClick={() => modal.hide()}
            >
              Отменить
            </Button>
            <div className={classes["create-appointment__buttons--right"]}>
              <Button
                variant="outlined"
                sx={{
                  ...buttonClass,
                  minWidth: "4rem",
                  padding: "0",
                }}
                onClick={() => setIsNotesOpen(!isNotesOpen)}
              >
                <Chat />
              </Button>
              <Button
                variant="outlined"
                sx={{
                  ...buttonClass,
                  minWidth: "4rem",
                  padding: "0",
                }}
              >
                <AttachMoney />
              </Button>
              <Button variant="outlined" sx={buttonClass}>
                Продажа товаров
              </Button>
              <Button
                variant="contained"
                startIcon={<Done />}
                sx={buttonClass}
                onClick={() => handleSubmit(appointmentForm)}
              >
                Сохранить
              </Button>
            </div>
          </div>
        </div>
      </LocalizationProvider>
    </ModalWindow>
  );
};

const CreateAppointmentModal = NiceModal.create(CreateAppointment);
export default CreateAppointmentModal;
