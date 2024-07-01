import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";

import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import InputMask from "react-input-mask";
import flagIcon from "@/assets/icons/Flags.svg";
import CustomTextField from "@/components/textField/textField.component";
import InputCard from "./components/input-card/input-card";

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
              <CustomTextField label={"Имя"} required />
              <CustomTextField label={"Фамилия"} required />
              <CustomTextField label={"Отчество"} />
              <CustomTextField label={"Должность"} required />
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
                gap: "1rem",
              }}
            >
              <CustomTextField label={"Город"} required />
              <CustomTextField label={"Индекс"} />
              <CustomTextField label={"Улица"} sx={{ marginBottom: "0rem" }} />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1rem",
                }}
              >
                <CustomTextField label={"Дом"} required />
                <CustomTextField label={"Квартира"} required />
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
                  <CustomTextField label={"Выберите опцию"} {...params} />
                )}
              />
              <InputMask mask="+7 (999) 999 9999" disabled={false} maskChar=" ">
                {() => (
                  <CustomTextField
                    label={"Телефон"}
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
                  <CustomTextField label={"Выберите опцию"} {...params} />
                )}
              />
              <CustomTextField label={"Имя"} />
            </div>
          }
        ></InputCard>
        <InputCard
          title={"Комментарий"}
          children={
            <div>
              <CustomTextField
                label={"Напишите ваш комментарий"}
                multiline
                rows={4}
                defaultValue={"Defaut Value"}
              />
            </div>
          }
        ></InputCard>
      </div>
    </div>
  );
};

export default EmployeeAdd;
