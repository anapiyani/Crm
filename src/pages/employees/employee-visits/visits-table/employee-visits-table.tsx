import React from "react";
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
} from "@mui/material";
import { TableData } from "../data";
import { CreditScore, CardGiftcard } from "@mui/icons-material";

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
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: "0.2rem solid rgba(99, 107, 116, 0.3)",
  fontSize: "1.4rem",
  fontWeight: 600,
}));

interface TableDataProps {
  data: TableData[];
}

const EmployeeTable: React.FC<TableDataProps> = ({ data }) => {
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
      <Table
        sx={{
          minWidth: 650,
          borderRadius: "8px",
          overflow: "hidden",
        }}
        aria-label="employee table"
      >
        <TableHead sx={{ backgroundColor: "#FBFCFE" }}>
          <TableRow
            sx={{
              borderBottom: "0.2 rem solid rgba(99, 107, 116, 0.3)",
            }}
          >
            <StyledTableCell align="left">№</StyledTableCell>
            <StyledTableCell align="left">Посещение</StyledTableCell>
            <StyledTableCell align="left">Клиент</StyledTableCell>
            <StyledTableCell align="left">Услуга</StyledTableCell>
            <StyledTableCell align="left">Сотрудник</StyledTableCell>
            <StyledTableCell align="right">Сумма</StyledTableCell>
            <StyledTableCell align="right">Скидка</StyledTableCell>
            <StyledTableCell align="right">Итого</StyledTableCell>
            <StyledTableCell align="right">Всего</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <React.Fragment key={row.id}>
              {row.services.map((service, index) => (
                <StyledTableRow
                  key={index}
                  isParentRow={index === 0}
                  rowIndex={rowIndex}
                >
                  {index === 0 && (
                    <>
                      <TableCell
                        align="left"
                        rowSpan={row.services.length}
                        sx={{
                          fontSize: "1.6rem",
                          fontWeight: 400,
                          borderRight: "0.1rem solid var(--neutral-300)",
                          padding: "0.6rem 0.8rem",
                        }}
                      >
                        {row.id}
                      </TableCell>
                      <TableCell
                        align="left"
                        rowSpan={row.services.length}
                        sx={{
                          border: "0.1rem solid var(--neutral-300)",
                          padding: "0.8rem",
                        }}
                      >
                        <Typography color="var(--primary-500)" fontSize={14}>
                          {row.visit}
                        </Typography>
                        <Typography
                          color="#32383E"
                          fontSize={12}
                          fontWeight={300}
                        >
                          {row.visitTime}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="left"
                        rowSpan={row.services.length}
                        sx={{
                          border: "0.1rem solid var(--neutral-300)",
                          padding: "0.8rem",
                        }}
                      >
                        <Typography color="var(--primary-500)" fontSize={16}>
                          {row.client}
                        </Typography>
                        <Typography
                          color="#32383E"
                          fontSize={12}
                          fontWeight={700}
                        >
                          {row.clientNote}
                        </Typography>
                      </TableCell>
                    </>
                  )}
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
                        {<service.icon />}
                      </Box>
                      <Box sx={{ padding: "0.4rem 0.8rem", color: "#32383E" }}>
                        {service.name}
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
                      {service.employee}
                    </Typography>
                    <Typography color="#32383E" fontSize={12} fontWeight={500}>
                      {service.employeeRole}
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
                    {service.amount}
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
                    {service.discount}
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
                    {service.total}
                  </TableCell>
                  {index === 0 && (
                    <TableCell
                      align="right"
                      rowSpan={row.services.length}
                      sx={{
                        gap: "1rem",
                        border: "0.1rem solid var(--neutral-300)",
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
                          {row.grandTotal}
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
                            {row.grandTotalCash}
                          </Typography>
                        </Box>
                        {row.grandTotalCard && (<Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            paddding: "0rem 0.8rem",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Box sx={{ alignItems: "center" }}>
                            <CardGiftcard sx={{ fontSize: "2rem" }} />
                          </Box>

                          <Typography
                            color="textSecondary"
                            fontSize={14}
                            padding={"0.4rem"}
                          >
                            {row.grandTotalCard}
                          </Typography>
                        </Box>)}
                        
                      </Box>
                    </TableCell>
                  )}
                </StyledTableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;
