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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { SaveOutlined, ScienceOutlined } from "@mui/icons-material";
import classes from "./style.module.scss";

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

const tableHeaders = [
  { name: "Материал" },
  { name: "Стоимость" },
  { name: "Стоимость от" },
  { name: "Стоимость до" },
  { name: "Короткие волосы" },
  { name: "Средние волосы" },
  { name: "Длинные волосы" },
  { name: "Корни" },
  { name: "Стоимость" },
];

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
        boxShadow: "none",
        borderRadius: "16px",
        border: "0.1rem solid rgba(99,107,116, 0.3)",
        padding: "0.8rem",
        marginBottom: "2rem",
      }}
    >
      <div className={classes.tableContainer}>
        <div className={classes.tableContainer__header}>
          <p className={classes.tableContainer__header__title}>{title}</p>

          <div>
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
          </div>
        </div>
        <Divider />
      </div>

      <Table>
        <TableHead sx={{ borderBottom: "0.2rem solid var(--divider)" }}>
          <TableRow sx={{ background: "var(--neutral-050)" }}>
            {tableHeaders.map((header, index) => (
              <TableCell
                key={index}
                align="left"
                sx={{ fontSize: "14px", fontWeight: 600 }}
              >
                {header.name}
              </TableCell>
            ))}
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
                <div className={classes.tableContainer__content}>
                  <p className={classes.tableContainer__content__material}>
                    {row.material}
                  </p>
                  <div className={classes.tableContainer__content__checkboxes}>
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
                  </div>
                </div>
              </TableCell>
              <TableCell
                sx={{
                  height: "48px",
                  border: "0.1rem solid rgba(99,107,116, 0.3)",
                }}
              >
                <div className={classes.cost}>
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
                  <p className={classes.cost__text}>мл = 200 руб. </p>
                </div>
              </TableCell>
              <TableCell
                sx={{
                  height: "48px",
                  border: "0.1rem solid rgba(99,107,116, 0.3)",
                }}
              >
                <div className={classes.cost}>
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
                  <p className={classes.cost__text}>мл</p>
                </div>
              </TableCell>
              <TableCell
                sx={{
                  height: "48px",
                  border: "0.1rem solid rgba(99,107,116, 0.3)",
                }}
              >
                <div className={classes.cost}>
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
                  <p className={classes.cost__text}>мл</p>
                </div>
              </TableCell>
              <TableCell
                sx={{
                  height: "48px",
                  border: "0.1rem solid rgba(99,107,116, 0.3)",
                }}
              >
                <div className={classes.cost}>
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
                  <p className={classes.cost__text}>мл</p>
                </div>
              </TableCell>
              <TableCell
                sx={{
                  height: "48px",
                  border: "0.1rem solid rgba(99,107,116, 0.3)",
                }}
              >
                <div className={classes.cost}>
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
                  <p className={classes.cost__text}>мл</p>
                </div>
              </TableCell>
              <TableCell
                sx={{
                  height: "48px",
                  border: "0.1rem solid rgba(99,107,116, 0.3)",
                }}
              >
                <div className={classes.cost}>
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
                  <p className={classes.cost__text}>мл</p>
                </div>
              </TableCell>
              <TableCell
                sx={{
                  height: "48px",
                  border: "0.1rem solid rgba(99,107,116, 0.3)",
                }}
              >
                <div className={classes.cost}>
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
                  <p className={classes.cost__text}>мл</p>
                </div>
              </TableCell>
              <TableCell
                sx={{
                  height: "48px",
                  border: "0.1rem solid rgba(99,107,116, 0.3)",
                  borderRight: "none",
                }}
              >
                <p className={classes.cost__text}>
                  1 мл = {200 / row.cost} руб
                </p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MaterialTable;
