import React, { useEffect, useState } from "react";
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
import { IServiceCostData, IServiceParameters } from "@/ts/service.interface";
import { maxHeaderSize } from "http";
import { useQuery } from "@tanstack/react-query";

interface CostTableProps {
  data: IServiceCostData[];
  title: string;
  unit: string;
  showIcons?: boolean;
  hierarchy?: boolean;
  hasParameters?: boolean;
  tableHeaders?: { name: string; key?: string }[];
}

const CostTable: React.FC<CostTableProps> = ({
  data,
  title,
  unit,
  showIcons = true,
  hierarchy = false,
  hasParameters = false,
  tableHeaders = [{ name: "Должность" }, { name: "Стоимость" }],
}) => {
  const [tableData, setTableData] = useState<IServiceCostData[]>(data);

  const handleInputChange = (
    index: number,
    field: keyof Omit<
      IServiceCostData,
      "position" | "costFrom" | "costTo" | "children"
    >,
    value: number
  ) => {
    const newData: IServiceCostData[] = [...tableData];
    newData[index][field] = value;

    newData[index].costFrom = calculateCostFrom(newData[index]);
    newData[index].costTo = calculateCostTo(newData[index]);

    setTableData(newData);
  };

  useEffect(() => {
    data.forEach((row) => {
      row.costFrom = calculateCostFrom(row);
      row.costTo = calculateCostTo(row);
    });
    renderRows(data);
  }, [data]);

  const calculateCostFrom = (row: IServiceCostData) => {
    return Math.min(row.shortHair!, row.mediumHair!, row.longHair!, row.roots!);
  };

  const calculateCostTo = (row: IServiceCostData) => {
    return Math.max(row.shortHair!, row.mediumHair!, row.longHair!, row.roots!);
  };

  useEffect(() => {
    setTableData(data);
  }, [tableData]);

  const renderHeader = () => {
    return tableHeaders.map((header, index) => (
      <TableCell align="left" sx={{ fontSize: "14px", fontWeight: 600 }}>
        {header.name}
      </TableCell>
    ));
  };
  const renderRows = (rowData: IServiceCostData[], level: number = 0) => {
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
                //only number input
                type="number"
                onChange={(e) =>
                  handleInputChange(index, "cost", Number(e.target.value))
                }
                defaultValue={row.cost ? row.cost : 0}
                sx={{
                  width: hasParameters ? "100%" : "100%",
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
          {hasParameters && (
            <>
              <TableCell
                sx={{
                  height: "48px",
                  border: "0.1rem solid rgba(99,107,116, 0.3)",
                }}
              >
                <div className={classes.cellContainer}>
                  <TextField
                    value={row.costFrom}
                    type="number"
                    sx={{
                      width: "100%",
                      marginRight: "1.6rem",
                    }}
                    defaultValue={row.costFrom ? row.costFrom : 0}
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
                    type="number"
                    sx={{
                      width: "100%",
                      marginRight: "1.6rem",
                    }}
                    InputProps={{
                      sx: {
                        fontSize: "16px",
                      },
                      readOnly: true,
                    }}
                    defaultValue={row.costTo ? row.costTo : 0}
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
                    type="number"
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "shortHair",
                        Number(e.target.value)
                      )
                    }
                    sx={{
                      width: "100%",
                      marginRight: "1.6rem",
                    }}
                    InputProps={{
                      sx: {
                        fontSize: "16px",
                      },
                    }}
                    defaultValue={row.shortHair ? row.shortHair : 0}
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
                    type="number"
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "mediumHair",
                        Number(e.target.value)
                      )
                    }
                    defaultValue={row.mediumHair ? row.mediumHair : 0}
                    sx={{
                      width: "100%",
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
                    type="number"
                    defaultValue={row.longHair ? row.longHair : 0}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "longHair",
                        Number(e.target.value)
                      )
                    }
                    sx={{
                      width: "100%",
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
                    type="number"
                    defaultValue={row.roots ? row.roots : 0}
                    onChange={(e) =>
                      handleInputChange(index, "roots", Number(e.target.value))
                    }
                    sx={{
                      width: "100%",
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
            </>
          )}
        </TableRow>
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
            {renderHeader()}
          </TableRow>
        </TableHead>
        <TableBody>{renderRows(tableData)}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default CostTable;
