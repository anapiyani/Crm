import React from "react";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface ITableServiceProps {
  headers: string[];
  data: any;
}

const TableService: React.FC<ITableServiceProps> = ({ headers, data }) => {
  return (
    <TableContainer
      component={Card}
      sx={{
        borderRadius: "16px",
        boxShadow: "none",
        border: "1px solid var(--divider)",
      }}
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index} sx={{ fontSize: "12px" }}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            "& .MuiTableCell-root": {
              fontSize: "12px",
            },
          }}
        >
          {data.map((category) => (
            <React.Fragment key={category.id}>
              <TableRow
                key={category.id}
                sx={{ backgroundColor: category.color }}
              >
                <TableCell colSpan={9}>{category.category}</TableCell>
              </TableRow>
              {category.items.map((item, index) => (
                <TableRow key={`${item.name}-${index}`}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.cost}</TableCell>
                  <TableCell>{item.costFrom}</TableCell>
                  <TableCell>{item.costTo}</TableCell>
                  <TableCell>{item.shortHair}</TableCell>
                  <TableCell>{item.mediumHair}</TableCell>
                  <TableCell>{item.longHair}</TableCell>
                  <TableCell>{item.roots}</TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableService;
