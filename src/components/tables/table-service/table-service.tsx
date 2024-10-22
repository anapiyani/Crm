import React, { useEffect, useState, CSSProperties } from "react";
import {
  Card,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { IServicePriceCurrent } from "@/ts/service.interface";

type ITableServiceProps = {
  data: IServicePriceCurrent[];
  title: string;
  unit?: string;
  hasParameters?: boolean;
  tableHeaders?: { name: string; key?: string }[];
};

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

  const getRowBackground = (rowType: string): CSSProperties => ({
    backgroundColor:
      rowType === "section"
        ? "#ffd651"
        : rowType === "category"
          ? "#BDEAF9"
          : rowType === "subcategory"
            ? "#FBC02D"
            : rowType === "service"
              ? "#F5F5F5"
              : "transparent",
  });

  const getCellPadding = (level: number): CSSProperties => ({
    paddingLeft: `${level * 20}px`,
    maxWidth: "800px",
  });

  const styles: { [key: string]: CSSProperties } = {
    headerCell: {
      fontSize: "12px",
    },
    tableContainer: {
      borderRadius: "8px",
      boxShadow: "none",
      border: "1px solid var(--divider)",
      width: hasParameters ? "100%" : "fit-content",
      minWidth: hasParameters ? "100%" : "600px",
    },
  };

  const StyledTableBody = styled(TableBody)({
    "& .MuiTableCell-root": {
      fontSize: "12px",
    },
  });

  const renderHeader = () => {
    return tableHeaders.map((header, index) => (
      <TableCell key={index} sx={styles.headerCell}>
        {header.name}
      </TableCell>
    ));
  };

  const renderRows = (rowData: IServicePriceCurrent[], level = 1) => {
    return rowData.map((row, index) => (
      <React.Fragment key={`${row.title}-${index}`}>
        <TableRow sx={row.type ? getRowBackground(row.type) : {}}>
          {!row.isDepartment && (
            <TableCell
              sx={getCellPadding(level)}
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
    <TableContainer component={Card} sx={styles.tableContainer}>
      <Table size="small">
        <TableHead>
          <TableRow>{renderHeader()}</TableRow>
        </TableHead>
        <StyledTableBody>{renderRows(tableData)}</StyledTableBody>
      </Table>
    </TableContainer>
  );
};

export default TableService;
