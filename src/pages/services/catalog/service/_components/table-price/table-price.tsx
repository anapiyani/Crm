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
} from "@mui/material";
import { SaveOutlined, Man3Outlined, } from "@mui/icons-material/";

interface CostData {
  position: string;
  cost: number;
  costFrom: number;
  costTo: number;
  shortHair: number;
  mediumHair: number;
  longHair: number;
  roots: number;
  children?: CostData[];
}

interface CostTableProps {
  data: CostData[];
  title: string;
  unit: string;
  showIcons?: boolean;
  hierarchy?: boolean;
}

const CostTable: React.FC<CostTableProps> = ({
  data,
  title,
  unit,
  showIcons = true,
  hierarchy = false,
}) => {
  const [tableData, setTableData] = useState<CostData[]>(data);
  const handleInputChange = (
    index: number,
    field: keyof Omit<
      CostData,
      "position" | "costFrom" | "costTo" | "children"
    >,
    value: number
  ) => {
    const newData: CostData[] = [...tableData];
    newData[index][field] = value;

    newData[index].costFrom = calculateCostFrom(newData[index]);
    newData[index].costTo = calculateCostTo(newData[index]);

    setTableData(newData);
  };

  const calculateCostFrom = (row: CostData) => {
    return row.cost;
  };

  const calculateCostTo = (row: CostData) => {
    return row.cost + row.shortHair + row.mediumHair + row.longHair + row.roots;
  };

  const renderRows = (rowData: CostData[], level: number = 0) => {
    return rowData.map((row, index) => (
      <React.Fragment key={index}>
        <TableRow
          sx={{
            backgroundColor: index % 2 === 0 ? "inherit" : "var(--grey-50)",
            "&:last-child td, &:last-child th": { borderBottom: 0 },
            height: "48px",
          }}
        >
          <TableCell
            sx={{
              fontSize: "14px",
              pl: hierarchy ? `${1 + level * 3}rem` : "1rem",
              color: level > 0 ? "var(--primary-500)" : "inherit",
              height: "48px",
              border: "0.1rem solid rgba(99,107,116, 0.3)",
              borderLeft: "none",
            }}
          >
            {row.position}
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
                  width: "80px",
                  marginRight: "1.6rem",
                }}
                InputProps={{
                  sx: {
                    fontSize: "16px",
                  },
                }}
                size="small"
              />
              <Typography fontSize="16px">{unit}</Typography>
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
                  width: "80px",
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
              <Typography fontSize="16px">{unit}</Typography>
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
                  width: "80px",
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
              <Typography fontSize="16px">{unit}</Typography>
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
                  handleInputChange(index, "shortHair", Number(e.target.value))
                }
                sx={{
                  width: "80px",
                  marginRight: "1.6rem",
                }}
                InputProps={{
                  sx: {
                    fontSize: "16px",
                  },
                }}
                size="small"
              />
              <Typography fontSize="16px">{unit}</Typography>
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
                  handleInputChange(index, "mediumHair", Number(e.target.value))
                }
                sx={{
                  width: "80px",
                  marginRight: "1.6rem",
                }}
                InputProps={{
                  sx: {
                    fontSize: "16px",
                  },
                }}
                size="small"
              />
              <Typography fontSize="16px">{unit}</Typography>
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
                  handleInputChange(index, "longHair", Number(e.target.value))
                }
                sx={{
                  width: "80px",
                  marginRight: "1.6rem",
                }}
                InputProps={{
                  sx: {
                    fontSize: "16px",
                  },
                }}
                size="small"
              />
              <Typography fontSize="16px">{unit}</Typography>
            </Box>
          </TableCell>
          <TableCell
            sx={{
              height: "48px",
              border: "0.1rem solid rgba(99,107,116, 0.3)",
              borderRight: "none",
            }}
          >
            <Box display="flex" alignItems="center">
              <TextField
                value={row.roots}
                onChange={(e) =>
                  handleInputChange(index, "roots", Number(e.target.value))
                }
                sx={{
                  width: "80px",
                  marginRight: "1.6rem",
                }}
                InputProps={{
                  sx: {
                    fontSize: "16px",
                  },
                }}
                size="small"
              />
              <Typography fontSize="16px">{unit}</Typography>
            </Box>
          </TableCell>
        </TableRow>
        {row.children && renderRows(row.children, level + 1)}
      </React.Fragment>
    ));
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

            {showIcons && (
              <IconButton>
                <Man3Outlined
                  sx={{ fontSize: "24px", color: "var(--primary-500)" }}
                />
              </IconButton>
            )}
          </Box>
        </Box>
        <Divider />
      </Box>

      <Table>
        <TableHead sx={{ borderBottom: "0.2rem solid var(--divider)" }}>
          <TableRow sx={{ background: "var(--neutral-050)" }}>
            <TableCell align="left" sx={{ fontSize: "14px", fontWeight: 600 }}>
              Должность
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
          </TableRow>
        </TableHead>
        <TableBody>{renderRows(tableData)}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default CostTable;
