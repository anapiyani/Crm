import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Divider,
  Grid,
} from "@mui/material";
import {
  Check,
  Close,
  CreditCardOutlined,
  LocalActivityOutlined,
  PaymentsOutlined,
} from "@mui/icons-material";

interface DepositModalProps {
  open: boolean;
  onClose: () => void;
  isUpdate: boolean;
}

const DepositModal: React.FC<DepositModalProps> = ({
  open,
  onClose,
  isUpdate,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontSize: 24, fontWeight: 400 }}>
        {isUpdate ? "Обновление депозита" : "Пополнение депозита"}
      </DialogTitle>

      <DialogContent>
        <Divider sx={{ marginBottom: 2 }} />

        <p
          style={{
            marginBottom: "1rem",
            fontSize: 16,
            color: "var(--primary-500)",
          }}
        >
          Общая информация
        </p>

        <Divider sx={{ marginBottom: 2 }} />

        {/* Client Info */}
        <Grid
          container
          spacing={2}
          sx={{ marginBottom: 2 }}
          alignItems="center"
        >
          <Grid item xs={5}>
            <p
              style={{
                fontSize: 16,
                color: "var(--neutral-500)",
                textAlign: "right",
              }}
            >
              ID клиента:
            </p>
          </Grid>
          <Grid item xs={7}>
            <p style={{ fontSize: 16 }}>8</p>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          sx={{ marginBottom: 2 }}
          alignItems="center"
        >
          <Grid item xs={5}>
            <p
              style={{
                fontSize: 16,
                color: "var(--neutral-500)",
                textAlign: "right",
              }}
            >
              Имя клиента:
            </p>
          </Grid>
          <Grid item xs={7}>
            <p style={{ fontSize: 16 }}>Имя Фамилия</p>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          sx={{ marginBottom: 2 }}
          alignItems="center"
        >
          <Grid item xs={5}>
            <p
              style={{
                fontSize: 16,
                color: "var(--neutral-500)",
                textAlign: "right",
              }}
            >
              Текущий депозит:
            </p>
          </Grid>
          <Grid item xs={7}>
            <p style={{ fontSize: 16 }}>0 тенге</p>
          </Grid>
        </Grid>

        {isUpdate && (
          <>
            <p
              style={{
                fontSize: 16,
                marginTop: "1rem",
                color: "var(--primary-500)",
              }}
            >
              Информация
            </p>
            <p
              style={{ fontSize: 16, marginTop: "1rem", marginBottom: "2rem" }}
            >
              Текущий депозит будет заменен на заданное значение, не затрагивая
              кассу. Если вы хотите пополнить депозит обычным способом, закройте
              это окно и нажмите кнопку "Пополнить депозит".
            </p>
          </>
        )}

        <p
          style={{
            marginTop: "0.8rem",
            marginBottom: "1rem",
            fontSize: 16,
            color: "var(--primary-500)",
          }}
        >
          {isUpdate ? "Задать новое значение" : "Пополнить депозит"}
        </p>

        <Divider sx={{ marginBottom: 2 }} />

        {/* Deposit Amount Inputs */}
        <Grid
          container
          spacing={2}
          sx={{ marginBottom: 2 }}
          alignItems="center"
        >
          <Grid item xs={5}>
            <p
              style={{
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                color: "var(--neutral-500)",
                justifyContent: "flex-end",
              }}
            >
              Сумма (наличные){" "}
              <PaymentsOutlined
                sx={{
                  marginLeft: "0.4rem",
                  color: "var(--neutral-500)",
                  fontSize: "2rem",
                }}
              />
            </p>
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              sx={{ fontSize: 16, width: "10rem", "& input": { fontSize: 16 } }}
            />
          </Grid>
          <Grid item xs={2} sx={{ marginLeft: "1.6rem" }}>
            <p style={{ fontSize: 16 }}>тенге</p>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          sx={{ marginBottom: 2 }}
          alignItems="center"
        >
          <Grid item xs={5}>
            <p
              style={{
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                color: "var(--neutral-500)",
                justifyContent: "flex-end",
              }}
            >
              Сумма по карте{" "}
              <CreditCardOutlined
                sx={{
                  marginLeft: "0.4rem",
                  color: "var(--neutral-500)",
                  fontSize: "2rem",
                }}
              />
            </p>
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              sx={{ fontSize: 16, width: "10rem", "& input": { fontSize: 16 } }}
            />
          </Grid>
          <Grid item xs={2} sx={{ marginLeft: "1.6rem" }}>
            <p style={{ fontSize: 16 }}>тенге</p>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          sx={{ marginBottom: 2 }}
          alignItems="center"
        >
          <Grid item xs={5}>
            <p
              style={{
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                color: "var(--neutral-500)",
                justifyContent: "flex-end",
              }}
            >
              Сумма чеками{" "}
              <LocalActivityOutlined
                sx={{
                  marginLeft: "0.4rem",
                  color: "var(--neutral-500)",
                  fontSize: "2rem",
                }}
              />
            </p>
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              sx={{ fontSize: 16, width: "10rem", "& input": { fontSize: 16 } }}
            />
          </Grid>
          <Grid item xs={2} sx={{ marginLeft: "1.6rem" }}>
            <p style={{ fontSize: 16 }}>тенге</p>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          sx={{ marginBottom: 2 }}
          alignItems="center"
        >
          <Grid item xs={5}>
            <p
              style={{
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                color: "var(--neutral-500)",
                justifyContent: "flex-end",
              }}
            >
              Сумма (расчётный счёт)
            </p>
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              sx={{ fontSize: 16, width: "10rem", "& input": { fontSize: 16 } }}
            />
          </Grid>
          <Grid item xs={2} sx={{ marginLeft: "1.6rem" }}>
            <p style={{ fontSize: 16 }}>тенге</p>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
          <Grid item xs={5}>
            <p
              style={{
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                color: "var(--neutral-500)",
                justifyContent: "flex-end",
              }}
            >
              Комментарий
            </p>
          </Grid>
          <Grid item xs={7}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              multiline
              rows={3}
              sx={{ fontSize: 16, "& textarea": { fontSize: 16 } }}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", p: "2rem 2.4rem" }}>
        <Button
          onClick={onClose}
          color="primary"
          variant="outlined"
          sx={{ fontSize: 16, boxShadow: "none", textTransform: "none" }}
          startIcon={<Close />}
        >
          Отменить
        </Button>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          sx={{ fontSize: 16, boxShadow: "none", textTransform: "none" }}
          startIcon={<Check />}
        >
          {isUpdate ? "Обновить" : "Пополнить"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DepositModal;
