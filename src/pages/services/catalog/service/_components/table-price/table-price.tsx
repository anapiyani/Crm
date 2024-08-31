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
  IconButton,
  Divider,
} from "@mui/material";
import { SaveOutlined, Man3Outlined } from "@mui/icons-material/";
import classes from "./style.module.scss";

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

const tableHeaders = [
  { name: "Материал" },
  { name: "Стоимость" },
  { name: "Стоимость от" },
  { name: "Стоимость до" },
  { name: "Короткие волосы" },
  { name: "Средние волосы" },
  { name: "Длинные волосы" },
  { name: "Корни" },
];

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
    value: number,
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
            <div className={classes.cellContainer}>
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
              <p className={classes.cellContainer__text}>{unit}</p>
            </div>
          </TableCell>
          <TableCell
            sx={{
              height: "48px",
              border: "0.1rem solid rgba(99,107,116, 0.3)",
            }}
          >
            <div className={classes.cellContainer}>
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
              <p className={classes.cellContainer__text}>{unit}</p>
            </div>
          </TableCell>
          <TableCell
            sx={{
              height: "48px",
              border: "0.1rem solid rgba(99,107,116, 0.3)",
            }}
          >
            <div className={classes.cellContainer}>
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
              <p className={classes.cellContainer__text}>{unit}</p>
            </div>
          </TableCell>
          <TableCell
            sx={{
              height: "48px",
              border: "0.1rem solid rgba(99,107,116, 0.3)",
            }}
          >
            <div className={classes.cellContainer}>
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
              <p className={classes.cellContainer__text}>{unit}</p>
            </div>
          </TableCell>
          <TableCell
            sx={{
              height: "48px",
              border: "0.1rem solid rgba(99,107,116, 0.3)",
            }}
          >
            <div className={classes.cellContainer}>
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
              <p className={classes.cellContainer__text}>{unit}</p>
            </div>
          </TableCell>
          <TableCell
            sx={{
              height: "48px",
              border: "0.1rem solid rgba(99,107,116, 0.3)",
            }}
          >
            <div className={classes.cellContainer}>
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
              <p className={classes.cellContainer__text}>{unit}</p>
            </div>
          </TableCell>
          <TableCell
            sx={{
              height: "48px",
              border: "0.1rem solid rgba(99,107,116, 0.3)",
              borderRight: "none",
            }}
          >
            <div className={classes.cellContainer}>
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
              <p className={classes.cellContainer__text}>{unit}</p>
            </div>
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
        boxShadow: "none",
        borderRadius: "16px",
        border: "0.1rem solid rgba(99,107,116, 0.3)",
        padding: "0.8rem",
        marginBottom: "2rem",
      }}
    >
      <div className={classes.tableTitleContainer}>
        <div className={classes.tableTitleContainer__inner}>
          <p className={classes.tableTitleContainer__inner__title}>{title}</p>

          <div>
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
          </div>
        </div>
        <Divider />
      </div>

      <Table>
        <TableHead sx={{ borderBottom: "0.2rem solid var(--divider)" }}>
          <TableRow sx={{ background: "var(--neutral-050)" }}>
            {tableHeaders.map((header, index) => (
              <TableCell
                align="left"
                sx={{ fontSize: "14px", fontWeight: 600 }}
              >
                {header.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{renderRows(tableData)}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default CostTable;
