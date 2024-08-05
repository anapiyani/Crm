import React, { useState } from "react";
import classes from "./styles.module.scss";
import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { IAppointmentHistory } from "@/ts/appointments.interface";

interface IEventHistoryTableProps {
  data: IAppointmentHistory[];
}

interface IOption {
  label: string;
  value: number;
}

const EventHistoryTable: React.FC<IEventHistoryTableProps> = ({ data }) => {
  const [pageSize, setPageSize] = useState<IOption>({ label: "10", value: 10 });
  const pageSizeOptions: IOption[] = [
    { label: "10", value: 10 },
    { label: "20", value: 20 },
    { label: "50", value: 50 },
    { label: "100", value: 100 },
  ];

  const handlePageSizeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const selectedOption = pageSizeOptions.find(
      (option) => option.value === Number(event.target.value)
    ) || { label: "10", value: 10 };
    setPageSize(selectedOption);
  };

  return (
    <div className={classes["event-history-table"]}>
      <TableContainer
        component={Paper}
        sx={{
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          border: "0.1rem solid var(--neutral-300)",
          padding: "0.8rem",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Посещение</TableCell>
              <TableCell>Отдел</TableCell>
              <TableCell>Услуга</TableCell>
              <TableCell>Сотрудник</TableCell>
              <TableCell>Сумма</TableCell>
              <TableCell>Скидка</TableCell>
              <TableCell>Итого</TableCell>
              <TableCell>Всего</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              <>
                {data.map((appointment, index) => (
                  <TableRow key={appointment.id}>
                    <TableCell
                      sx={{
                        padding: "0.5rem 1rem",
                      }}
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <div className={classes["content-wrapper"]}>
                        {appointment.client_name}
                        <br />
                        <span>{appointment.department}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={classes["content-wrapper"]}>
                        {appointment.department || "Нет департамента"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={classes["content-wrapper"]}>
                        {appointment.services.map((service) => (
                          <div
                            key={service.id}
                            className={classes["service-item"]}
                          >
                            {service.service_name}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={classes["content-wrapper"]}>
                        {appointment.employee_name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={classes["content-wrapper"]}>
                        {appointment.services.map((service) => (
                          <div
                            key={service.id}
                            className={classes["service-item"]}
                          >
                            {parseFloat(service.total_price) / service.quantity}{" "}
                            тенге x {service.quantity} шт. ={" "}
                            {service.total_price} тенге
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={classes["content-wrapper"]}>
                        {appointment.discount_custom || "0 тенге"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={classes["content-wrapper"]}>
                        {appointment.services.map((service) => (
                          <div
                            key={service.id}
                            className={classes["service-item"]}
                          >
                            {parseFloat(service.total_price)} тенге
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={classes["content-wrapper"]}>
                        {appointment.services.map((service) => (
                          <div
                            key={service.id}
                            className={classes["service-item"]}
                          >
                            {service.total_price} тенге
                          </div>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={9}>Ничего не найдено</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {data.length > 0 && (
        <div className={classes["lower"]}>
          <div className={classes["lower__row"]}>
            <p className={classes["lower__label"]}>
              Показано 10 из 145 записей
            </p>
            <div>
              <div className={classes["tableSettings"]}>
                Показывать{" "}
                <select
                  name="pageSize"
                  id="pageSize"
                  onChange={handlePageSizeChange}
                >
                  {pageSizeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>{" "}
                записей
              </div>
            </div>
            <Pagination
              // count={Math.ceil(searchResult?.count / pageSize.value)}
              // page={page}
              variant="outlined"
              shape="rounded"
              boundaryCount={1}
              color="primary"
              // onChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventHistoryTable;
