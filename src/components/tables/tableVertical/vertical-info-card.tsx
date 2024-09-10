import React, { useState } from "react";
import { Edit, Lock, Add } from "@mui/icons-material"; // Import the Add icon
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
  Select,
  MenuItem,
  SelectChangeEvent,
  IconButton,
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
  property?: string;
  value?: string | number | boolean;
  link?: string;
  linkLabel?: string;
};

interface TableVerticalProps {
  data: DataRow[];
  title: string;
  showLockIcon?: boolean;
  extraAction?: React.ReactNode;
  includeDropdown?: boolean;
  noIcon?: boolean;
  showAddIcon?: boolean;
}

const TableVertical: React.FC<TableVerticalProps> = ({
  data,
  title,
  showLockIcon = false,
  extraAction,
  includeDropdown = false,
  noIcon = false,
  showAddIcon = false, // Default is false, meaning no Add icon by default
}) => {
  const [dropdownValue, setDropdownValue] = useState<string | number>(
    data[data.length - 1].value as string | number
  );

  const handleDropdownChange = (event: SelectChangeEvent<string | number>) => {
    setDropdownValue(event.target.value as string);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        border: "0.1rem solid #CDD7E1",
        borderRadius: "8px",
        boxShadow: "0rem 0.1rem 0.2rem 0rem rgba(21, 21, 21, 0.08)",
        width: "100%",
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
          {noIcon ? null : !showLockIcon ? (
            <>
              <Box
                sx={{
                  padding: "0.8rem",
                  pr: "2.4rem",
                }}
              >
                <IconButton>
                  <Edit
                    sx={{
                      verticalAlign: "middle",
                      fontSize: "2.4rem",
                      color: "#2196F3",
                    }}
                  />
                </IconButton>
              </Box>
              {showAddIcon && (
                <Box
                  sx={{
                    padding: "0.8rem",
                    pr: "2.4rem",
                  }}
                >
                  <IconButton>
                    <Add
                      sx={{
                        verticalAlign: "middle",
                        fontSize: "2.4rem",
                        color: "#2196F3",
                      }}
                    />
                  </IconButton>
                </Box>
              )}
            </>
          ) : (
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
                <IconButton>
                  <Edit
                    sx={{
                      verticalAlign: "middle",
                      fontSize: "2.4rem",
                      color: "#2196F3",
                    }}
                  />
                </IconButton>
              </Box>
              <Box sx={{ padding: "0.8rem" }}>
                <IconButton>
                  <Lock
                    sx={{
                      verticalAlign: "middle",
                      fontSize: "2.4rem",
                      color: "#2196F3",
                    }}
                  />
                </IconButton>
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
                    row.property!,
                  )
                    ? "bold"
                    : "normal",
                }}
              >
                {index === data.length - 1 && includeDropdown ? (
                  <Select
                    value={dropdownValue}
                    sx={{ minWidth: 200, color: "rgba(0,0,0,0.38)" }}
                    onChange={handleDropdownChange}
                  >
                    <MenuItem value="Пользовательский аккаунт активен">
                      Пользовательский аккаунт активен
                    </MenuItem>
                    <MenuItem value="Пользовательский аккаунт не активен">
                      Пользовательский аккаунт не активен
                    </MenuItem>
                  </Select>
                ) : row.link ? (
                  <>
                    {row.value}{" "}
                    <a
                      href={row.link}
                      style={{
                        color: "var(--link-500)",
                        textDecoration: "none",
                      }}
                    >
                      {row.linkLabel}
                    </a>
                  </>
                ) : (
                  row.value
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableVertical;
