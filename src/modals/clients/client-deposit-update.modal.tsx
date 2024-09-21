import ModalWindow from "@/components/modal-window/modal-window";
import { useDepositUpdate } from "@/service/client/client.hook";
import { IClientDepositTopUp } from "@/ts/client.interface";

import NiceModal, { useModal } from "@ebay/nice-modal-react";
import {
  PaymentsOutlined,
  CreditCardOutlined,
  LocalActivityOutlined,
} from "@mui/icons-material";
import { Divider, Grid, TextField } from "@mui/material";

const DepositUpdateModal = ({
  id,
  name,
  deposit,
}: {
  id: string;
  name: string;
  deposit: number;
}) => {
  const modal = useModal();
  const mutation = useDepositUpdate();
  const user_id = localStorage.getItem("user_id");

  const formData: IClientDepositTopUp = {
    user_id: Number(id),
    comment: "",
    employee_id: Number(user_id) || 1,
    payments: [],
  };

  const onSubmitDepositTopUp = async () => {
    await mutation.mutate(formData);
  };

  const handlePaymentChange = (type: string, amount: number) => {
    const existingPaymentIndex = formData.payments.findIndex(
      (payment) => payment.money_type === type,
    );
    if (existingPaymentIndex !== -1) {
      formData.payments[existingPaymentIndex].amount = amount;
    } else {
      formData.payments.push({ money_type: type, amount });
    }
  };

  return (
    <ModalWindow
      title={"Обновление депозита"}
      open={modal.visible}
      handleClose={() => modal.hide()}
      handleSave={() => {
        onSubmitDepositTopUp();
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
            <p style={{ fontSize: 16 }}>{id}</p>
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
            <p style={{ fontSize: 16 }}>{name}</p>
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
            <p style={{ fontSize: 16 }}>{deposit} тенге</p>
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
              onChange={(e) =>
                handlePaymentChange("cash", Number(e.target.value))
              }
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
              onChange={(e) =>
                handlePaymentChange("card", Number(e.target.value))
              }
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
              onChange={(e) =>
                handlePaymentChange("check", Number(e.target.value))
              }
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
              onChange={(e) =>
                handlePaymentChange("account", Number(e.target.value))
              }
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
              defaultValue={formData.comment}
              onChange={(e) => {
                formData.comment = e.target.value;
              }}
              sx={{ fontSize: 16, "& textarea": { fontSize: 16 } }}
            />
          </Grid>
        </Grid>
      </div>
    </ModalWindow>
  );
};

export default NiceModal.create(DepositUpdateModal);
