import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import Textarea from "@mui/joy/Textarea";
import {
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
} from "@mui/material";
import InputMask from "react-input-mask";
import flagIcon from "@/assets/icons/Flags.svg";
import CustomTextField from "@/components/textField/textField.component";
import InputCard from "./components/input-card/input-card";
import classes from "./styles.module.scss";

const EmployeeAdd = () => {
  return (
    <div className={classes["main"]}>
      <div className={classes["main__upper"]}>
        <BreadcrumbsCustom />
        <h1 className={classes["main__upper__title"]}>
          Создание карты сотрудника
        </h1>
        <p className={classes["main__upper__subtitle"]}>
          Вы можете добавить дополнительную информацию здесь либо внести ее
          позже, зайдя в карту сотрудника.
        </p>
      </div>
      <div className={classes["main__lower"]}>
        <div className={classes["main__lower__container"]}>
          <InputCard
            title={"Главное"}
            children={
              <div className={classes["main__lower__container__card"]}>
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
              <div className={classes["main__lower__container__card"]}>
                <CustomTextField label={"Город"} required />
                <CustomTextField label={"Индекс"} />
                <CustomTextField
                  label={"Улица"}
                  sx={{ marginBottom: "0rem" }}
                />
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
              <div>
                <div className={classes["main__lower__container__card"]}>
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
                  <InputMask
                    mask="+7 (999) 999 9999"
                    disabled={false}
                    maskChar=" "
                  >
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
                  <CustomTextField label={"ТУТ ДОЛЖЕН БЫТЬ DATEPICKER"} />
                </div>
                <div className={classes["main__lower__container__gender"]}>
                  <p style={{ fontSize: "1.6rem" }}>Пол: </p>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                      row
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio size="medium" />}
                        label="Жен."
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Муж."
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
            }
          ></InputCard>
          <InputCard
            title={"Комментарий"}
            children={
              <div>
                <Textarea
                  placeholder={"Введите комментарий"}
                  variant={"outlined"}
                  sx={{
                    width: "100%",
                    height: "12rem",
                    backgroundColor: "white",
                    boxShadow: "none",
                    fontSize: "1.6rem",
                  }}
                ></Textarea>
              </div>
            }
          ></InputCard>
        </div>
        <div className={classes["main__lower__row"]}>
          <Button
            variant="outlined"
            className={classes["main__lower__row__cancel"]}
          >
            Отменить
          </Button>
          <Button
            variant="contained"
            disableElevation
            className={classes["main__lower__row__save"]}
          >
            Сохранить и перейти к карте
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAdd;
