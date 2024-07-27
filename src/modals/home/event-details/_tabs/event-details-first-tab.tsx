import React, { useState, useEffect } from "react";
import classes from "./styles.module.scss";
import { ISingleAppointmentReturn } from "@/ts/appointments.interface";
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimeField,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs, { Dayjs } from "dayjs";
import ReusableServiceTable, {
  ITableRowData,
} from "../../_components/reusable-service-table/reusable-service-table";
import CustomAutoComplete from "@/components/autocomplete/custom-autocomplete.component";
import { useQuery } from "@tanstack/react-query";
import {
  getServiceForEmployeeById,
  getServiceParametersById,
} from "@/service/services/services.service";
import { Add } from "@mui/icons-material";
import classNames from "classnames";

interface IEventDetailsFirstTabProps {
  data?: ISingleAppointmentReturn;
}

interface IOption {
  label: string;
  value: number;
}

const EventDetailsFirstTab: React.FC<IEventDetailsFirstTabProps> = ({
  data,
}) => {
  const [servicesData, setServicesData] = useState<ITableRowData[]>([]);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
    dayjs(data?.created_at)
  );
  const [startTime, setStartTime] = useState<Dayjs | null>(
    dayjs(data?.created_at)
  );
  const [endTime, setEndTime] = useState<Dayjs | null>(dayjs(data?.updated_at));
  const [selectedService, setSelectedService] = useState<IOption | null>(null);
  const [selectedParameter, setSelectedParameter] = useState<IOption | null>(
    null
  );

  const { data: servicesDataByEmployee } = useQuery({
    queryKey: ["servicesData", data?.employee_id],
    queryFn: () =>
      getServiceForEmployeeById(data?.employee_id?.toString() ?? ""),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const { data: parametersData } = useQuery({
    queryKey: ["parametersData", selectedService?.value],
    queryFn: () => getServiceParametersById(selectedService?.value as number),
    enabled: selectedService !== null && selectedService?.value !== 0,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data && data.appointment_services) {
      setServicesData(
        data.appointment_services.map((service) => ({
          id: service.id,
          service: service.service_name,
          service_id: service.service,
          price: service.price,
          quantity: service.quantity,
          parameter: service.parameter.split(":")[1],
          parameter_id: service.service,
        }))
      );
    }
  }, [data]);

  const handleQuantityChange = (id: number, quantity: number) => {
    setServicesData(
      servicesData.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleDeleteService = (id: number) => {
    setServicesData(servicesData.filter((item) => item.id !== id));
  };

  const handleAddService = () => {
    if (selectedService && selectedParameter) {
      setServicesData([
        ...servicesData,
        {
          id: Date.now(),
          service: selectedService.label,
          service_id: selectedService.value,
          price: "",
          quantity: 1,
          parameter: selectedParameter.label,
          parameter_id: selectedParameter.value,
        },
      ]);
      setSelectedService(null);
      setSelectedParameter(null);
    }
  };

  return (
    <div className={classes["first"]}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div>
          <h2 className={classes["first__header-text"]}>Основные параметры</h2>
          <Divider />
          <div
            className={classNames(
              classes["first__params--client"],
              classes["u-mt-1"]
            )}
          >
            <p className={classes["u-w-equal"]}>Клиент</p>
            <p>{`${data?.client.last_name} ${data?.client.first_name}`}</p>
            <p>{data?.client.phone_number || "Нет номера"}</p>
          </div>
          <div className={classes["first__params--client"]}>
            <p className={classes["u-w-equal"]}>Дата и время</p>
            <DatePicker
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              disabled
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "4rem",
                  fontSize: "1.4rem",
                },
              }}
            />
            <TimeField
              value={startTime}
              format="HH:mm"
              disabled
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "4rem",
                  fontSize: "1.4rem",
                },
              }}
            />
            <TimeField
              value={endTime}
              format="HH:mm"
              disabled
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "4rem",
                  fontSize: "1.4rem",
                },
              }}
            />
          </div>
          <div className={classes["first__params--client"]}>
            <p className={classes["u-w-equal"]}>Соотрудник</p>
            <Autocomplete
              disabled={true}
              value={data?.employee_name || null}
              sx={{
                width: "100%",
              }}
              renderInput={(params: AutocompleteRenderInputParams) => (
                <TextField
                  {...params}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "4rem",
                      fontSize: "1.4rem",
                    },
                  }}
                  disabled={true}
                />
              )}
              options={[]}
            />
          </div>
        </div>

        <div className={classes["u-mt-1"]}>
          <h2 className={classes["first__header-text"]}>Услуги</h2>
          <Divider />
          <div className={classNames(classes["first__params--client"])}>
            <CustomAutoComplete
              name="service"
              selectValue={"label"}
              size="small"
              value={selectedService}
              onChange={(value) => setSelectedService(value)}
              options={
                servicesDataByEmployee?.results
                  ? servicesDataByEmployee.results.map((service) => ({
                      label: service.parameter.split(":")[0],
                      value: service.service,
                    }))
                  : []
              }
              placeholder="Выберите услугу"
            />
            <CustomAutoComplete
              name="parameter"
              selectValue={"label"}
              size="small"
              value={selectedParameter}
              onChange={(value) => setSelectedParameter(value)}
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
                height: "3.7rem",
              }}
              onClick={handleAddService}
            >
              <Add />
            </Button>
          </div>
          {servicesData.length > 0 && (
            <ReusableServiceTable
              data={servicesData}
              onQuantityChange={handleQuantityChange}
              onDelete={handleDeleteService}
            />
          )}
        </div>
      </LocalizationProvider>
    </div>
  );
};

export default EventDetailsFirstTab;
