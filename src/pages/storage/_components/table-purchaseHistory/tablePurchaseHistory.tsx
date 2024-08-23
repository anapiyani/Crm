import React, { useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
  Pagination,
} from "@mui/material";

interface PurchaseHistoryData {
  number: number;
  date: string;
  action: string;
  actionLink: string;
  price: string;
  employee: string;
  employeeLink: string;
}

interface PurchaseHistoryTableProps {
  data: PurchaseHistoryData[];
  title: string;
}

const PurchaseHistoryTable: React.FC<PurchaseHistoryTableProps> = ({
  data,
  title,
}) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 3; // Set this to your desired rows per page count

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const headers = [
    { id: "number", label: "№", align: "left" },
    { id: "date", label: "Дата", align: "left" },
    { id: "action", label: "Действие", align: "left" },
    { id: "price", label: "Закуп. цена", align: "left" },
    { id: "employee", label: "Сотрудник", align: "left" },
  ];

  return (
    <Paper
      sx={{
        border: "0.1rem solid #CDD7E1",
        borderRadius: "8px",
        boxShadow: "0rem 0.1rem 0.2rem 0rem rgba(21, 21, 21, 0.08)",
        width: "100%",
      }}
    >
      <Box
        sx={{
          fontSize: "2.4rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.6rem",
          borderBottom: "0.1rem solid #CDD7E1",
        }}
      >
        <p style={{ fontSize: "2.4rem" }}>{title}</p>
      </Box>
      <div
        style={{
          padding: "0.8rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <TableContainer
          sx={{ borderRadius: "4px", border: "0.1rem solid #CDD7E1" }}
        >
          <Table aria-label="purchase history table">
            <TableHead
              sx={{
                backgroundColor: "#FBFCFE",
              }}
            >
              <TableRow>
                {headers.map((header) => (
                  <TableCell
                    key={header.id}
                    sx={{
                      fontSize: "1.4rem",
                      border: "0.1rem solid #CDD7E1",
                      textAlign: header.align,
                    }}
                  >
                    {header.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice((page - 1) * rowsPerPage, page * rowsPerPage) // Adjust slice for 1-based page index
                .map((row, index) => (
                  <TableRow
                    key={row.number}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#FBFCFE" : "white", // Set row color for odd and even rows
                      "&:last-child td, &:last-child th": {
                        borderBottom: "none", // Remove the bottom border for the last row
                      },
                    }}
                  >
                    <TableCell
                      sx={{
                        fontSize: "1.6rem",
                        border: "0.1rem solid #CDD7E1",
                      }}
                    >
                      {row.number}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "1.4rem",
                        border: "0.1rem solid #CDD7E1",
                      }}
                    >
                      {row.date}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "1.4rem",
                        border: "0.1rem solid #CDD7E1",
                      }}
                    >
                      <Link href={row.actionLink} color="primary">
                        {row.action}
                      </Link>
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "1.4rem",
                        border: "0.1rem solid #CDD7E1",
                      }}
                    >
                      {row.price}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "1.4rem",
                        border: "0.1rem solid #CDD7E1",
                      }}
                    >
                      <Link href={row.employeeLink} color="primary">
                        {row.employee}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Pagination
            count={Math.ceil(data.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
            boundaryCount={1}
            color="primary"
          />
        </div>
      </div>
    </Paper>
  );
};

export default PurchaseHistoryTable;
