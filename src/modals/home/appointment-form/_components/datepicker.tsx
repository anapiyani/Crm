import React, { useState } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { CalendarToday } from '@mui/icons-material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

const CustomDatePicker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [open, setOpen] = useState(false);

  const handleDateChange = (newValue: Date | null) => {
    setSelectedDate(newValue);
  };

  const handleIconClick = () => {
    setOpen(true);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        value={selectedDate}
        onChange={handleDateChange}
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          textField: {
            InputProps: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleIconClick}>
                    <CalendarToday sx={{ fontSize: "2.4rem" }} />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                fontSize: '1.4rem',
              },
            },
            sx: {
              '.MuiInputAdornment-root .MuiIconButton-root': {
                padding: 0,
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
