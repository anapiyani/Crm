import React, { useState } from "react";
import {
  Add,
  Edit,
  Done,
  RemoveRedEyeOutlined,
  Close,
  Save,
} from "@mui/icons-material";
import {
  Box,
  Paper,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  TableHead,
  tableCellClasses,
  styled,
  IconButton,
  Icon,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: "1.4rem",
    fontWeight: "700",
    borderTop: "none",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "& td, & th": {
    borderTop: `0.1rem ${theme.palette.divider}`,
  },
}));

type EditType =
  | "text"
  | "select"
  | "number"
  | "boolean"
  | "nonEditable"
  | "city"
  | "date";

type DataRow = {
  property?: string;
  value?: string | number | boolean;
  link?: string;
  linkLabel?: string;
  editType?: EditType | "nonEditable";
  autocomplete?: string[];
  scnd_value?: string;
  primary?: boolean;
};

interface ContactsTableProps {
  data: DataRow[];
  title: string;
  showEyeIcon?: boolean;
  hasTableHead?: boolean;
  onSave?: (Data: DataRow[]) => void;
}

const TableHorizontal: React.FC<ContactsTableProps> = ({
  data,
  title,
  showEyeIcon = false,
  hasTableHead = true,
  onSave,
}) => {
  const isSingleData = data.length === 1;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [changedData, setChangedData] = useState<DataRow[]>(data);

  const onSaveTrigger = () => {
    setIsEdit(false);

    console.log("onSaveTrigger", changedData);
    if (changedData) {
      onSave?.(changedData);
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        border: "0.1rem solid #CDD7E1",
        borderRadius: "8px",
        boxShadow: "0rem 0.1rem 0.2rem 0rem rgba(21, 21, 21, 0.08)",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "0.1rem solid #CDD7E1",
        }}
      >
        <Box
          sx={{
            fontSize: "2.4rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            padding: "1.6rem",
            pr: "2.4rem",
          }}
        >
          {title}
        </Box>
        <Box sx={{ p: "0.8rem" }}>
          {showEyeIcon ? (
            <RemoveRedEyeOutlined
              sx={{
                verticalAlign: "middle",
                fontSize: "2.4rem",
                color: "#2196F3",
              }}
            />
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "1rem",
                width: "100%",
              }}
            >
              <IconButton>
                <Add
                  sx={{
                    verticalAlign: "middle",
                    fontSize: "2.4rem",
                    color: "#2196F3",
                  }}
                />
              </IconButton>
              <IconButton
                onClick={() => {
                  setIsEdit(!isEdit);
                }}
                sx={{
                  padding: "0.8rem",
                  fontSize: "2.4rem",
                }}
              >
                {!isEdit ? (
                  <Edit
                    sx={{
                      fontSize: "2.4rem",
                      color: "#2196F3",
                    }}
                  />
                ) : (
                  <Close
                    sx={{
                      fontSize: "2.4rem",
                      color: "#2196F3",
                    }}
                  />
                )}
              </IconButton>

              {isEdit && (
                <IconButton onClick={onSaveTrigger}>
                  <Save
                    sx={{
                      fontSize: "2.4rem",
                      color: "#2196F3",
                    }}
                  />
                </IconButton>
              )}
            </div>
          )}
        </Box>
      </Box>
      <Table aria-label="customized table" sx={{ borderColor: "#CDD7E1" }}>
        {hasTableHead && (
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ textAlign: "right" }}>Тип</StyledTableCell>
              <StyledTableCell>Контакт</StyledTableCell>
              <StyledTableCell>Основной</StyledTableCell>
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {data.map((row, index) => (
            <StyledTableRow key={row.value as number}>
              {hasTableHead && (
                <StyledTableCell sx={{ textAlign: "right" }}>
                  {row.property}
                </StyledTableCell>
              )}
              <StyledTableCell
                sx={{
                  textAlign: isSingleData
                    ? "left"
                    : index % 2 === 0
                    ? "right"
                    : "left",
                }}
              >
                {isEdit ? (
                  <div
                    style={{
                      display: "flex",

                      alignItems: "center",
                      width: "60%",
                    }}
                  >
                    <input
                      type="text"
                      defaultValue={row.value as string}
                      style={{
                        border: "none",
                        borderBottom: "0.1rem solid #CDD7E1",
                        padding: "0.8rem",
                      }}
                      onChange={(e) => {
                        setChangedData((prev) => {
                          return prev.map((item) => {
                            if (item.property === row.property) {
                              return {
                                ...item,
                                value: e.target.value,
                              };
                            }
                            return item;
                          });
                        });
                      }}
                    />
                  </div>
                ) : (
                  <>{row.value}</>
                )}
              </StyledTableCell>
              {hasTableHead && (
                <StyledTableCell sx={{ textAlign: "right" }}>
                  {row.primary ? (
                    <Done sx={{ fontSize: "2.4rem", color: "#2E7D32" }} />
                  ) : (
                    ""
                  )}
                </StyledTableCell>
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableHorizontal;
