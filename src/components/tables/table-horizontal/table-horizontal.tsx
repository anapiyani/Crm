import React from "react";
import { Add, Edit, Done, BorderTop } from "@mui/icons-material";
import {
  Box,
  Paper,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  TableHead,
  tableCellClasses,
  styled,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    textAlign: "right",
  },
  [`&.${tableCellClasses.head}`]: {
    fontSize: "1.4rem",
    fontWeight: "700",
    BorderTop: "none",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,

  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "& td, & th": {
    borderTop: `0.1rem ${theme.palette.divider}`,
  },
}));

type ContactRow = {
  type: string;
  contact: string;
  primary: boolean;
};

interface ContactsTableProps {
  data: ContactRow[];
  title: string;
}

const TableHorizontal: React.FC<ContactsTableProps> = ({ data, title }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        width: "45rem",
        border: "0.1rem solid",
        borderRadius: "8px",
        borderColor: "#CDD7E1",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "0.1rem solid #CDD7E1",
        }}
      >
        <Box
          sx={{
            fontSize: "2.4rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            padding: "1.6rem",
            pr: "2.4rem",
          }}
        >
          {title}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              ml: "1rem",
              color: "#2196F3",
              cursor: "pointer",
              gap: "8px",
            }}
          >
            <Add sx={{ verticalAlign: "middle", fontSize: "2.4rem" }} />
            <Box sx={{ fontSize: "1.5rem", fontWeight: 500 }}>ДОБАВИТЬ</Box>
          </Box>
        </Box>
        <Box sx={{ p: "0.8rem" }}>
          <Edit
            sx={{
              verticalAlign: "middle",
              fontSize: "2.4rem",
              color: "#2196F3",
            }}
          />
        </Box>
      </Box>
      <Table aria-label="customized table" sx={{ borderColor: "#CDD7E1" }}>
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ textAlign: "right" }}>Тип</StyledTableCell>
            <StyledTableCell>Контакт</StyledTableCell>
            <StyledTableCell>Основной</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.contact}>
              <StyledTableCell>{row.type}</StyledTableCell>
              <StyledTableCell>{row.contact}</StyledTableCell>
              <StyledTableCell>
                {row.primary ? (
                  <Done sx={{ fontSize: "2.4rem", color: "#2E7D32" }} />
                ) : (
                  ""
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableHorizontal;
