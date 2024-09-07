import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
  IconButton,
  InputBase,
  Paper,
  Select,
  MenuItem,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import { Search, Edit, Delete, } from "@mui/icons-material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./styles.module.scss";

interface DiscountTableData {
  id: number;
  recipient: string;
  status: string;
  discount: number;
  createdBy: string;
  createdDate: string;
  actions: string[];
}

interface DiscountsTableProps {
  header: string[];
  bodyData: DiscountTableData[];
  paginationCount: number;
  paginationPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const DiscountsTable: React.FC<DiscountsTableProps> = ({
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
      row.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={classes.main__discounts}>
      <div className={classes["main__discounts__lower"]}>
        <div
          style={{
            borderRadius: "8px",
            border: "0.1rem solid var(--neutral-300)",
          }}
        >
          <Table className={classes.table}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#FBFCFE" }}>
                {header.map((headCell, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      fontSize: "1.4rem",
                      borderLeft:
                        index === 0
                          ? "none"
                          : "0.1rem solid var(--neutral-300)",
                      borderRight:
                        index === header.length - 1
                          ? "none"
                          : "0.1rem solid var(--neutral-300)",
                      borderTopLeftRadius: index == 0 ? "8px" : "0",
                      borderTopRightRadius:
                        index === header.length - 1 ? "8px" : "0",
                      width: index === 1 || index === 4 ? "35rem" : "auto",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <p
                        style={{ padding: "0.6rem 0.8rem", fontSize: "1.4rem" }}
                      >
                        {headCell}
                      </p>
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "white" : "#FBFCFE",
                    "&:last-child td, &:last-child th": { borderBottom: 0 },
                  }}
                >
                  <TableCell
                    sx={{
                      fontSize: "1.4rem",
                      borderTop: "0.1rem solid var(--neutral-300)",
                      borderBottom: "0.1rem solid var(--neutral-300)",
                      borderLeft: "none",
                      borderBottomLeftRadius:
                        index === filteredData.length - 1 ? "8px" : "0",
                    }}
                  >
                    {row.id}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "1.4rem",
                      border: "0.1rem solid var(--neutral-300)",
                    }}
                  >
                    <Link to="/" className={classes.name_link}>
                      {row.recipient}
                    </Link>
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "1.4rem",
                      border: "0.1rem solid var(--neutral-300)",
                    }}
                  >
                    {row.status}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "0.1rem solid var(--neutral-300)",
                    }}
                  >
                    <Box position="relative" display="inline-flex">
                      <CircularProgress
                        variant="determinate"
                        value={row.discount}
                        size={40}
                        thickness={4}
                      />
                      <Box
                        top={0}
                        left={0}
                        bottom={0}
                        right={0}
                        position="absolute"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <span className={classes.discount_percentage}>
                          {`${row.discount}%`}
                        </span>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "0.1rem solid var(--neutral-300)",
                    }}
                  >
                    <Typography color="var(--neutral-600)" fontSize={14}>
                      <Link to="/" className={classes.name_link}>
                        {row.createdBy}
                      </Link>
                    </Typography>
                    <Typography color="var(--neutral-600)" fontSize={14}>
                      {row.createdDate}
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      borderTop: "0.1rem solid var(--neutral-300)",
                      borderBottom: "0.1rem solid var(--neutral-300)",
                      borderRight: "none",
                      borderBottomRightRadius:
                        index === filteredData.length - 1 ? "8px" : "0",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <IconButton
                        component="span"
                        sx={{ color: "primary.main" }}
                      >
                        <Edit sx={{ fontSize: "2rem" }} />
                        <span className={classes.action_text}>Изменить</span>
                      </IconButton>
                      <IconButton
                        component="span"
                        sx={{ color: "red", fontSize: "1.2rem" }}
                      >
                        <Delete sx={{ fontSize: "2rem" }} />
                        <span className={classes.action_text}>Удалить</span>
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className={classes["main__discounts__lower__container"]}>
          <div className={classes["main__discounts__lower__container__row"]}>
            <Paper
              sx={{
                p: "0rem 1.2rem",
                display: "flex",
                alignItems: "center",
                boxShadow: "none",
                border: "1px solid var(--neutral-300)",
                justifyContent: "space-evenly",
              }}
            >
              <div
                style={{
                  padding: "0.8rem 0rem",
                  width: "20rem",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  height: "4rem",
                }}
              >
                <InputBase
                  value={searchTerm}
                  onChange={handleSearchChange}
                  sx={{ flex: 1, fontSize: "1.4rem", width: "20rem" }}
                />
                <IconButton type="button" sx={{ p: 0 }}>
                  <Search sx={{ fontSize: "2.4rem" }} />
                </IconButton>
              </div>
            </Paper>

            <p className={classes["main__discounts__lower__container__label"]}>
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

export default DiscountsTable;
