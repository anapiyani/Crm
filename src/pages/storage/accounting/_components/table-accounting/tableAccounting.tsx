// Table2.tsx
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
import QuantitySelector from "../quantity-input/quantity-input";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TableRowData, TableConfig, CellConfig } from "./data"; // Adjust the path as needed

interface TableAccountingProps {
  data: TableRowData[];
  config: TableConfig;
}

const renderCellContent = (cell: CellConfig) => {
  return (
    <>
      {cell.visibleText && <span>{cell.textFieldLabel}</span>}
      {cell.isTextFieldVisible && (
        <CustomTextField
          label={cell.textFieldLabel || ""}
          size="small"
          style={{ width: cell.textFieldLength || "20rem" }}
        />
      )}
      {cell.showChangeLabel1 && (
        <div className={classes.table__cell__counter}>
          <p>Было: 0</p>
        </div>
      )}
      {cell.quantitySelectors && (
        <div className={classes.table__cell__quantity}>
          {cell.quantitySelectors.map((selector, idx) => (
            <div key={idx} className={classes.table__cell__quantity__row}>
              <p>+</p>
              <QuantitySelector unit={selector.unit} />
            </div>
          ))}
        </div>
      )}
      {cell.showChangeLabel2 && (
        <div className={classes.table__cell__counter}>
          <p>Стало: 0</p>
        </div>
      )}
    </>
  );
};

const TableAccounting: React.FC<TableAccountingProps> = ({ data, config }) => {
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
      <Box
        sx={{ borderRadius: "8px", border: "0.1rem solid var(--neutral-300)" }}
      >
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {config.headers.map((header, index) => (
                <TableCell key={index}>{renderCellContent(header)}</TableCell>
              ))}
              <TableCell>
                <DeleteOutlineIcon />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.cells.map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>
                    {renderCellContent(cell)}
                  </TableCell>
                ))}
                <TableCell>
                  <CloseIcon sx={{ color: "red" }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <div className={classes.table__container__text}>
        <p>+ Добавить строчку</p>
      </div>
    </TableContainer>
  );
};

export default TableAccounting;
