import React from "react";
import { Edit, Lock } from "@mui/icons-material";
import {
  Box,
  Paper,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  tableCellClasses,
  styled,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    fontSize: "2.4rem",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor: theme.palette.common.white,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.common.white,
  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.common.white,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "& td, & th": {
    borderTop: `0.1rem  ${theme.palette.divider}`,
  },
}));

type DataRow = {
  property: string;
  value: string | number;
};

interface TableVerticalProps {
  data: DataRow[];
}

const TableVertical: React.FC<TableVerticalProps> = ({ data }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        width: "45rem",
        margin: "auto",
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
            width: "41rem",
            padding: "1.6rem",
            pr: "2.4rem",
          }}
        >
          Главное
          <Edit
            sx={{
              verticalAlign: "middle",
              fontSize: "2.4rem",
              color: "#2196F3",
            }}
          />
        </Box>
        <Box sx={{ padding: "0.8rem" }}>
          <Lock
            sx={{
              verticalAlign: "middle",
              fontSize: "2.4rem",
              color: "#2196F3",
            }}
          />
        </Box>
      </Box>
      <Table aria-label="customized table" sx={{ borderColor: "#CDD7E1" }}>
        <TableBody>
          {data.map((row, index) => (
            <StyledTableRow key={row.property}>
              <StyledTableCell
                component="th"
                scope="row"
                sx={{
                  width: "18rem",
                  textAlign: "right",
                  paddingRight: "16px",
                  borderTop: index === 0 ? "0.1rem solid #CDD7E1" : undefined,
                }}
              >
                {row.property}
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  textAlign: "left",
                  fontWeight: ["Фамилия", "Имя", "Отчество"].includes(
                    row.property
                  )
                    ? "bold"
                    : "normal",
                }}
              >
                {row.value}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// Sample data to be passed as props
const rows: DataRow[] = [
  { property: "ID сотрудника", value: 6 },
  { property: "Статус", value: "Работает" },
  { property: "Должность", value: "Универсал, Парикмахерский зал" },
  { property: "Фамилия", value: "Гунина" },
  { property: "Имя", value: "Анастасия" },
  { property: "Отчество", value: "Максимовна" },
  { property: "Отобр. онлайн", value: "Да" },
  { property: "Моб. телефон", value: "+ (777) 7777-76-66" },
  { property: "Push-уведомления", value: "Да" },
];

export default TableVertical;
