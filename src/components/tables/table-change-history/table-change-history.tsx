import {
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
  Typography,
  IconButton,
  TextField,
  Paper,
  InputBase,
  Select,
  MenuItem,
} from "@mui/material";
import { SwapVert, Search } from "@mui/icons-material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./style.module.scss";

interface TableData {
  id: number;
  dateTime: string;
  employee: string;
  action: string;
  before: {
    employee: string;
    date: string;
    time: string;
  }[];
  after: {
    employee: string;
    date: string;
    time: string;
  }[];
}

interface ChangeHistoryTableProps {
  title: string;
  header: string[];
  bodyData: TableData[];
  paginationCount: number;
  paginationPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const ChangeHistoryTable: React.FC<ChangeHistoryTableProps> = ({
  title,
  header,
  bodyData,
  paginationCount,
  paginationPage,
  onPageChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = bodyData.filter(
    (row) =>
      row.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.action.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className={classes.main__cashDesk}>
      <div className={classes.main__cashDesk__header}>
        <h2>{title}</h2>
        <Divider />
      </div>
      <div className={classes["main__cashDesk__lower"]}>
        <div
          style={{
            borderRadius: "8px",
            border: "0.1rem solid var(--neutral-300)",
          }}
        >
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {header.map((headCell, index) => (
                  <TableCell key={index}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ padding: "0.6rem 0.8rem" }}>{headCell}</div>

                      <IconButton sx={{ pr: 0 }}>
                        <SwapVert />
                      </IconButton>
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.dateTime}</TableCell>
                  <TableCell>
                    <Link to="/" className={classes.name_link}>
                      {row.employee}
                    </Link>
                  </TableCell>
                  <TableCell>{row.action}</TableCell>
                  <TableCell>
                    {row.before.map((item, index) => (
                      <div key={index}>
                        <Typography color="var(--neutral-600)" fontSize={16}>
                          <span>Сотрудник: </span>
                          <Link to="/" className={classes.name_link}>
                            {item.employee}
                          </Link>
                        </Typography>
                        <Typography color="var(--neutral-600)" fontSize={16}>
                          Дата: {item.date}
                        </Typography>
                        <Typography color="var(--neutral-600)" fontSize={16}>
                          Время: {item.time}
                        </Typography>
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    {row.after.map((item, index) => (
                      <div key={index}>
                        <Typography color="var(--neutral-600)" fontSize={16}>
                          <span>Сотрудник: </span>
                          <Link to="/" className={classes.name_link}>
                            {item.employee}
                          </Link>
                        </Typography>
                        <Typography color="var(--neutral-600)" fontSize={16}>
                          Дата: {item.date}
                        </Typography>
                        <Typography color="var(--neutral-600)" fontSize={16}>
                          Время: {item.time}
                        </Typography>
                      </div>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className={classes["main__cashDesk__lower__container"]}>
          <div className={classes["main__cashDesk__lower__container__row"]}>
            <Paper
              sx={{
                p: "0rem 1.2rem",
                display: "flex",
                alignItems: "center",
                boxShadow: "none",
                border: "1px solid var(--neutral-300)",
              }}
            >
              <div
                style={{
                  padding: "0.8rem 0rem",
                  width: "20rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "4rem",
                }}
              >
                <InputBase
                  value={searchTerm}
                  onChange={handleSearchChange}
                  sx={{ flex: 1, fontSize: "1.4rem" }}
                />
                <IconButton type="button" sx={{ p: 0 }}>
                  <Search sx={{ fontSize: "2.4rem" }} />
                </IconButton>
              </div>
            </Paper>

            <p className={classes["main__cashDesk__lower__container__label"]}>
              Показано {filteredData.length} из {bodyData.length} записей
            </p>
            <div>
              <div className={classes["tableSettings"]}>
                Показывать
                <Select
                  defaultValue={10}
                  id="pageSize"
                  name="pageSize"
                  sx={{ height: "4rem", fontSize: "1.6rem", width: "12rem" }}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={100}>100</MenuItem>
                </Select>
                записей
              </div>
            </div>
            <Pagination
              count={paginationCount}
              page={paginationPage}
              onChange={onPageChange}
              variant="outlined"
              shape="rounded"
              boundaryCount={1}
              color="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeHistoryTable;
