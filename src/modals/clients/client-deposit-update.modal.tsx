import ModalWindow from "@/components/modal-window/modal-window";

import NiceModal, { useModal } from "@ebay/nice-modal-react";
import {
  PaymentsOutlined,
  CreditCardOutlined,
  LocalActivityOutlined,
} from "@mui/icons-material";
import { Divider, Grid, TextField } from "@mui/material";

const DepositUpdateModal = () => {
  const modal = useModal();

  return (
    <ModalWindow
      title={"Обновление депозита"}
      open={modal.visible}
      handleClose={() => modal.hide()}
      handleSave={() => {
        modal.hide();
      }}
    >
      <div style={{ width: "60rem" }}>
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
          <p style={{ fontSize: 16, marginTop: "1rem", marginBottom: "2rem" }}>
            Текущий депозит будет заменен на заданное значение, не затрагивая
            кассу. Если вы хотите пополнить депозит обычным способом, закройте
            это окно и нажмите кнопку "Пополнить депозит".
          </p>
        </>

        <p
          style={{
            marginTop: "0.8rem",
            marginBottom: "1rem",
            fontSize: 16,
            color: "var(--primary-500)",
          }}
        >
          Задать новое значение
        </p>

        <Divider sx={{ marginBottom: 2 }} />

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
      </div>
    </ModalWindow>
  );
};

export default NiceModal.create(DepositUpdateModal);
