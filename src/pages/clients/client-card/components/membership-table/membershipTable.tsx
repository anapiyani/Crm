import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import styles from "./styles.module.scss";

const MembershipTable: React.FC = () => {
  return (
    <TableContainer component={Paper} className={styles.tableContainer} sx={{borderRadius:"16px", boxShadow:"none"}}>
      <div
        style={{
          borderRadius: "8px",
          border: "0.1rem solid var(--neutral-300)",
        }}
      >
        <Table className={styles.table} sx={{borderRadius:"8px"}}>
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell align="left" className={styles.headerCell}>
                №
              </TableCell>
              <TableCell align="left" className={styles.headerCell}>
                Наименование
              </TableCell>
              <TableCell align="left" className={styles.headerCell}>
                Сумма
              </TableCell>
              <TableCell align="left" className={styles.headerCell}>
                Номер
              </TableCell>
              <TableCell align="left" className={styles.headerCell}>
                Продал
              </TableCell>
              <TableCell align="left" className={styles.headerCell}>
                Дата продажи
              </TableCell>
              <TableCell align="left" className={styles.headerCell}>
                Посещение
              </TableCell>
              <TableCell align="left" className={styles.headerCell}>
                Активирован
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody className={styles.tableBody}>
            <TableRow className={styles.bodyRow}>
              <TableCell className={styles.cell}>1</TableCell>
              <TableCell className={styles.cell}>
                <span className={styles.link}>Наименование</span>
              </TableCell>
              <TableCell className={styles.cell}>
                <span className={styles.amount}>50 000 тенге</span>
              </TableCell>
              <TableCell className={styles.cell}>06.03/04.23</TableCell>
              <TableCell className={styles.cell}>
                <span className={styles.link}>Имя Фамилия (ID 109)</span>
              </TableCell>
              <TableCell className={styles.cell}>20.08.2024</TableCell>
              <TableCell className={styles.cell}>
                <span className={styles.link}>Посещение №123</span>
              </TableCell>
              <TableCell className={styles.cell}>Да</TableCell>
            </TableRow>

            <TableRow className={styles.bodyRow}>
              <TableCell className={styles.cell}>2</TableCell>
              <TableCell className={styles.cell}>
                <span className={styles.link}>Наименование</span>
              </TableCell>
              <TableCell className={styles.cell}>
                <span className={styles.amount}>50 000 тенге</span>
              </TableCell>
              <TableCell className={styles.cell}>06.03/03.23</TableCell>
              <TableCell className={styles.cell}>
                <span className={styles.link}>Имя Фамилия (ID 109)</span>
              </TableCell>
              <TableCell className={styles.cell}>20.08.2024</TableCell>
              <TableCell className={styles.cell}>
                <span className={styles.link}>Посещение №124</span>
              </TableCell>
              <TableCell className={styles.cell}>Да</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </TableContainer>
  );
};

export default MembershipTable;
