import React, { useState } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import ModalWindow from "@/components/modal-window/modal-window";
import {
  Autocomplete,
  Button,
  Divider,
  Table,
  TextField,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import {
  Add,
  Clear,
  Chat,
  AttachMoney,
  Done,
  Help,
  AddCircle,
  DeleteOutline,
  Close,
} from "@mui/icons-material";
import CustomAutoComplete from "@/components/autocomplete/custom-autocomplete.component";
import classes from "./styles.module.scss";
import classNames from "classnames";
import { useQuery } from "@tanstack/react-query";
import { searchEmployee } from "@/service/employee/employee.service";
import { IAppointmentCreateForm } from "@/ts/appointments.interface";

interface ICreateAppointmentModalProps {
  start: string;
  end: string;
  employee: string;
}

const initialAppointmentForm: IAppointmentCreateForm = {
  client: 0,
  employee: 0,
  status: "",
  date: "",
  start_time: "",
  end_time: "",
  discount_custom: "",
  notes: "",
  type: "",
  appointment_services: [
    {
      service: 0,
      price: "12312",
      quantity: 0,
      materials: [],
    },
    {
      service: 0,
      price: "12312",
      quantity: 0,
      materials: [],
    },
  ],
  material_purchases: [],
};

const CreateAppointmentModal: React.FC<ICreateAppointmentModalProps> = ({
  start,
  end,
  employee,
}) => {
  const modal = useModal();
  const [appointmentForm, setAppointmentForm] =
    useState<IAppointmentCreateForm>(initialAppointmentForm);
  const [selectedClient, setSelectedClient] = useState<{
    label: string;
    value: number;
  }>({
    label: "",
    value: 0,
  });
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

  const buttonClass = {
    fontSize: "1.1rem",
    fontWeight: 600,
    height: "4rem",
  };

  const handleSubmit = (appointmentForm: IAppointmentCreateForm) => {
    console.log(appointmentForm);
    console.log("submit");
  };

  return (
    <ModalWindow
      title={"Запись клиента"}
      open={modal.visible}
      handleClose={() => modal.hide()}
      className={classes["u-full-zero"]}
      withButtons={false}
    >
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
              name="client"
              selectValue={"label"}
              label="Клиент"
              value={selectedClient}
              onChange={(value) => setSelectedClient(value)}
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
          <div className={classes["create-appointment__params"]}></div>
        </div>

        <div className={classes["u-mt-1"]}>
          <div className={classes["create-appointment__services"]}>
            <p className={classes["create-appointment__params-text"]}>Услуги</p>
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
            >
              Выбрать услуги
            </Button>
          </div>
          <Divider />
          <div className={classes["create-appointment__services--select"]}>
            <CustomAutoComplete
              name="service"
              selectValue={"label"}
              size="small"
              options={[
                { label: "John", value: 1 },
                { label: "Doe", value: 2 },
              ]}
              placeholder="Выберите услугу"
            />
            <CustomAutoComplete
              name="parameter"
              selectValue={"label"}
              size="small"
              options={[
                { label: "John", value: 1 },
                { label: "Doe", value: 2 },
              ]}
              placeholder="Параметр"
            />
            <Button
              variant="outlined"
              sx={{
                minWidth: "4rem",
                padding: "0",
              }}
            >
              <Add />
            </Button>
          </div>
        </div>

        {appointmentForm.appointment_services.length > 0 && (
          <div className={classes["create-appointment__services--table"]}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Услуга</TableCell>
                  <TableCell>Параметр</TableCell>
                  <TableCell>Кол-во</TableCell>
                  <TableCell>Цена</TableCell>
                  <TableCell>
                    <DeleteOutline />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointmentForm.appointment_services.map((service, index) => (
                  <TableRow key={index}>
                    <TableCell>service</TableCell>
                    <TableCell>parameter</TableCell>
                    <TableCell>{service.quantity}</TableCell>
                    <TableCell>{service.price}</TableCell>
                    <TableCell>
                      <Close />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
    </ModalWindow>
  );
};

export default NiceModal.create(CreateAppointmentModal);
