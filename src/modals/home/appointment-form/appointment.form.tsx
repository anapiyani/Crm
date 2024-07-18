import React from "react";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import {
  Add,
  CalendarToday,
  AccessTime,
  HelpOutline,
} from "@mui/icons-material";
import classes from "./styles.module.scss";
import CustomDatePicker from "./components/datepicker";

const AppointmentForm: React.FC = () => {
  return (
    <div className={classes["form-container"]}>
      <Typography variant="h6" gutterBottom>
        Основные параметры
      </Typography>
      <Grid container columnSpacing={1.5} alignItems="center">
        <Grid item xs={12} sm={12}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} sm={2}>
              <Typography variant="body1">Клиент</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <FormControl fullWidth>
                <Select defaultValue="">
                  <MenuItem value="">
                    <em>Фамилия Имя</em>
                  </MenuItem>
                  {/* Add more options as needed */}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sm={2}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <IconButton size="small">
                <HelpOutline sx={{ color: "#0B6BCB" }} />
              </IconButton>
              <IconButton size="small">
                <Add sx={{ color: "#0B6BCB" }} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item >
          <Grid container sx={{ alignItems: "center" }} columnSpacing={1}>
            <Grid item>
              <Typography>Дата и время</Typography>
            </Grid>
            <Grid item>
              <CustomDatePicker />
            </Grid>
          </Grid>
        </Grid>
        <Grid item >
          <Grid container columnSpacing={1} alignItems={"center"}>
            <Grid item >
              <TextField
                fullWidth
                label="Начало"
                type="time"
                defaultValue="10:00"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
            </Grid>
            <Grid item>
              <Typography fontSize={16} fontWeight={400}>
                -
              </Typography>
            </Grid>

            <Grid item>
              <TextField
                fullWidth
                label="Конец"
                type="time"
                defaultValue="21:00"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Add />
        </Grid>
      </Grid>

      <Typography
        variant="h6"
        gutterBottom
        className={classes["form-section-title"]}
      >
        Услуги
        <IconButton>
          <Add />
        </IconButton>
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Выберите услугу</InputLabel>
            <Select defaultValue="">
              <MenuItem value="">
                <em>Услуга</em>
              </MenuItem>
              {/* Add more options as needed */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Параметр" />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <InputLabel>Выберите, кто продал услугу</InputLabel>
            <Select defaultValue="">
              <MenuItem value="">
                <em>Сотрудник</em>
              </MenuItem>
              {/* Add more options as needed */}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

export default AppointmentForm;
