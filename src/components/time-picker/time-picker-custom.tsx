import React, { useState } from "react";
import {
  TextField,
  Button,
  Popover,
  Box,
  Paper,
  ClickAwayListener,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { ArrowDropUp, ArrowDropDown, AccessTime } from "@mui/icons-material";
import dayjs from "dayjs";

interface CustomTimePickerProps {
  value?: string;
  onChange: (value: string) => void;
}

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
  value = "08:00",
  onChange,
}) => {
  const [selectedHour, setSelectedHour] = useState<string>(
    dayjs(value, "HH:mm").format("HH"),
  );
  const [selectedMinute, setSelectedMinute] = useState<string>(
    dayjs(value, "HH:mm").format("mm"),
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleHourChange = (newHour: string) => {
    const formattedHour = newHour.padStart(2, "0");
    setSelectedHour(formattedHour);
    onChange(`${formattedHour}:${selectedMinute}`);
  };

  const handleMinuteChange = (newMinute: string) => {
    const formattedMinute = newMinute.padStart(2, "0");
    setSelectedMinute(formattedMinute);
    onChange(`${selectedHour}:${formattedMinute}`);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        <TextField
          aria-describedby={id}
          label="Выберите время"
          value={`${selectedHour}:${selectedMinute}`}
          onClick={handleClick}
          sx={{
            "& .MuiInputBase-root": {
              fontSize: "1.6rem",
            },

            "& .MuiFormLabel-root": {
              fontSize: "1.6rem",
            },
          }}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClick}>
                  <AccessTime />
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="outlined"
          fullWidth
        />
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Paper sx={{ p: 2 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Button
                onClick={() =>
                  handleHourChange(String((Number(selectedHour) + 23) % 24))
                }
              >
                <ArrowDropUp />
              </Button>
              <Button
                onClick={() =>
                  handleMinuteChange(String((Number(selectedMinute) + 59) % 60))
                }
              >
                <ArrowDropUp />
              </Button>
            </Box>
            <Box display="flex" justifyContent="space-between" p={1} gap={1}>
              <TextField
                value={selectedHour}
                onChange={(e) => handleHourChange(e.target.value)}
                inputProps={{ maxLength: 2 }}
                sx={{
                  width: 60,
                  "& .MuiInputBase-root": {
                    fontSize: "1.6rem",
                  },
                }}
              />
              <TextField
                value={selectedMinute}
                onChange={(e) => handleMinuteChange(e.target.value)}
                inputProps={{ maxLength: 2 }}
                sx={{
                  width: 60,
                  "& .MuiInputBase-root": {
                    fontSize: "1.6rem",
                  },
                }}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Button
                onClick={() =>
                  handleHourChange(String((Number(selectedHour) + 1) % 24))
                }
              >
                <ArrowDropDown />
              </Button>
              <Button
                onClick={() =>
                  handleMinuteChange(String((Number(selectedMinute) + 1) % 60))
                }
              >
                <ArrowDropDown />
              </Button>
            </Box>
          </Paper>
        </Popover>
      </div>
    </ClickAwayListener>
  );
};

export default CustomTimePicker;
