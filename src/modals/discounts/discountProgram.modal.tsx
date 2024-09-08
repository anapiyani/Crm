import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Add, Check, Close, Remove } from "@mui/icons-material";

const DiscountModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [discount, setDiscount] = useState<number>(0);
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(new Date()));
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [startTime, setStartTime] = useState<Dayjs | null>(dayjs(new Date()));
  const [endTime, setEndTime] = useState<Dayjs | null>(dayjs(new Date()));
  const [frequency, setFrequency] = useState("Ежедневно");

  const categories = [
    { value: "VIP-client", label: "VIP-клиент" },
    { value: "regular-client", label: "Обычный клиент" },
  ];

  const appliesToOptions = [
    { value: "all", label: "На все товары и услуги" },
    { value: "selected", label: "На выбранные товары и услуги" },
  ];

  const handleDiscountChange = (delta: number) => {
    setDiscount((prev) => Math.max(prev + delta, 0));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontSize: 24, fontWeight: 400 }}>
        Добавление скидочной программы
      </DialogTitle>

      <DialogContent>
        <Divider sx={{ marginBottom: 2 }} />
        <Typography
          variant="subtitle2"
          sx={{ marginBottom: 1, fontSize: 16, color: "var(--primary-500)" }}
        >
          Создание акции
        </Typography>

        <Divider sx={{ marginBottom: 2 }} />

        {/* Название */}
        <Grid
          container
          alignItems="center"
          spacing={2}
          sx={{ marginBottom: 2 }}
        >
          <Grid item xs={3}>
            <Typography sx={{ fontSize: 16 }}>Название</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              sx={{ fontSize: 16 }}
              InputProps={{ sx: { fontSize: 16 } }}
              placeholder="Введите название акции"
            />
          </Grid>
        </Grid>

        {/* Дата */}
        <Grid
          container
          spacing={2}
          alignItems="center"
          sx={{ marginBottom: 2 }}
        >
          <Grid item xs={3}>
            <Typography sx={{ fontSize: 16 }}>Дата</Typography>
          </Grid>
          <Grid item xs={4}>
            <DatePicker
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                  sx: {
                    fontSize: 16,
                    "& input": { fontSize: 16 },
                    "& svg": { fontSize: 20 },
                  },
                },
                popper: {
                  sx: {
                    "& .MuiPickersDay-root": {
                      fontSize: "16px",
                    },
                    "& .MuiTypography-root": {
                      fontSize: "16px",
                    },
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={1}>
            <Typography sx={{ fontSize: 16, textAlign: "center" }}>
              -
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <DatePicker
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                  sx: {
                    fontSize: 16,
                    "& input ": { fontSize: 16 },
                    "& svg": { fontSize: 20 },
                  },
                },
                popper: {
                  sx: {
                    "& .MuiPickersDay-root": {
                      fontSize: "16px",
                    },
                    "& .MuiTypography-root": {
                      fontSize: "16px",
                    },
                  },
                },
              }}
            />
          </Grid>
        </Grid>

        {/* Ежедневно TextField */}
        <Grid
          container
          alignItems="center"
          spacing={2}
          sx={{ marginBottom: 2 }}
        >
          <Grid item xs={3}></Grid>
          <Grid item xs={9}>
            <TextField
              select
              fullWidth
              variant="outlined"
              size="small"
              sx={{ fontSize: 16 }}
              InputProps={{ sx: { fontSize: 16 } }}
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            >
              <MenuItem value="Ежедневно" sx={{ fontSize: 16 }}>
                Ежедневно
              </MenuItem>
              <MenuItem value="Раз в неделю" sx={{ fontSize: 16 }}>
                Раз в неделю
              </MenuItem>
              <MenuItem value="Раз в месяц" sx={{ fontSize: 16 }}>
                Раз в месяц
              </MenuItem>
            </TextField>
          </Grid>
        </Grid>

        {/* Время */}
        <Grid
          container
          spacing={2}
          alignItems="center"
          sx={{ marginBottom: 2 }}
        >
          <Grid item xs={3}>
            <Typography sx={{ fontSize: 16 }}>Время</Typography>
          </Grid>
          <Grid item xs={4}>
            <TimePicker
              value={startTime}
              onChange={(newValue) => setStartTime(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                  sx: {
                    fontSize: 16,
                    "& input ": { fontSize: 16 },
                    "& svg": { fontSize: 20 },
                  },
                },
                popper: {
                  sx: {
                    "& .MuiTypography-root": {
                      fontSize: "16px",
                    },
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={1}>
            <Typography sx={{ fontSize: 16, textAlign: "center" }}>
              -
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TimePicker
              value={endTime}
              onChange={(newValue) => setEndTime(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                  sx: {
                    fontSize: 16,
                    "& input ": { fontSize: 16 },
                    "& svg": { fontSize: 20 },
                  },
                },
                popper: {
                  sx: {
                    "& .MuiTypography-root": {
                      fontSize: "16px",
                    },
                  },
                },
              }}
            />
          </Grid>
        </Grid>

        {/* Категория */}
        <Grid
          container
          alignItems="center"
          spacing={2}
          sx={{ marginBottom: 2 }}
        >
          <Grid item xs={3}>
            <Typography sx={{ fontSize: 16 }}>Категория</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField
              select
              fullWidth
              variant="outlined"
              size="small"
              sx={{ fontSize: 16 }}
              InputProps={{ sx: { fontSize: 16 } }}
              defaultValue={categories[0].value}
            >
              {categories.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  sx={{ fontSize: 16 }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        {/* Действует */}
        <Grid
          container
          alignItems="center"
          spacing={2}
          sx={{ marginBottom: 2 }}
        >
          <Grid item xs={3}>
            <Typography sx={{ fontSize: 16 }}>Действует</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField
              select
              fullWidth
              variant="outlined"
              size="small"
              sx={{ fontSize: 16 }}
              InputProps={{ sx: { fontSize: 16 } }}
              defaultValue={appliesToOptions[0].value}
            >
              {appliesToOptions.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  sx={{ fontSize: 16 }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        {/* Комментарий */}
        <Grid
          container
          alignItems="center"
          spacing={2}
          sx={{ marginBottom: 2 }}
        >
          <Grid item xs={3}>
            <Typography sx={{ fontSize: 16 }}>Комментарий</Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              multiline
              rows={3} // Make the comments field 3 rows high
              sx={{ fontSize: 16 }}
              InputProps={{ sx: { fontSize: 16 } }}
            />
          </Grid>
        </Grid>

        {/* Скидка */}
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={3}>
            <Typography sx={{ fontSize: 16 }}>Скидка</Typography>
          </Grid>

          <Grid item>
            <TextField
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              type="number"
              variant="outlined"
              size="small"
              inputProps={{ min: 0 }}
              sx={{
                width: 120,
                fontSize: 16,
                display: "flex",
                justifyContent: "center",
              }}
              InputProps={{ sx: { fontSize: 16 } }}
            />
          </Grid>
          <Grid item>
            <div
              style={{
                borderRadius: "4px",
                border: "0.1rem solid #97C3F0",
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                sx={{ fontSize: 40 }}
                onClick={() => handleDiscountChange(1)}
              >
                <Add sx={{ color: "#0B6BCB" }} />
              </IconButton>
            </div>
          </Grid>
          <Grid item>
            <div
              style={{
                borderRadius: "4px",
                border: "0.1rem solid #F09898",
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                sx={{ fontSize: 40 }}
                onClick={() => handleDiscountChange(-1)}
              >
                <Remove sx={{ color: "#C41C1C" }} />
              </IconButton>
            </div>
          </Grid>
          <Grid item>
            <p style={{ fontSize: 16 }}>%</p>
          </Grid>
        </Grid>

        {/* Additional Information under Скидка */}
        <Typography
          sx={{
            fontSize: 16,
            color: "var(--primary-500)",
            marginBottom: 1,
            marginTop: 2,
          }}
        >
          Услуги / товары
        </Typography>
        <Divider />
        <Typography sx={{ fontSize: 16, marginTop: 1 }}>
          Скидка распространяется на все товары и услуги
        </Typography>
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
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DiscountModal;
