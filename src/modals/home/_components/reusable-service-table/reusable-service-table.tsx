import React, { useMemo } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
} from "@mui/material";
import { DeleteOutline, Close } from "@mui/icons-material";
import classes from "./styles.module.scss";

export interface ITableRowData {
  id: number;
  service: string;
  service_id: number;
  price?: string;
  unitPrice: number;
  quantity: number;
  parameter: string;
  parameter_id: number;
}

interface IReusableTableProps {
  data: ITableRowData[];
  onQuantityChange: (id: number, quantity: number) => void;
  onDelete: (id: number) => void;
}

const ReusableServiceTable: React.FC<IReusableTableProps> = ({
  data,
  onQuantityChange,
  onDelete,
}) => {
  return (
    <div className={classes["table-container"]}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Услуга</TableCell>
            <TableCell>Параметр</TableCell>
            <TableCell>Кол-во</TableCell>
            <TableCell>Цена</TableCell>
            <TableCell>
              <DeleteOutline />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.service}</TableCell>
              <TableCell>{item.parameter}</TableCell>
              <TableCell>
                <TextField
                  value={item.quantity}
                  onChange={(e) => onQuantityChange(item.id, +e.target.value)}
                  sx={{
                    width: "5rem",
                    "& .MuiOutlinedInput-root": {
                      fontSize: "1.4rem",
                      padding: 0,
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "1rem 0.5rem",
                    },
                  }}
                />
              </TableCell>
              <TableCell>
                {(item.unitPrice * item.quantity).toFixed(2)}
              </TableCell>
              <TableCell>
                <div onClick={() => onDelete(item.id)}>
                  <Close />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReusableServiceTable;
