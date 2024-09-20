import ModalWindow from "@/components/modal-window/modal-window";

import NiceModal, { useModal } from "@ebay/nice-modal-react";
import {
  PaymentsOutlined,
  CreditCardOutlined,
  LocalActivityOutlined,
} from "@mui/icons-material";
import { Checkbox, Divider, Grid, TextField } from "@mui/material";

const CommentAddModal = () => {
  const modal = useModal();

  return (
    <ModalWindow
      title={"Добавление комментария к клиенту"}
      open={modal.visible}
      handleClose={() => modal.hide()}
      handleSave={() => {
        modal.hide();
      }}
    >
      <div style={{ width: "60rem" }}>
        <div>
          <p
            style={{
              marginBottom: "1rem",
              fontSize: 16,
              color: "var(--primary-500)",
            }}
          >
            Комментарий
          </p>
          <Divider />
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            multiline
            rows={5}
            sx={{ fontSize: 16, "& textarea": { fontSize: 16 }, mt: "1rem" }}
          />
          <div style={{ display: "flex",flexDirection:"row", alignItems: "center", marginTop:"1rem" }}>
            <Checkbox
              sx={{
                "& svg": { width: 20, height: 20 },
                padding: 0,
              }}
            />
            <p style={{ color: "var(--primary)", fontSize: "1.4rem" }}>
              Основная характеристика
            </p>
          </div>
        </div>
      </div>
    </ModalWindow>
  );
};

export default NiceModal.create(CommentAddModal);
