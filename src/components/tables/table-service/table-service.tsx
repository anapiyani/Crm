import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { IServicePriceCurrent } from "@/ts/service.interface";

interface ITableServiceProps {
  data: IServicePriceCurrent[];
  title: string;
  unit?: string;
  hasParameters?: boolean;
  tableHeaders?: { name: string; key?: string }[];
}

const TableService: React.FC<ITableServiceProps> = ({
  data,
  title,
  unit,
  hasParameters = false,
  tableHeaders = [{ name: title }, { name: "Стоимость" }],
}) => {
  const [tableData, setTableData] = useState<IServicePriceCurrent[]>(data);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const renderHeader = () => {
    return tableHeaders.map((header, index) => (
      <TableCell key={index} sx={{ fontSize: "12px" }}>
        {header.name}
      </TableCell>
    ));
  };

  const renderRows = (rowData: IServicePriceCurrent[], level = 1) => {
    return rowData.map((row, index) => (
      <React.Fragment key={`${row.title}-${index}`}>
        <TableRow
          sx={{
            backgroundColor:
              row.type === "section"
                ? "#ffd651"
                : row.type === "category"
                  ? "#BDEAF9"
                  : row.type === "subcategory"
                    ? "#FBC02D"
                    : row.type === "service"
                      ? "#F5F5F5"
                      : "transparent",
          }}
        >
          {!row.isDepartment && (
            <TableCell
              sx={{ paddingLeft: `${level * 20}px`, maxWidth: "800px" }}
              colSpan={row.isService ? 1 : tableHeaders.length}
            >
              {row.title}
            </TableCell>
          )}

          {row.isService && (
            <>
              <TableCell>{row.cost}</TableCell>
              {hasParameters && (
                <>
                  <TableCell>{row.costFrom ? row.costFrom : "-"}</TableCell>
                  <TableCell>{row.costTo ? row.costTo : "-"}</TableCell>
                  <TableCell>{row.shortHair ? row.shortHair : "-"}</TableCell>
                  <TableCell>{row.mediumHair ? row.mediumHair : "-"}</TableCell>
                  <TableCell>{row.longHair ? row.longHair : "-"}</TableCell>
                  <TableCell>
                    {row.veryLongHair ? row.veryLongHair : "-"}
                  </TableCell>
                </>
              )}
            </>
          )}
        </TableRow>
        {row.children &&
          row.children.length > 0 &&
          renderRows(row.children, level + 1)}
      </React.Fragment>
    ));
  };

  return (
    <TableContainer
      component={Card}
      sx={{
        borderRadius: "8px",
        boxShadow: "none",
        border: "1px solid var(--divider)",
        width: hasParameters ? "100%" : "fit-content",
        minWidth: hasParameters ? "100%" : "600px",
      }}
    >
      <Table size="small">
        <TableHead>
          <TableRow>{renderHeader()}</TableRow>
        </TableHead>
        <TableBody
          sx={{
            "& .MuiTableCell-root": {
              fontSize: "12px",
            },
          }}
        >
          {renderRows(tableData)}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableService;
