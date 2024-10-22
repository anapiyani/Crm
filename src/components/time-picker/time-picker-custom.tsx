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
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";

interface CustomTimePickerProps {
  value?: string;
  onChange: (value: string) => void;
  size?: "small" | "medium";
  withLabel?: boolean;
}

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
  value = "09:00",
  onChange,
  size = "medium",
  withLabel = true,
}) => {
  dayjs.extend(utc);
  dayjs.extend(customParseFormat);

  const [selectedHour, setSelectedHour] = useState<string>(
    dayjs(value, "HH:mm", true).format("hh")
  );
  const [selectedMinute, setSelectedMinute] = useState<string>(
    dayjs(value, "HH:mm", true).format("mm")
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleHourInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      if (Number(value)) {
        if (Number(value) < 0) {
          handleHourChange("00");
          return "00";
        }
        if (Number(value) > 23) {
          handleHourChange("23");
          return "23";
        } else {
          handleHourChange(value);
          return value;
        }
      }
    } else {
      return "";
    }
  };

  const handleMinuteInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      if (Number(value)) {
        if (Number(value) < 0) {
          handleMinuteChange("00");
          return "00";
        }
        if (Number(value) > 59) {
          handleMinuteChange("59");
          return "59";
        } else {
          handleMinuteChange(value);
          return value;
        }
      }
    }
    return "";
  };

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
          label={withLabel ? "Выберите время" : ""}
          value={`${selectedHour}:${selectedMinute}`}
          onClick={handleClick}
          size={size}
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
                defaultValue={selectedHour}
                onChange={(e) => {
                  e.target.value =
                    handleHourInput(e) !== undefined ? handleHourInput(e)! : "";
                }}
                inputProps={{
                  maxLength: 2,
                }}
                sx={{
                  width: 60,
                  "& .MuiInputBase-root": {
                    fontSize: "1.6rem",
                  },
                }}
              />
              <TextField
                defaultValue={selectedMinute}
                onChange={(e) => {
                  e.target.value =
                    handleMinuteInput(e) !== undefined
                      ? handleMinuteInput(e)!
                      : "";
                }}
                inputProps={{ maxLength: 2, inputMode: "numeric" }}
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
