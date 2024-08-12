import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  Box,
  IconButton,
  Divider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { SaveOutlined, ScienceOutlined } from "@mui/icons-material";

interface MaterialData {
  material: string;
  cost: number;
  costFrom: number;
  costTo: number;
  shortHair: number;
  mediumHair: number;
  longHair: number;
  roots: number;
  alwaysUse: boolean;
  canChange: boolean;
  paidByClient: boolean;
  finalCost: string;
}

interface MaterialTableProps {
  data: MaterialData[];
  title: string;
}

const MaterialTable: React.FC<MaterialTableProps> = ({ data, title }) => {
  const [tableData, setTableData] = useState<MaterialData[]>(data);

  const handleInputChange = (
    index: number,
    field: keyof Omit<
      MaterialData,
      "material" | "finalCost" | "alwaysUse" | "canChange" | "paidByClient"
    >,
    value: number
  ) => {
    const newData = [...tableData];
    newData[index][field] = value;
    setTableData(newData);
  };

  const handleCheckboxChange = (
    index: number,
    field: keyof Pick<MaterialData, "alwaysUse" | "canChange" | "paidByClient">,
    value: boolean
  ) => {
    const newData = [...tableData];
    newData[index][field] = value;
    setTableData(newData);
  };

  const calculateCostFrom = (row: MaterialData) => {
    return row.cost;
  };

  const calculateCostTo = (row: MaterialData) => {
    return row.cost + row.shortHair + row.mediumHair + row.longHair + row.roots;
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow:
          "0 0 12px rgba(21, 21, 21, 0.08), 0 2px 8px rgba(21, 21, 21, 0.08)",
        borderRadius: "16px",
        border: "0.1rem solid rgba(99,107,116, 0.3)",
        padding: "0.8rem",
        marginBottom: "2rem",
      }}
    >
      <Box sx={{ p: " 1.6rem 0 1.6rem 0.8rem" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography fontSize="2.4rem" fontWeight={600}>
            {title}
          </Typography>

          <Box>
            <IconButton>
              <SaveOutlined
                sx={{ fontSize: "24px", color: "var(--primary-500)" }}
              />
            </IconButton>

            <IconButton>
              <ScienceOutlined
                sx={{ fontSize: "24px", color: "var(--primary-500)" }}
              />
            </IconButton>
          </Box>
        </Box>
        <Divider />
      </Box>

      <Table>
        <TableHead sx={{ borderBottom: "0.2rem solid var(--divider)" }}>
          <TableRow sx={{ background: "var(--neutral-050)" }}>
            <TableCell align="left" sx={{ fontSize: "14px", fontWeight: 600 }}>
              Материал
            </TableCell>
            <TableCell align="left" sx={{ fontSize: "14px", fontWeight: 600 }}>
              Стоимость
            </TableCell>
            <TableCell align="left" sx={{ fontSize: "14px", fontWeight: 600 }}>
              Стоимость от
            </TableCell>
            <TableCell align="left" sx={{ fontSize: "14px", fontWeight: 600 }}>
              Стоимость до
            </TableCell>
            <TableCell align="left" sx={{ fontSize: "14px", fontWeight: 600 }}>
              Короткие волосы
            </TableCell>
            <TableCell align="left" sx={{ fontSize: "14px", fontWeight: 600 }}>
              Средние волосы
            </TableCell>
            <TableCell align="left" sx={{ fontSize: "14px", fontWeight: 600 }}>
              Длинные волосы
            </TableCell>
            <TableCell align="left" sx={{ fontSize: "14px", fontWeight: 600 }}>
              Корни
            </TableCell>
            <TableCell align="left" sx={{ fontSize: "14px", fontWeight: 600 }}>
              Стоимость
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                backgroundColor: index % 2 === 0 ? "inherit" : "var(--grey-50)",
                "&:last-child td, &:last-child th": { borderBottom: 0 },
                height: "48px",
              }}
            >
              <TableCell
                sx={{
                  fontSize: "14px",
                  border: "0.1rem solid rgba(99,107,116, 0.3)",
                  borderLeft: "none",
                  padding: "0.8rem 1rem",
                }}
              >
                <Box display="flex" flexDirection="column">
                  <Typography
                    sx={{ color: "var(--text-secondary)", fontSize: "1.2rem" }}
                  >
                    {row.material}
                  </Typography>
                  <Box display="flex" flexDirection="column" ml={2}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={row.alwaysUse}
                          onChange={(e) =>
                            handleCheckboxChange(
                              index,
                              "alwaysUse",
                              e.target.checked
                            )
                          }
                        />
                      }
                      label="используется всегда"
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          fontSize: "14px",
                        },
                      }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={row.canChange}
                          onChange={(e) =>
                            handleCheckboxChange(
                              index,
                              "canChange",
                              e.target.checked
                            )
                          }
                        />
                      }
                      label="можно изменить"
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          fontSize: "14px",
                        },
                      }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={row.paidByClient}
                          onChange={(e) =>
                            handleCheckboxChange(
                              index,
                              "paidByClient",
                              e.target.checked
                            )
                          }
                        />
                      }
                      label="оплачивается клиентом"
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          fontSize: "14px",
                        },
                      }}
                    />
                  </Box>
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  height: "48px",
                  border: "0.1rem solid rgba(99,107,116, 0.3)",
                }}
              >
                <Box display="flex" alignItems="center">
                  <TextField
                    value={row.cost}
                    onChange={(e) =>
                      handleInputChange(index, "cost", Number(e.target.value))
                    }
                    sx={{
                      width: "60px",
                      marginRight: "1.6rem",
                    }}
                    InputProps={{
                      sx: {
                        fontSize: "16px",
                      },
                    }}
                    size="small"
                  />
                  <Typography fontSize="16px">мл = 200 руб. </Typography>
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  height: "48px",
                  border: "0.1rem solid rgba(99,107,116, 0.3)",
                }}
              >
                <Box display="flex" alignItems="center">
                  <TextField
                    value={row.costFrom}
                    sx={{
                      width: "60px",
                      marginRight: "1.6rem",
                    }}
                    InputProps={{
                      sx: {
                        fontSize: "16px",
                      },
                      readOnly: true,
                    }}
                    size="small"
                  />
                  <Typography fontSize="16px">мл</Typography>
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  height: "48px",
                  border: "0.1rem solid rgba(99,107,116, 0.3)",
                }}
              >
                <Box display="flex" alignItems="center">
                  <TextField
                    value={row.costTo}
                    sx={{
                      width: "60px",
                      marginRight: "1.6rem",
                    }}
                    InputProps={{
                      sx: {
                        fontSize: "16px",
                      },
                      readOnly: true,
                    }}
                    size="small"
                  />
                  <Typography fontSize="16px">мл</Typography>
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  height: "48px",
                  border: "0.1rem solid rgba(99,107,116, 0.3)",
                }}
              >
                <Box display="flex" alignItems="center">
                  <TextField
                    value={row.shortHair}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "shortHair",
                        Number(e.target.value)
                      )
                    }
                    sx={{
                      width: "60px",
                      marginRight: "1.6rem",
                    }}
                    InputProps={{
                      sx: {
                        fontSize: "16px",
                      },
                    }}
                    size="small"
                  />
                  <Typography fontSize="16px">мл</Typography>
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  height: "48px",
                  border: "0.1rem solid rgba(99,107,116, 0.3)",
                }}
              >
                <Box display="flex" alignItems="center">
                  <TextField
                    value={row.mediumHair}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "mediumHair",
                        Number(e.target.value)
                      )
                    }
                    sx={{
                      width: "60px",
                      marginRight: "1.6rem",
                    }}
                    InputProps={{
                      sx: {
                        fontSize: "16px",
                      },
                    }}
                    size="small"
                  />
                  <Typography fontSize="16px">мл</Typography>
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  height: "48px",
                  border: "0.1rem solid rgba(99,107,116, 0.3)",
                }}
              >
                <Box display="flex" alignItems="center">
                  <TextField
                    value={row.longHair}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "longHair",
                        Number(e.target.value)
                      )
                    }
                    sx={{
                      width: "60px",
                      marginRight: "1.6rem",
                    }}
                    InputProps={{
                      sx: {
                        fontSize: "16px",
                      },
                    }}
                    size="small"
                  />
                  <Typography fontSize="16px">мл</Typography>
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  height: "48px",
                  border: "0.1rem solid rgba(99,107,116, 0.3)",
                }}
              >
                <Box display="flex" alignItems="center">
                  <TextField
                    value={row.roots}
                    onChange={(e) =>
                      handleInputChange(index, "roots", Number(e.target.value))
                    }
                    sx={{
                      width: "60px",
                      marginRight: "1.6rem",
                    }}
                    InputProps={{
                      sx: {
                        fontSize: "16px",
                      },
                    }}
                    size="small"
                  />
                  <Typography fontSize="16px">мл</Typography>
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  height: "48px",
                  border: "0.1rem solid rgba(99,107,116, 0.3)",
                  borderRight: "none",
                }}
              >
                <Typography fontSize="16px">
                  1 мл = {200 / row.cost} руб
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MaterialTable;
