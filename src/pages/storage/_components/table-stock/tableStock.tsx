import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableHeaders, tableData } from "./data";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: "1.4rem",
  border: "0.1rem solid #CDD7E1",
  padding: "0.4rem 0.8rem",
  textAlign: "center", // Center align all cells by default
  "&:first-of-type": {
    borderLeft: "none",
  },
  "&:last-of-type": {
    borderRight: "none",
  },
}));

const HeaderTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: "1.4rem",
  fontWeight: "bold",
  borderBottom: "none",
  padding: "0.8rem",
  border: "0.1rem solid #CDD7E1",
  borderTop: "none",
  textAlign: "center",
  "&:first-of-type": {
    borderLeft: "none",
  },
  "&:last-of-type": {
    borderRight: "none",
  },
}));

const TableStock = () => {
  return (
    <div
      style={{
        padding: "0.8rem",
        borderRadius: "8px",
        border: "0.1rem solid #CDD7E1",
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "8px",
          border: "0.1rem solid #CDD7E1",
          boxShadow: "none",
          overflowX: "auto",
          background: "#FBFCFE",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {tableHeaders.slice(0, 10).map((header) => (
                <HeaderTableCell key={header.id} rowSpan={2}>
                  {header.label}
                </HeaderTableCell>
              ))}
              <HeaderTableCell colSpan={3} align="center">
                Средний расход
              </HeaderTableCell>
            </TableRow>
            <TableRow>
              {tableHeaders.slice(10).map((header) => (
                <HeaderTableCell key={header.id}>
                  {header.label}
                </HeaderTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableCell
                colSpan={tableHeaders.length}
                sx={{
                  backgroundColor: "rgba(33,150,243,0.08)",
                  textAlign: "left",
                }}
              >
                Парикмахерский зал {">"} Estel
              </StyledTableCell>
            </TableRow>
            {tableData.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td": { borderBottom: "none" },
                }}
              >
                <StyledTableCell>{row.number}</StyledTableCell>
                <StyledTableCell>{row.article}</StyledTableCell>
                <StyledTableCell sx={{ width: "30%", textAlign: "left" }}>
                  <a
                    href="#"
                    style={{ color: "#1E88E5", textDecoration: "none" }}
                  >
                    {row.name}
                  </a>
                </StyledTableCell>
                <StyledTableCell>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "0.4rem",
                      justifyContent: "center",
                    }}
                  >
                    <TextField
                      variant="outlined"
                      type="number"
                      size="small"
                      sx={{
                        width: "min-content",
                        minWidth: "6rem",
                        "& input": { fontSize: "1.4rem", padding: "0.8rem" },
                      }}
                    />
                    {row.unit}
                  </div>
                </StyledTableCell>
                <StyledTableCell>{row.storage}</StyledTableCell>
                <StyledTableCell>{row.hall}</StyledTableCell>
                <StyledTableCell>{row.display}</StyledTableCell>
                <StyledTableCell>{row.totalStorage}</StyledTableCell>
                <StyledTableCell>{row.production}</StyledTableCell>
                <StyledTableCell>{row.total}</StyledTableCell>
                <StyledTableCell>{row.weeklyConsumption}</StyledTableCell>
                <StyledTableCell>{row.monthlyConsumption}</StyledTableCell>
                <StyledTableCell>{row.quarterlyConsumption}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableStock;
