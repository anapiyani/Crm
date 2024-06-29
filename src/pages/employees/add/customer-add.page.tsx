import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import InputCard from "./components/input-card";

import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import InputMask from "react-input-mask";
import flagIcon from "@/assets/icons/Flags.svg";

const EmployeeAdd = () => {
  return (
    <div>
      <BreadcrumbsCustom />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          padding: "8rem",
        }}
      >
        <InputCard
          title={"Главное"}
          children={
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <TextField
                required
                variant="outlined"
                label="Имя"
                sx={{
                  fontSize: "1.6rem",
                  "& .MuiFormLabel-root": {
                    fontSize: "1.6rem",
                  },
                  "& .MuiOutlinedInput-root": {
                    fontSize: "1.6rem",
                  },
                }}
              />
              <TextField
                required
                variant="outlined"
                label="Фамилия"
                sx={{
                  fontSize: "1.6rem",
                  "& .MuiFormLabel-root": {
                    fontSize: "1.6rem",
                  },
                  "& .MuiOutlinedInput-root": {
                    fontSize: "1.6rem",
                  },
                }}
              />
              <TextField
                variant="outlined"
                label="Отчество"
                sx={{
                  fontSize: "1.6rem",
                  "& .MuiFormLabel-root": {
                    fontSize: "1.6rem",
                  },
                  "& .MuiOutlinedInput-root": {
                    fontSize: "1.6rem",
                  },
                }}
              />
              <TextField
                required
                variant="outlined"
                label="Должность"
                sx={{
                  fontSize: "1.6rem",
                  "& .MuiFormLabel-root": {
                    fontSize: "1.6rem",
                  },
                  "& .MuiOutlinedInput-root": {
                    fontSize: "1.6rem",
                  },
                }}
              />
            </div>
          }
        ></InputCard>
        <InputCard
          title={"Адрес проживания"}
          children={
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "3rem",
              }}
            >
              <TextField
                required
                variant="outlined"
                label="Город"
                sx={{
                  fontSize: "1.6rem",
                  "& .MuiFormLabel-root": {
                    fontSize: "1.6rem",
                  },
                  "& .MuiOutlinedInput-root": {
                    fontSize: "1.6rem",
                  },
                }}
              />
              <TextField
                required
                variant="outlined"
                label="Индекс"
                sx={{
                  fontSize: "1.6rem",
                  "& .MuiFormLabel-root": {
                    fontSize: "1.6rem",
                  },
                  "& .MuiOutlinedInput-root": {
                    fontSize: "1.6rem",
                  },
                }}
              />
              <TextField
                variant="outlined"
                label="Улица"
                sx={{
                  fontSize: "1.6rem",
                  "& .MuiFormLabel-root": {
                    fontSize: "1.6rem",
                  },
                  "& .MuiOutlinedInput-root": {
                    fontSize: "1.6rem",
                  },
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1rem",
                }}
              >
                <TextField
                  required
                  variant="outlined"
                  label="Дом"
                  sx={{
                    fontSize: "1.6rem",
                    "& .MuiFormLabel-root": {
                      fontSize: "1.6rem",
                    },
                    "& .MuiOutlinedInput-root": {
                      fontSize: "1.6rem",
                    },
                  }}
                />
                <TextField
                  required
                  variant="outlined"
                  label="Квартира"
                  sx={{
                    fontSize: "1.6rem",
                    "& .MuiFormLabel-root": {
                      fontSize: "1.6rem",
                    },
                    "& .MuiOutlinedInput-root": {
                      fontSize: "1.6rem",
                    },
                  }}
                />
              </div>
            </div>
          }
        ></InputCard>
        <InputCard
          title={"Главное"}
          children={
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <Autocomplete
                options={[
                  { label: "Option 1", value: "1" },
                  { label: "Option 2", value: "2" },
                  { label: "Option 3", value: "3" },
                  { label: "Option 4", value: "4" },
                  { label: "Option 5", value: "5" },
                ]}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField
                    sx={{
                      fontSize: "1.6rem",
                      "& .MuiFormLabel-root": {
                        fontSize: "1.6rem",
                      },
                      "& .MuiOutlinedInput-root": {
                        fontSize: "1.6rem",
                      },
                    }}
                    {...params}
                    label="Choose an option"
                  />
                )}
              />
              <InputMask mask="+7 (999) 999 9999" disabled={false} maskChar=" ">
                {() => (
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    sx={{
                      fontSize: "1.6rem",
                      "& .MuiFormLabel-root": {
                        fontSize: "1.6rem",
                      },
                      "& .MuiOutlinedInput-root": {
                        fontSize: "1.6rem",
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <img
                            src={flagIcon}
                            alt="Flag"
                            style={{ width: 24, height: 24 }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              </InputMask>
              <Autocomplete
                options={[
                  { label: "Option 1", value: "1" },
                  { label: "Option 2", value: "2" },
                  { label: "Option 3", value: "3" },
                  { label: "Option 4", value: "4" },
                  { label: "Option 5", value: "5" },
                ]}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField
                    sx={{
                      fontSize: "1.6rem",
                      "& .MuiFormLabel-root": {
                        fontSize: "1.6rem",
                      },
                      "& .MuiOutlinedInput-root": {
                        fontSize: "1.6rem",
                      },
                    }}
                    {...params}
                    label="Choose an option"
                  />
                )}
              />
              // place for datePicker
            </div>
          }
        ></InputCard>
        <InputCard
          title={"Комментарий"}
          children={
            <div>
              <TextField
                label="Напишите ваш комментарий"
                multiline
                rows={4}
                defaultValue="Default Value"
                sx={{
                  width: "100%",
                  height: "100%",
                  fontSize: "1.6rem",
                  "& .MuiFormLabel-root": {
                    fontSize: "1.6rem",
                  },
                  "& .MuiOutlinedInput-root": {
                    fontSize: "1.6rem",
                  },
                }}
              ></TextField>
            </div>
          }
        ></InputCard>
      </div>
    </div>
  );
};

export default EmployeeAdd;
