

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Pagination,
} from "@mui/material";
import classes from "./styles.module.scss";
import CustomTextField from "@/components/textField/textField.component";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import { ISearchFormData } from "@/ts/employee.interface";

const Table5 = () => {
    const [formData, setFormData] = useState({
        category: "",
        department: "",
        group: "",
        keyword: "",
        role: "",
        section: "",
        service_type: "",
        subcategory: "",
    });

    const handleFormDataChange = (field: keyof ISearchFormData, value: any) => {
        setFormData((prev) => ({
          ...prev,
          [field]: value,
        }));
    };

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number,
      ) => {
        handleFormDataChange("page", value);
      };

    return (
        <TableContainer component={Paper}
            sx={{
            boxShadow:
                "0 0 12px rgba(21, 21, 21, 0.08), 0 2px 8px rgba(21, 21, 21, 0.08)",
            borderRadius: "8px",
            border: "0.1rem solid var(--neutral-300)",
            padding: "0.8rem",
            }}>
            <Box sx={{ borderRadius: "8px", border: "0.1rem solid var(--neutral-300)" }}>
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Название</TableCell>
                    <TableCell>Кол-во позиций</TableCell>
                    <TableCell>Дата</TableCell>
                    <TableCell>Сотрудник</TableCell>
                    <TableCell>Комментарий</TableCell>
                    <TableCell>Склад</TableCell>
                    <TableCell>Действия</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Закупка №58163</TableCell>
                    <TableCell>1 позиция</TableCell>
                    <TableCell>27 июля, 16:40</TableCell>
                    <TableCell>Имя Фамилия</TableCell>
                    <TableCell>Комментарий</TableCell>
                    <TableCell>Витрина</TableCell>
                    <TableCell>
                    <div className={classes.tableCell}>
                        <a><RemoveRedEyeIcon/> Посмотреть</a>
                        <a><ContentPasteIcon/> Накладная</a>
                        <a><LocalOfferIcon/> Ценники</a>
                        <a><CreateIcon/> Изменить</a>
                        <a><AddIcon/> Отменить</a>
                    </div>
                    </TableCell>
                </TableRow>
                </TableBody>
            </Table>
            </Box>
            <div className={classes.table__lower}>
                <CustomTextField label={"Поиск"} style={{width: "20rem"}} size="small"/>
                <p className={classes.table__lower__label}>
                Показано 2 из 2 записей
                </p>
                <div>
                <div className={classes["tableSettings"]}>
                    Показывать
                    <select
                    name="pageSize"
                    id="pageSize"
                    value={10}
                    onChange={(event) =>
                        setFormData((prev) => ({
                        ...prev,
                        page_size: parseInt(event.target.value),
                        }))
                    }
                    >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    </select>
                    записей
                </div>
                </div>
                <Pagination
                count={
                    5
                    // employeeData
                    //   ? Math.ceil(employeeData.count / formData.page_size)
                    //   : 1
                }
                // page={formData.page}
                page={1}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
                boundaryCount={1}
                color="primary"
                />
            </div>
        </TableContainer>
    );
}

export default Table5