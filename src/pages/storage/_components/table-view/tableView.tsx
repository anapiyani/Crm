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
import { Link } from "react-router-dom"; // Import Link if using react-router-dom

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: "1.4rem",
  borderBottom: "0.1rem solid #CDD7E1",
  padding: "0.4rem 0.8rem",
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
  whiteSpace: "nowrap",
  minWidth: "min-content",
}));

const TableView = () => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
        borderBottom: "0.1rem solid #CDD7E1",
        overflowX: "auto",
        background: "#FBFCFE",
        borderRadius: "0",
        boxShadow: "none",
      }}
    >
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
                  sx={{
                    minWidth: "min-content",
                    "& input": { fontSize: "1.4rem", padding: "0.8rem" },
                  }}
                />
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <StyledTableCell
              colSpan={tableViewHeaders.length}
              sx={{
                backgroundColor: "rgba(33,150,243,0.08)",
                padding: "0.8rem",
              }}
            >
              Парикмахерский зал {">"} Estel
            </StyledTableCell>
          </TableRow>
          {tableViewData.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                "&:last-child td": { borderBottom: "none" },
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
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {header.id === "actions" ? (
                      <IconButton color="primary">
                        <Visibility sx={{ fontSize: "2rem" }} />
                      </IconButton>
                    ) : header.id === "name" ? (
                      <Link
                        to={`/product/${row.number}`}
                        style={{ textDecoration: "none", color: "#1976d2" }}
                      >
                        {row[header.id as keyof typeof row]}
                      </Link>
                    ) : (
                      row[header.id as keyof typeof row]
                    )}
                  </div>
                </StyledTableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableView;
