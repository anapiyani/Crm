import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
  Typography,
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
  orderBy: Key,
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

function EnhancedTableHead<T>({
  order,
  orderBy,
  onRequestSort,
  headCells,
}: {
  order: Order;
  orderBy: string;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
  headCells: IHeadCell<T>[];
}) {
  const createSortHandler =
    (property: keyof T) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id as string}
            align={headCell.numeric ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontSize: "1.4rem", textAlign: "center" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function EventPlannedTable<T extends ITableData>({
  data,
  headCells,
  title,
}: IEnhancedTableProps<T>) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof T>(headCells[0].id);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof T,
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(data, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, data],
  );

  return (
    <Box sx={{ width: "100%" }} className={classes.tableComponent}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy as string}
              onRequestSort={handleRequestSort}
              headCells={headCells}
            />
            <TableBody>
              {visibleRows.map((row, index) => (
                <TableRow hover tabIndex={-1} key={index}>
                  {headCells.map((cell) => (
                    <TableCell
                      key={cell.id as string}
                      align={cell.numeric ? "right" : "left"}
                      sx={{ fontSize: "1.4rem", textAlign: "center" }}
                    >
                      {cell.id === "id"
                        ? `Запись №${row[cell.id]}`
                        : row[cell.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={headCells.length} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {data.length !== 0 && (
          <TablePagination
            rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              fontSize: "1.4rem",
              "& .MuiToolbar-root": {
                fontSize: "1.4rem",
              },
              "& .MuiTablePagination-displayedRows": {
                fontSize: "1.4rem",
              },
              "& .MuiTablePagination-selectLabel": {
                fontSize: "1.4rem",
              },
            }}
          />
        )}
        {data.length === 0 && (
          <Typography
            variant="h6"
            align="center"
            sx={{ padding: "16px", fontSize: "1.6rem", fontWeight: 400 }}
          >
            Ничего не найдено
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
