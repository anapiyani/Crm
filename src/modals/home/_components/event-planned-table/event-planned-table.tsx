import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  TableSortLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import classes from "./styles.module.scss";

type Order = "asc" | "desc";

interface ITableData {
  [key: string]: string | number | boolean | undefined;
}

interface IHeadCell<T> {
  id: keyof T;
  label: string;
  numeric: boolean;
}

interface IEnhancedTableProps<T> {
  data: T[];
  headCells: IHeadCell<T>[];
  title?: string;
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

interface IOption {
  label: string;
  value: number;
}

export default function EventPlannedTable<T extends ITableData>({
  data,
  headCells,
  title,
}: IEnhancedTableProps<T>) {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof T>(headCells[0].id);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof T
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

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
    setRowsPerPage(selectedOption.value);
    setPage(0); // Reset page when page size changes
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage - 1); // Pagination is 1-based, but we need 0-based for our logic
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(data, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, data]
  );

  // Reset the page when the data array changes
  useEffect(() => {
    setPage(0);
  }, [data]);

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
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id as string}
                    align={"left"}
                    sx={{ fontSize: "1.4rem", textAlign: "center" }}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, headCell.id)}
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
                visibleRows.map((row, index) => (
                  <TableRow key={index}>
                    {headCells.map((cell) => (
                      <TableCell
                        key={cell.id as string}
                        align={cell.numeric ? "right" : "left"}
                        sx={{
                          padding: "0.5rem 1rem",
                          fontSize: "1.4rem",
                          textAlign: "center",
                        }}
                      >
                        {cell.id === "id"
                          ? `Запись №${row[cell.id]}`
                          : row[cell.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={headCells.length}>
                    Ничего не найдено
                  </TableCell>
                </TableRow>
              )}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={headCells.length} />
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
              Показано {Math.min(rowsPerPage, data.length)} из {data.length}{" "}
              записей
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
              count={Math.ceil(data.length / rowsPerPage)}
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
}
