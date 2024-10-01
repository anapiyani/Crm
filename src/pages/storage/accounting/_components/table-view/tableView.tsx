import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Pagination,
} from "@mui/material";
import classes from "./styles.module.scss";
import CustomTextField from "@/components/textField/textField.component";

interface Action {
  icon: React.ReactNode;
  label: string;
}

interface DataItem {
  id: number;
  name: string;
  items: string;
  date: string;
  employee: string;
  comment: string;
  storage: string;
  amount?: string;
  supplier?: string;
}

interface TableViewProps {
  data: DataItem[];
  columns: string[];
  actions: Action[];
  pageCount: number;
  page: number;
}

const TableView = ({
  data,
  columns,
  actions,
  pageCount,
  page,
}: TableViewProps) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow:
          "0 0 12px rgba(21, 21, 21, 0.08), 0 2px 8px rgba(21, 21, 21, 0.08)",
        borderRadius: "8px",
        border: "0.1rem solid var(--neutral-300)",
        padding: "0.8rem",
      }}
    >
      <div
        style={{
          borderRadius: "8px",
          border: "0.1rem solid var(--neutral-300)",
        }}
      >
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {columns.map((col: string) => (
                <TableCell key={col}>{col}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: DataItem, idx: number) => (
              <TableRow key={idx}>
                {Object.keys(row).map((key) => (
                  <TableCell key={key}>{row[key as keyof DataItem]}</TableCell>
                ))}
                <TableCell>
                  <div className={classes.tableCell}>
                    {actions.map((action: Action, index: number) => (
                      <a key={index}>
                        {action.icon} {action.label}
                      </a>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className={classes.table__lower}>
        <CustomTextField
          label={"Поиск"}
          style={{ width: "20rem" }}
          size="small"
        />
        <p className={classes.table__lower__label}>Показано 2 из 2 записей</p>
        <div>
          <div className={classes["tableSettings"]}>
            Показывать
            <select name="pageSize" id="pageSize" value={10}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            записей
          </div>
        </div>
        <Pagination
          count={pageCount}
          page={page}
          variant="outlined"
          shape="rounded"
          boundaryCount={1}
          color="primary"
        />
      </div>
    </TableContainer>
  );
};

export default TableView;
