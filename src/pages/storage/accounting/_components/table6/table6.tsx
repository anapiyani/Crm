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
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const Table6 = () => {
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
                    <TableCell>№</TableCell>
                    <TableCell>Название</TableCell>
                    <TableCell>
                        <div>
                        <CustomTextField label={"Зал"} size="small" style={{width: "20rem"}}/>
                        </div>
                    </TableCell>
                    <TableCell><ArrowForwardIcon/></TableCell>
                    <TableCell>
                        <div>
                        <CustomTextField label={"Витрина"} size="small" style={{width: "20rem"}}/>
                        </div>
                    </TableCell>
                    <TableCell>Комментарий</TableCell>
                    <TableCell>
                        <DeleteOutlineIcon/>
                    </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>
                        <div>
                        <CustomTextField label={"Выберите материал или считайте штрих-код"} size="small" style={{width: "60rem"}}/>
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className={classes.table__cell}>
                        <CustomTextField label={"По умолчанию"} size="small"/>
                        <div className={classes.table__cell__counter}>
                            <p>Было: 0</p>
                        </div>
                        <div className ={classes.table__cell__quantity}>
                            <div className={classes.table__cell__quantity__row}>
                            <p>+</p> 
                            <QuantitySelector unit="шт." />
                            </div>
                            <div className={classes.table__cell__quantity__row}>
                            <p>+</p> 
                            <QuantitySelector unit="мл." />
                            </div>
                        </div>
                        <div className={classes.table__cell__counter}>
                            <p>Стало: 0</p>
                        </div>
                        </div>
                    </TableCell>
                    <TableCell><ArrowForwardIcon/></TableCell>
                    <TableCell>
                        <div className={classes.table__cell__counter}>
                        <p>Было: 0</p>
                        </div>
                        <div className={classes.table__cell__counter}>
                        <p>Стало: 0</p>
                        </div>
                    </TableCell>
                    <TableCell>
                        <CustomTextField label={""} size="small"/>
                    </TableCell>
                    <TableCell>
                        <CloseIcon sx={{color: "red"}}/>
                    </TableCell>
                    </TableRow>
                </TableBody>
                </Table>
            </Box>
            <div className={classes.table__container__text}>
                <p>+ Добавить строчку</p>
            </div>
            </TableContainer>
    );
}

export default Table6