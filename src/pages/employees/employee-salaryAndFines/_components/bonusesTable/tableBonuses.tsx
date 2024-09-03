import React from "react";
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
  IconButton,
  Typography,
} from "@mui/material";
import { Clear } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

export interface SalaryData {
  number: number;
  salaryItem: string;
  type: string;
  revenue: {
    mainText: string;
    subText: string;
  };
  materials: string;
  salary: string;
  salaryFormula: string;
  accrued: {
    mainText: string;
    subText: string;
  };
  link: string;
  linkText: string;
  employee: string;
  deleteLink: string;
}

interface SalaryTableProps {
  data: SalaryData[];
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: "1.4rem",
  border: "0.1rem solid #CDD7E1",
  verticalAlign: "top",
}));

const HighlightedTableCell = styled(StyledTableCell)({
  color: "#388E3C",
});

const NumberTableCell = styled(StyledTableCell)({
  fontSize: "1.6rem",
});

// Subtext style
const SubText = styled(Typography)({
  fontSize: "1.2rem",
  color: "rgba(0, 0, 0, 0.6)",
  marginTop: "0.2rem",
});

const tableHeaders = [
  { id: "number", label: "№" },
  { id: "salaryItem", label: "Статья зарплаты" },
  { id: "type", label: "Тип статьи" },
  { id: "revenue", label: "Выручка" },
  { id: "materials", label: "Материалы" },
  { id: "salary", label: "Зарплата" },
  { id: "salaryFormula", label: "Формула з/п" },
  { id: "accrued", label: "Начислено" },
  { id: "link", label: "Связь" },
];

const SalaryTable: React.FC<SalaryTableProps> = ({ data }) => {
  return (
    <Paper
      sx={{
        border: "0.1rem solid #CDD7E1",
        borderRadius: "8px",
        boxShadow: "0rem 0.1rem 0.2rem 0rem rgba(21, 21, 21, 0.08)",
        width: "100%",
        padding: "0.8rem",
      }}
    >
      <TableContainer sx={{ borderRadius: "4px" }}>
        <Table aria-label="salary table">
          <TableHead
            sx={{
              backgroundColor: "#FBFCFE",
            }}
          >
            <TableRow>
              {tableHeaders.map((header) => (
                <StyledTableCell key={header.id}>
                  {header.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={row.number}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#FBFCFE" : "white",
                }}
              >
                <NumberTableCell>{row.number}</NumberTableCell>
                <StyledTableCell>{row.salaryItem}</StyledTableCell>
                <StyledTableCell>{row.type}</StyledTableCell>
                <StyledTableCell>
                  {row.revenue.mainText}
                  <SubText>{row.revenue.subText}</SubText>
                </StyledTableCell>
                <StyledTableCell>{row.materials}</StyledTableCell>
                <HighlightedTableCell>{row.salary}</HighlightedTableCell>
                <StyledTableCell>{row.salaryFormula}</StyledTableCell>
                <StyledTableCell>
                  {row.accrued.mainText}
                  <SubText>{row.accrued.subText}</SubText>
                </StyledTableCell>
                <StyledTableCell>
                  <Link
                    href={row.link}
                    color="primary"
                    sx={{ textDecoration: "none" }}
                  >
                    {row.linkText}
                  </Link>
                  <Link
                    component="span"
                    display="block"
                    sx={{ textDecoration: "none" }}
                  >
                    {row.employee}
                  </Link>
                  <IconButton color="error" href={row.deleteLink}>
                    <Clear sx={{ fontSize: "1.4rem" }} />
                  </IconButton>
                  <Link href={row.deleteLink} color="error" sx={{ ml: 0.5 }}>
                    Удалить
                  </Link>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default SalaryTable;
