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
    fontSize: "2.4rem",
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

type DataRow = {
  property: string;
  value: string | number;
};

interface TableVerticalProps {
  data: DataRow[];
  title: string;
  showLockIcon?: boolean;
  extraAction?: React.ReactNode;
}

const TableVertical: React.FC<TableVerticalProps> = ({
  data,
  title,
  showLockIcon = false,
  extraAction,
}) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
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
            // width: showLockIcon || extraAction ? "41rem" : "100%",
            padding: "1.6rem",
            pr: "2.4rem",
          }}
        >
          {title}
          {extraAction}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {!showLockIcon && (
            <Box
              sx={{
                padding: "0.8rem",
                pr: "2.4rem",
              }}
            >
              <Edit
                sx={{
                  verticalAlign: "middle",
                  fontSize: "2.4rem",
                  color: "#2196F3",
                }}
              />
            </Box>
          )}

          {showLockIcon && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  padding: "0.8rem",
                  pr: "2.4rem",
                }}
              >
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
          )}
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
                  paddingRight: "1.6rem",
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

export default TableVertical;
