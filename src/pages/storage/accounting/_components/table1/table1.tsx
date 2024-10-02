import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import classes from "./styles.module.scss";
import CustomTextField from "@/components/textField/textField.component";

const Table1 = () => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow:
          "0 0 12px rgba(21, 21, 21, 0.08), 0 2px 8px rgba(21, 21, 21, 0.08)",
        borderRadius: "8px",
        border: "0.1rem solid var(--neutral-300)",
        padding: "0.8rem",
      }}
    >
      <div
        style={{
          borderRadius: "8px",
          border: "0.1rem solid var(--neutral-300)",
        }}
      >
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>
                Артикул
                <div style={{ paddingTop: "1rem" }}>
                  <CustomTextField
                    label={"Артикул"}
                    size="small"
                    style={{ width: "10rem", height: "5rem" }}
                  />
                </div>
              </TableCell>
              <TableCell>
                Штрих-код
                <div style={{ paddingTop: "1rem" }}>
                  <CustomTextField
                    label={"Штрих-код"}
                    size="small"
                    style={{ width: "20rem", height: "5rem" }}
                  />
                </div>
              </TableCell>
              <TableCell>
                Название
                <div style={{ paddingTop: "1rem" }}>
                  <CustomTextField
                    label={"Название"}
                    size="small"
                    style={{ width: "60rem", height: "5rem" }}
                  />
                </div>
              </TableCell>
              <TableCell>
                Зал
                <div style={{ paddingTop: "1rem" }}>
                  <CustomTextField
                    label={"Зал"}
                    size="small"
                    style={{ width: "10rem", height: "5rem" }}
                  />
                </div>
              </TableCell>
              <TableCell>
                Витрина
                <div style={{ paddingTop: "1rem" }}>
                  <CustomTextField
                    label={"Витрина"}
                    size="small"
                    style={{ width: "10rem", height: "5rem" }}
                  />
                </div>
              </TableCell>
              <TableCell>
                Всего
                <div style={{ paddingTop: "1rem" }}>
                  <CustomTextField
                    label={"Всего"}
                    size="small"
                    style={{ width: "10rem", height: "5rem" }}
                  />
                </div>
              </TableCell>
              <TableCell>История</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>99756522</TableCell>
              <TableCell>4400523594064929</TableCell>
              <TableCell>Estel Shampoo shshs</TableCell>
              <TableCell>16 шт, 81 г</TableCell>
              <TableCell>8 шт</TableCell>
              <TableCell>24 шт, 81 г</TableCell>
              <TableCell>Саламалейкум</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </TableContainer>
  );
};

export default Table1;
