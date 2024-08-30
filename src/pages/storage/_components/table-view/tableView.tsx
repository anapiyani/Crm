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
  IconButton,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { tableViewHeaders, tableViewData } from "../../data";

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

const TableView = () => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
        overflowX: "auto",
        background: "#FBFCFE",
        borderRadius: "0",
      }}
    >
      <div
        style={{
          padding: "0.8rem",
          backgroundColor: "rgba(33,150,243,0.08)",
        }}
      >
        <p style={{ fontSize: "1.4rem", color: "#32383E" }}>
          Парикмахерский зал {">"} Estel
        </p>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            {tableViewHeaders.map((header) => (
              <HeaderTableCell key={header.id}>{header.label}</HeaderTableCell>
            ))}
          </TableRow>
          <TableRow>
            {tableViewHeaders.map((header) => (
              <StyledTableCell key={`filter-${header.id}`}>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder={header.label}
                />
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {tableViewData.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                "&:last-child td": { borderBottom: "none" }, // Remove bottom border of the last row
              }}
            >
              {tableViewHeaders.map((header) => (
                <StyledTableCell
                  key={header.id}
                  sx={{
                    backgroundColor: "#FAFAFA",
                    border: "0.1rem solid #CDD7E1", 
                  }}
                >
                  {row[header.id as keyof typeof row]}
                </StyledTableCell>
              ))}
              <StyledTableCell
                sx={{
                  backgroundColor: "#FAFAFA",
                  border: "0.1rem solid #CDD7E1", 
                }}
              >
                <IconButton>
                  <Visibility />
                </IconButton>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableView;
