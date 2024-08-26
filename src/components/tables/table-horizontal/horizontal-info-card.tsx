import React from "react";
import { Add, Edit, Done, RemoveRedEyeOutlined } from "@mui/icons-material";
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
  [`&.${tableCellClasses.head}`]: {
    fontSize: "1.4rem",
    fontWeight: "700",
    borderTop: "none",
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
  type?: string;
  contact?: string;
  primary?: boolean;
};

interface ContactsTableProps {
  data: ContactRow[];
  title: string;
  showEyeIcon?: boolean;
  hasTableHead?: boolean;
}

const TableHorizontal: React.FC<ContactsTableProps> = ({
  data,
  title,
  showEyeIcon = false,
  hasTableHead = true,
}) => {
  const isSingleData = data.length === 1;

  return (
    <TableContainer
      component={Paper}
      sx={{
        border: "0.1rem solid #CDD7E1",
        borderRadius: "8px",
        boxShadow: "0rem 0.1rem 0.2rem 0rem rgba(21, 21, 21, 0.08)",
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
          {showEyeIcon ? (
            <RemoveRedEyeOutlined
              sx={{
                verticalAlign: "middle",
                fontSize: "2.4rem",
                color: "#2196F3",
              }}
            />
          ) : (
            <Edit
              sx={{
                verticalAlign: "middle",
                fontSize: "2.4rem",
                color: "#2196F3",
              }}
            />
          )}
        </Box>
      </Box>
      <Table aria-label="customized table" sx={{ borderColor: "#CDD7E1" }}>
        {hasTableHead && (
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ textAlign: "right" }}>Тип</StyledTableCell>
              <StyledTableCell>Контакт</StyledTableCell>
              <StyledTableCell>Основной</StyledTableCell>
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {data.map((row, index) => (
            <StyledTableRow key={row.contact}>
              {hasTableHead && (
                <StyledTableCell sx={{ textAlign: "right" }}>
                  {row.type}
                </StyledTableCell>
              )}
              <StyledTableCell
                sx={{
                  textAlign: isSingleData
                    ? "left"
                    : index % 2 === 0
                    ? "right"
                    : "left",
                }}
              >
                {row.contact}
              </StyledTableCell>
              {hasTableHead && (
                <StyledTableCell sx={{ textAlign: "right" }}>
                  {row.primary ? (
                    <Done sx={{ fontSize: "2.4rem", color: "#2E7D32" }} />
                  ) : (
                    ""
                  )}
                </StyledTableCell>
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableHorizontal;
