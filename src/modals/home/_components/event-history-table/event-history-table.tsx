import React, { useState, useEffect, useMemo } from "react";
import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Box,
} from "@mui/material";
import { IAppointmentHistory } from "@/ts/appointments.interface";
import { visuallyHidden } from "@mui/utils";
import classes from "./styles.module.scss";

type Order = "asc" | "desc";

interface ITableData {
  [key: string]: string | number | boolean | undefined;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: any, b: any) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (
    typeof b[orderBy] === "undefined" ||
    typeof a[orderBy] === "undefined" ||
    b[orderBy] === null ||
    a[orderBy] === null ||
    b[orderBy] < a[orderBy]
  ) {
    return -1;
  }
  if (
    typeof a[orderBy] === "undefined" ||
    typeof b[orderBy] === "undefined" ||
    b[orderBy] === null ||
    a[orderBy] === null ||
    b[orderBy] > a[orderBy]
  ) {
    return 1;
  }
  return 0;
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number): T[] {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface IEventHistoryTableProps {
  data: IAppointmentHistory[];
}

interface IOption {
  label: string;
  value: number;
}

const headerCells = [
  { id: "id", label: "№", numeric: true },
  { id: "client_name", label: "Посещение", numeric: false },
  { id: "department", label: "Отдел", numeric: false },
  { id: "services", label: "Услуга", numeric: false },
  { id: "employee_name", label: "Сотрудник", numeric: false },
  { id: "amount", label: "Сумма", numeric: true },
  { id: "discount_custom", label: "Скидка", numeric: true },
  { id: "total", label: "Итого", numeric: true },
  { id: "grand_total", label: "Всего", numeric: true },
];

const EventHistoryTable: React.FC<IEventHistoryTableProps> = ({ data }) => {
  const [pageSize, setPageSize] = useState<IOption>({ label: "10", value: 10 });
  const pageSizeOptions: IOption[] = [
    { label: "10", value: 10 },
    { label: "20", value: 20 },
    { label: "50", value: 50 },
    { label: "100", value: 100 },
  ];
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] =
    useState<keyof IAppointmentHistory>("client_name");
  const totalPages = Math.ceil(data.length / pageSize.value);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const visibleRows = useMemo(
    () =>
      stableSort(data, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, data]
  );

  useEffect(() => {
    setPage(0);
  }, [data]);

  const handlePageSizeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const selectedOption = pageSizeOptions.find(
      (option) => option.value === Number(event.target.value)
    ) || { label: "10", value: 10 };
    setPageSize(selectedOption);
    setRowsPerPage(selectedOption.value);
    setPage(0);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value - 1);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof IAppointmentHistory
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <div className={classes["event-history-table"]}>
      <div style={{ padding: "0.8rem" }}>
        <TableContainer
          component={Paper}
          sx={{
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            border: "0.1rem solid var(--neutral-300)",
            boxShadow: "none",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                {headerCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={"left"}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={(event) =>
                        handleRequestSort(
                          event,
                          headCell.id as keyof IAppointmentHistory
                        )
                      }
                    >
                      {headCell.label}
                      {orderBy === headCell.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.length > 0 ? (
                visibleRows.map((appointment, index) => (
                  <TableRow key={appointment.id}>
                    <TableCell
                      sx={{
                        padding: "0.5rem 1rem",
                        fontSize: "1.4rem",
                        textAlign: "center",
                      }}
                    >
                      {page * pageSize.value + index + 1}
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={headerCells.length}>
                    Ничего не найдено
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {data.length > 0 && (
        <div className={classes["lower"]}>
          <div className={classes["lower__row"]}>
            <p className={classes["lower__label"]}>
              Показано {Math.min(pageSize.value, data.length)} из {data.length}{" "}
              записей
            </p>
            <div>
              <div className={classes["tableSettings"]}>
                Показывать{" "}
                <select
                  name="pageSize"
                  id="pageSize"
                  onChange={handlePageSizeChange}
                  value={pageSize.value}
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
              count={totalPages}
              page={page + 1}
              variant="outlined"
              shape="rounded"
              boundaryCount={1}
              color="primary"
              onChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventHistoryTable;
