import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  InputBase,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableHeaders, tableData } from "./data"; // Assume data is stored in a separate file

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: "1.4rem",
  borderBottom: "0.1rem solid #CDD7E1",
  padding: "0.4rem 0.8rem",
  "&:first-of-type": {
    borderLeft: "none", // Remove left border for the first cell
  },
  "&:last-of-type": {
    borderRight: "none", // Remove right border for the last cell
  },
}));

const HeaderTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: "1.4rem",
  fontWeight: "bold",
  borderBottom: "none",
  padding: "0.8rem",
}));

const InputStyled = styled(InputBase)(({ theme }) => ({
  width: "4rem",
  padding: "0 0.4rem",
  border: "0.1rem solid #CDD7E1",
  borderRadius: "4px",
}));

const TableStock = () => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: "8px",
        border: "0.1rem solid #CDD7E1",
        overflowX: "auto",
        background: "#FBFCFE",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {tableHeaders.map((header) => (
              <HeaderTableCell key={header.id}>{header.label}</HeaderTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <StyledTableCell colSpan={tableHeaders.length} sx={{ backgroundColor: "rgba(33,150,243,0.08)" }}>
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
              <StyledTableCell>
                <a href="#" style={{ color: "#1E88E5" }}>
                  {row.name}
                </a>
              </StyledTableCell>
              <StyledTableCell>
                <TextField variant="outlined" type="number" size="small">{row.limit}</TextField>
              </StyledTableCell>
              <StyledTableCell>{row.unit}</StyledTableCell>
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
  );
};

export default TableStock;
