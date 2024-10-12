import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  styled,
  TableRowProps,
  IconButton,
  InputBase,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import {
  AdjustOutlined,
  CreditScore,
  Inventory2Outlined,
  RedeemOutlined,
  Rowing,
  Search,
} from "@mui/icons-material";
import classes from "./styles.module.scss";
import { bodyData } from "@/modals/home/event-details/data";

interface StyledTableRowProps extends TableRowProps {
  isParentRow?: boolean;
  rowIndex?: number;
}

const StyledTableRow = styled(TableRow, {
  shouldForwardProp: (prop) => prop !== "isParentRow" && prop !== "rowIndex",
})<StyledTableRowProps>(({ isParentRow, rowIndex }) => ({
  backgroundColor: isParentRow
    ? (rowIndex ?? 0) % 2 === 0
      ? "#FBFCFE"
      : "#FFFFFF"
    : (rowIndex ?? 0) % 2 === 0
      ? "#FBFCFE"
      : "#FFFFFF",
  "&:last-child td, &:last-child th": {
    borderBottom: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: "1.4rem",
  fontWeight: 600,
}));

const ClientVisitsTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // const filteredData = bodyData.filter(
  //   (row) =>
  //     row.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     row.status.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className={classes.main__discounts}>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "none",
          borderRadius: "8px",
          border: "0.1rem solid var(--neutral-300)",
        }}
      >
        <Table
          sx={{
            minWidth: 650,
            borderRadius: "8px",
            overflow: "hidden",
          }}
          aria-label="employee table"
        >
          <TableHead sx={{ backgroundColor: "#FBFCFE" }}>
            <TableRow>
              <StyledTableCell align="left">№</StyledTableCell>
              <StyledTableCell align="left">Посещение</StyledTableCell>
              <StyledTableCell align="left">Отдел</StyledTableCell>
              <StyledTableCell align="left">Услуга</StyledTableCell>
              <StyledTableCell align="left">Сотрудник</StyledTableCell>
              <StyledTableCell align="right">Сумма</StyledTableCell>
              <StyledTableCell align="right">Скидка</StyledTableCell>
              <StyledTableCell align="right">Итого</StyledTableCell>
              <StyledTableCell align="right">Всего</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* First Row - Multiple Services */}
            <StyledTableRow isParentRow={true} rowIndex={0}>
              <TableCell
                align="left"
                rowSpan={3}
                sx={{
                  fontSize: "1.6rem",
                  fontWeight: 400,
                  borderRight: "0.1rem solid var(--neutral-300)",
                  padding: "0.6rem 0.8rem",
                }}
              >
                1
              </TableCell>
              <TableCell
                align="left"
                rowSpan={3}
                sx={{
                  border: "0.1rem solid var(--neutral-300)",
                  borderBottom: "none",
                  padding: "0.8rem",
                }}
              >
                <Typography color="var(--primary-500)" fontSize={14}>
                  Посещение №12345
                </Typography>
                <Typography color="#32383E" fontSize={12} fontWeight={300}>
                  Сегодня, 11:27
                </Typography>
              </TableCell>
              <TableCell
                align="left"
                rowSpan={3}
                sx={{
                  border: "0.1rem solid var(--neutral-300)",
                  borderBottom: "none",

                  padding: "0.8rem",
                }}
              >
                <Typography fontSize={14} fontWeight={600}>
                  Косметология
                </Typography>
              </TableCell>
              <TableCell
                padding="none"
                align="left"
                sx={{
                  fontSize: "1.4rem",
                  border: "0.1rem solid var(--neutral-300)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "0.8rem",
                  }}
                >
                  <Box sx={{ color: "#636B74", fontSize: "2rem" }}>
                    <AdjustOutlined />
                  </Box>
                  <Box sx={{ padding: "0.4rem 0.8rem", color: "#32383E" }}>
                    Услуга (прим. массаж), 60 минут
                  </Box>
                </Box>
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  border: "0.1rem solid var(--neutral-300)",
                  padding: "0.8rem",
                }}
              >
                <Typography color="var(--primary-500)" fontSize={14}>
                  Сергей Петров
                </Typography>
                <Typography color="#32383E" fontSize={12} fontWeight={500}>
                  Парикмахер
                </Typography>
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontSize: "1.4rem",
                  border: "0.1rem solid var(--neutral-300)",
                  padding: "0.6rem 0.8rem",
                  color: "#32383E",
                }}
              >
                1000₽
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontSize: "1.4rem",
                  border: "0.1rem solid var(--neutral-300)",
                  padding: "0.6rem 0.8rem",
                  color: "#32383E",
                }}
              >
                10%
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontSize: "1.4rem",
                  border: "0.1rem solid var(--neutral-300)",
                  padding: "0.6rem 0.8rem",
                  color: "#32383E",
                }}
              >
                900₽
              </TableCell>
              <TableCell
                align="right"
                rowSpan={3}
                sx={{
                  gap: "1rem",
                  border: "0.1rem solid var(--neutral-300)",
                  borderBottom: "none",
                  borderRight: "none",
                }}
              >
                <Box
                  sx={{
                    gap: "1rem",
                    paddding: "4rem 0rem",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      fontSize: "1.6rem",
                      fontWeight: 600,
                      display: "flex",
                      paddding: "0rem 0.8rem",
                      justifyContent: "flex-end",
                    }}
                  >
                    2175₽
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      paddding: "0rem 0.8rem",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Box sx={{ alignItems: "center" }}>
                      <CreditScore sx={{ fontSize: "2rem" }} />
                    </Box>
                    <Typography
                      color="textSecondary"
                      fontSize={14}
                      padding={"0.4rem"}
                    >
                      1500₽
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      paddding: "0rem 0.8rem",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Box sx={{ alignItems: "center" }}>
                      <RedeemOutlined sx={{ fontSize: "2rem" }} />
                    </Box>
                    <Typography
                      color="textSecondary"
                      fontSize={14}
                      padding={"0.4rem"}
                    >
                      1500₽
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
            </StyledTableRow>

            {/* Second Service Row */}
            <StyledTableRow rowIndex={0}>
              <TableCell
                padding="none"
                align="left"
                sx={{
                  fontSize: "1.4rem",
                  border: "0.1rem solid var(--neutral-300)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "0.8rem",
                  }}
                >
                  <Box sx={{ color: "#636B74", fontSize: "2rem" }}>
                    <Inventory2Outlined />
                  </Box>
                  <Box sx={{ padding: "0.4rem 0.8rem", color: "#32383E" }}>
                    Инвентарь из склада (прим. лифтинг крем)
                  </Box>
                </Box>
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  border: "0.1rem solid var(--neutral-300)",
                  padding: "0.8rem",
                }}
              >
                <Typography color="var(--primary-500)" fontSize={14}>
                  Анна Кузнецова
                </Typography>
                <Typography color="#32383E" fontSize={12} fontWeight={500}>
                  Массажист
                </Typography>
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontSize: "1.4rem",
                  border: "0.1rem solid var(--neutral-300)",
                  padding: "0.6rem 0.8rem",
                  color: "#32383E",
                }}
              >
                1500₽
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontSize: "1.4rem",
                  border: "0.1rem solid var(--neutral-300)",
                  padding: "0.6rem 0.8rem",
                  color: "#32383E",
                }}
              >
                15%
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontSize: "1.4rem",
                  border: "0.1rem solid var(--neutral-300)",
                  padding: "0.6rem 0.8rem",
                  color: "#32383E",
                }}
              >
                1275₽
              </TableCell>
            </StyledTableRow>

            {/* Third Service Row */}
            <StyledTableRow rowIndex={0}>
              <TableCell
                padding="none"
                align="left"
                sx={{
                  fontSize: "1.4rem",
                  borderBottom: 0, // Remove the bottom border for the last row
                  border: "0.1rem solid var(--neutral-300)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "0.8rem",
                  }}
                >
                  <Box sx={{ color: "#636B74", fontSize: "2rem" }}>
                    <RedeemOutlined />
                  </Box>
                  <Box sx={{ padding: "0.4rem 0.8rem", color: "#32383E" }}>
                    Тренировка с тренером (прим. йога)
                  </Box>
                </Box>
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  borderBottom: 0, // Remove the bottom border for the last row
                  border: "0.1rem solid var(--neutral-300)",
                  padding: "0.8rem",
                }}
              >
                <Typography color="var(--primary-500)" fontSize={14}>
                  Ирина Смирнова
                </Typography>
                <Typography color="#32383E" fontSize={12} fontWeight={500}>
                  Тренер
                </Typography>
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontSize: "1.4rem",
                  borderBottom: 0, // Remove the bottom border for the last row
                  border: "0.1rem solid var(--neutral-300)",
                  padding: "0.6rem 0.8rem",
                  color: "#32383E",
                }}
              >
                1800₽
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontSize: "1.4rem",
                  borderBottom: 0, // Remove the bottom border for the last row
                  border: "0.1rem solid var(--neutral-300)",
                  padding: "0.6rem 0.8rem",
                  color: "#32383E",
                }}
              >
                5%
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontSize: "1.4rem",
                  borderBottom: 0, // Remove the bottom border for the last row
                  border: "0.1rem solid var(--neutral-300)",
                  padding: "0.6rem 0.8rem",
                  color: "#32383E",
                }}
              >
                1710₽
              </TableCell>
            </StyledTableRow>

            <StyledTableRow isParentRow={true} rowIndex={1}>
              <TableCell
                align="left"
                rowSpan={3}
                sx={{
                  fontSize: "1.6rem",
                  fontWeight: 400,
                  borderRight: "0.1rem solid var(--neutral-300)",
                  padding: "0.6rem 0.8rem",
                }}
              >
                1
              </TableCell>
              <TableCell
                align="left"
                rowSpan={3}
                sx={{
                  border: "0.1rem solid var(--neutral-300)",
                  borderBottom: "none",
                  padding: "0.8rem",
                }}
              >
                <Typography color="var(--primary-500)" fontSize={14}>
                  Посещение №12345
                </Typography>
                <Typography color="#32383E" fontSize={12} fontWeight={300}>
                  Сегодня, 11:27
                </Typography>
              </TableCell>
              <TableCell
                align="left"
                rowSpan={3}
                sx={{
                  border: "0.1rem solid var(--neutral-300)",
                  borderBottom: "none",

                  padding: "0.8rem",
                }}
              >
                <Typography fontSize={14} fontWeight={600}>
                  Косметология
                </Typography>
              </TableCell>
              <TableCell
                padding="none"
                align="left"
                sx={{
                  fontSize: "1.4rem",
                  border: "0.1rem solid var(--neutral-300)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "0.8rem",
                  }}
                >
                  <Box sx={{ color: "#636B74", fontSize: "2rem" }}>
                    <AdjustOutlined />
                  </Box>
                  <Box sx={{ padding: "0.4rem 0.8rem", color: "#32383E" }}>
                    Услуга (прим. массаж), 60 минут
                  </Box>
                </Box>
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  border: "0.1rem solid var(--neutral-300)",
                  padding: "0.8rem",
                }}
              >
                <Typography color="var(--primary-500)" fontSize={14}>
                  Сергей Петров
                </Typography>
                <Typography color="#32383E" fontSize={12} fontWeight={500}>
                  Парикмахер
                </Typography>
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontSize: "1.4rem",
                  border: "0.1rem solid var(--neutral-300)",
                  padding: "0.6rem 0.8rem",
                  color: "#32383E",
                }}
              >
                1000₽
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontSize: "1.4rem",
                  border: "0.1rem solid var(--neutral-300)",
                  padding: "0.6rem 0.8rem",
                  color: "#32383E",
                }}
              >
                10%
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontSize: "1.4rem",
                  border: "0.1rem solid var(--neutral-300)",
                  padding: "0.6rem 0.8rem",
                  color: "#32383E",
                }}
              >
                900₽
              </TableCell>
              <TableCell
                align="right"
                rowSpan={3}
                sx={{
                  gap: "1rem",
                  border: "0.1rem solid var(--neutral-300)",
                  borderBottom: "none",
                  borderRight: "none",
                }}
              >
                <Box
                  sx={{
                    gap: "1rem",
                    paddding: "4rem 0rem",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      fontSize: "1.6rem",
                      fontWeight: 600,
                      display: "flex",
                      paddding: "0rem 0.8rem",
                      justifyContent: "flex-end",
                    }}
                  >
                    2175₽
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      paddding: "0rem 0.8rem",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Box sx={{ alignItems: "center" }}>
                      <CreditScore sx={{ fontSize: "2rem" }} />
                    </Box>
                    <Typography
                      color="textSecondary"
                      fontSize={14}
                      padding={"0.4rem"}
                    >
                      1500₽
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      paddding: "0rem 0.8rem",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Box sx={{ alignItems: "center" }}>
                      <RedeemOutlined sx={{ fontSize: "2rem" }} />
                    </Box>
                    <Typography
                      color="textSecondary"
                      fontSize={14}
                      padding={"0.4rem"}
                    >
                      1500₽
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
            </StyledTableRow>
            <StyledTableRow rowIndex={1}>
              <TableCell
                padding="none"
                align="left"
                sx={{
                  fontSize: "1.4rem",
                  borderBottom: 0, // Remove the bottom border for the last row
                  border: "0.1rem solid var(--neutral-300)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "0.8rem",
                  }}
                >
                  <Box sx={{ color: "#636B74", fontSize: "2rem" }}>
                    <RedeemOutlined />
                  </Box>
                  <Box sx={{ padding: "0.4rem 0.8rem", color: "#32383E" }}>
                    Тренировка с тренером (прим. йога)
                  </Box>
                </Box>
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  borderBottom: 0, // Remove the bottom border for the last row
                  border: "0.1rem solid var(--neutral-300)",
                  padding: "0.8rem",
                }}
              >
                <Typography color="var(--primary-500)" fontSize={14}>
                  Ирина Смирнова
                </Typography>
                <Typography color="#32383E" fontSize={12} fontWeight={500}>
                  Тренер
                </Typography>
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontSize: "1.4rem",
                  borderBottom: 0, // Remove the bottom border for the last row
                  border: "0.1rem solid var(--neutral-300)",
                  padding: "0.6rem 0.8rem",
                  color: "#32383E",
                }}
              >
                1800₽
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontSize: "1.4rem",
                  borderBottom: 0, // Remove the bottom border for the last row
                  border: "0.1rem solid var(--neutral-300)",
                  padding: "0.6rem 0.8rem",
                  color: "#32383E",
                }}
              >
                5%
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontSize: "1.4rem",
                  borderBottom: 0, // Remove the bottom border for the last row
                  border: "0.1rem solid var(--neutral-300)",
                  padding: "0.6rem 0.8rem",
                  color: "#32383E",
                }}
              >
                1710₽
              </TableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
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
            Показано {bodyData.length} из {bodyData.length} записей
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
            count={1}
            page={1}
            // onChange={onPageChange}
            variant="outlined"
            shape="rounded"
            boundaryCount={1}
            color="primary"
          />
        </div>
      </div>
    </div>
  );
};

export default ClientVisitsTable;
